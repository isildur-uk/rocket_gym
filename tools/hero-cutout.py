"""Cut the two fighters out of the kick clip and render a stylised duotone loop.
Usage: python cutout.py <frames_dir> <out_dir>
"""
import sys, glob, os
import numpy as np, cv2, torch
from torchvision.models.segmentation import deeplabv3_resnet101, DeepLabV3_ResNet101_Weights

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
files = sorted(glob.glob(os.path.join(src, "*.png")))
dev = "cuda" if torch.cuda.is_available() else "cpu"
model = None
mean = torch.tensor([0.485, 0.456, 0.406], device=dev).view(1, 3, 1, 1)
std = torch.tensor([0.229, 0.224, 0.225], device=dev).view(1, 3, 1, 1)
UP = 1280  # run the model on an enlarged frame for finer edges

frames = [cv2.imread(f) for f in files]
cache = os.path.join(out, "masks.npy")
if os.path.exists(cache):  # reuse the cut-outs when only the styling changes
    sm = np.load(cache).astype(np.float32)
else:
    model = deeplabv3_resnet101(weights=DeepLabV3_ResNet101_Weights.DEFAULT).eval().to(dev)
    masks = []
    with torch.no_grad():
        for bgr in frames:
            big = cv2.resize(bgr, (UP, UP), interpolation=cv2.INTER_CUBIC)
            x = torch.from_numpy(big[:, :, ::-1].copy()).to(dev).permute(2, 0, 1).float().div(255).unsqueeze(0)
            p = model((x - mean) / std)["out"].softmax(1)[0, 15]  # class 15 = person
            masks.append(cv2.resize(p.float().cpu().numpy(), (bgr.shape[1], bgr.shape[0]), interpolation=cv2.INTER_AREA))
    masks = np.stack(masks)
    # light temporal smoothing to stop the edge flickering
    sm = masks.copy()
    sm[1:-1] = 0.25 * masks[:-2] + 0.5 * masks[1:-1] + 0.25 * masks[2:]
    np.save(cache, sm.astype(np.float16))

# optional watermark: python cutout.py in out logo.png [strength] [width] [top]
H, W = frames[0].shape[:2]
logo_rgb = logo_a = None
if len(sys.argv) > 3:
    strength = float(sys.argv[4]) if len(sys.argv) > 4 else 0.3
    lw = int(sys.argv[5]) if len(sys.argv) > 5 else int(W * 0.84)
    top = int(sys.argv[6]) if len(sys.argv) > 6 else int(H * 0.15)
    lg = cv2.imread(sys.argv[3], cv2.IMREAD_UNCHANGED)
    lg = cv2.resize(lg, (lw, round(lg.shape[0] * lw / lg.shape[1])), interpolation=cv2.INTER_LANCZOS4)
    logo_rgb = np.zeros((H, W, 3), np.float32)
    logo_a = np.zeros((H, W, 1), np.float32)
    x0 = (W - lw) // 2
    logo_rgb[top:top + lg.shape[0], x0:x0 + lw] = lg[:, :, 2::-1]
    logo_a[top:top + lg.shape[0], x0:x0 + lw, 0] = lg[:, :, 3] / 255 * strength
fade_top = np.clip(np.arange(H, dtype=np.float32) / (H * 0.12), 0, 1)[:, None, None]  # lose the real banner at the top edge

ramp_pts = np.array([[0.00, 40, 40, 40], [0.30, 122, 44, 8], [0.62, 255, 106, 13], [1.00, 244, 241, 236]], dtype=np.float32)  # RGB
lut = np.zeros((256, 3), np.float32)
for i in range(256):
    t = i / 255
    for c in range(3):
        lut[i, c] = np.interp(t, ramp_pts[:, 0], ramp_pts[:, 1 + c])
INK = np.array([18, 18, 18], np.float32)
clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(6, 6))

rendered = []
for bgr, m in zip(frames, sm):
    g = clahe.apply(cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY))
    g = cv2.bilateralFilter(g, 7, 40, 5)  # flatten phone noise into poster-like tones
    a = np.clip((m - 0.40) / 0.25, 0, 1)
    # the detector only knows "person": add the yellow gloves that sit right next to a body
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    yellow = cv2.inRange(hsv, (18, 110, 120), (36, 255, 255))
    near = cv2.dilate((a > 0.5).astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41)))
    glove = cv2.morphologyEx(cv2.bitwise_and(yellow, yellow, mask=near), cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    a = np.maximum(a, glove.astype(np.float32) / 255)
    a = cv2.GaussianBlur(a, (0, 0), 1.0)[..., None]
    fig = lut[g]  # RGB duotone
    room = cv2.GaussianBlur(g, (0, 0), 3).astype(np.float32)[..., None] / 255
    bg = INK + room * fade_top * np.array([26, 24, 22], np.float32)  # faint hint of the room
    if logo_a is not None:
        bg = bg * (1 - logo_a) + logo_rgb * logo_a  # the logo sits on the wall, behind the fighters
    rendered.append((fig, a, bg))

# clean loop: the figures fade out of the dark room at the end and back in at the start
X = 9
n = len(rendered)
for i, (fig, a, bg) in enumerate(rendered):
    k = min(1.0, (i + 1) / X, (n - i) / X)
    k = k * k * (3 - 2 * k)
    rgb = fig * (a * k) + bg * (1 - a * k)
    cv2.imwrite(os.path.join(out, f"o{i:04d}.png"), cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.uint8), cv2.COLOR_RGB2BGR))
print("frames", n, "mask coverage mean", float((sm > 0.5).mean()))
