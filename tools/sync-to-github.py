import base64, hashlib, json, os, subprocess, urllib.parse, urllib.request, urllib.error

ROOT = "/Users/javian/Desktop/闲鱼/网站小程序 demo"
REPO = "kotochain/local-shop-web-templates"
BRANCH = "main"
API = "https://api.github.com/repos/" + REPO

TOKEN = subprocess.check_output(["gh", "auth", "token"]).decode().strip()


def gh(path, method="GET", data=None):
    req = urllib.request.Request(
        API + path, data=json.dumps(data).encode() if data is not None else None,
        method=method,
        headers={"Authorization": "Bearer " + TOKEN, "Accept": "application/vnd.github+json",
                 "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        try:
            return {"_err": e.code, "_msg": json.loads(body).get("message", body[:200])}
        except Exception:
            return {"_err": e.code, "_msg": body[:200]}
    except Exception as e:
        return {"_err": 0, "_msg": repr(e)[:200]}


def remote_tree():
    tree = gh("/git/trees/%s?recursive=1" % BRANCH)
    if "tree" not in tree:
        return {}
    return {t["path"]: t["sha"] for t in tree["tree"] if t["type"] == "blob"}


def blob_sha(path):
    with open(path, "rb") as fh:
        data = fh.read()
    return hashlib.sha1(b"blob %d\x00" % len(data) + data).hexdigest()


local = [f.strip() for f in subprocess.check_output(
    ["git", "-c", "core.quotepath=false", "ls-files"], cwd=ROOT).decode("utf-8").split("\n") if f.strip()]
local = [f for f in local if "timestamp-" not in f]
print("local files:", len(local))

remote = remote_tree()
print("remote files:", len(remote))

todo = []
for f in local:
    full = os.path.join(ROOT, f)
    if not os.path.isfile(full):
        continue
    if f not in remote or blob_sha(full) != remote[f]:
        todo.append(f)
print("todo:", len(todo))


def get_sha(rel):
    res = gh("/contents/" + urllib.parse.quote(rel) + "?ref=" + BRANCH)
    if "_err" in res:
        return None
    return res.get("sha")


ok = 0
fails = []
for i, rel in enumerate(todo, 1):
    full = os.path.join(ROOT, rel)
    if not os.path.isfile(full):
        continue
    with open(full, "rb") as fh:
        b64 = base64.b64encode(fh.read()).decode()
    payload = {"message": "feat: 本地商家网页模板套件", "content": b64, "branch": BRANCH}
    sha = get_sha(rel)
    if sha:
        payload["sha"] = sha
    res = gh("/contents/" + urllib.parse.quote(rel), "PUT", payload)
    if "_err" in res:
        fails.append((rel, res.get("_msg", "")[:90]))
        print("FAIL", rel, res.get("_msg", "")[:90], flush=True)
    else:
        ok += 1
    if i % 10 == 0:
        print("progress %d/%d" % (i, len(todo)), flush=True)

print("=== uploaded:", ok, "failed:", len(fails))
for rel, msg in fails[:10]:
    print(" -", rel, msg)

remote2 = remote_tree()
missing = [f for f in local if f not in remote2 or blob_sha(os.path.join(ROOT, f)) != remote2[f]]
print("=== still missing/changed:", len(missing))
for m in missing[:10]:
    print(" -", m)
