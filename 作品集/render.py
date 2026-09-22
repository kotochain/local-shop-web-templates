import os, subprocess, urllib.parse
from PIL import Image

BASE = "/Users/javian/Desktop/闲鱼/网站小程序 demo/作品集"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

html_path = os.path.join(BASE, "posters.html")
url = "file://" + urllib.parse.quote(html_path)

out_dir = os.path.join(BASE, "闲鱼图")
os.makedirs(out_dir, exist_ok=True)

strip_path = os.path.join(out_dir, "_strip.png")
if os.path.exists(strip_path):
    os.remove(strip_path)

subprocess.run([
    CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=1", "--allow-file-access-from-files",
    "--virtual-time-budget=6000",
    f"--window-size=750,8000",
    f"--screenshot={strip_path}",
    url
], check=True, capture_output=True, text=True)

print("strip:", os.path.exists(strip_path))
img = Image.open(strip_path)
print("strip size:", img.size)

names = [
    "01-封面-三件套总览",
    "02-预约系统-四步流程",
    "03-预约系统-三套行业皮肤",
    "04-预约系统-时段锁定与记录",
    "05-落地页-五行业版本",
    "06-落地页-板块内容",
    "07-报价计算器-实时出报价单",
    "08-交付清单与周期",
]

for i, name in enumerate(names):
    box = (0, i * 1000, 750, (i + 1) * 1000)
    part = img.crop(box)
    p = os.path.join(out_dir, f"{name}.png")
    part.save(p)
    print("saved:", p, part.size)
