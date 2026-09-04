import fs from 'fs';
import path from 'path';

// Read script.lua dynamically from the root directory
const scriptPath = path.join(__dirname, '../script.lua');

let luaSource = 'print("Error: script.lua file not found.")';

try {
  luaSource = fs.readFileSync(scriptPath, 'utf8');
} catch (err) {
  console.error("Failed to read script.lua:", err);
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LinkHive Security Gateway</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at center, #1c1503 0%, #0a0801 50%, #030200 100%);
      color: #f1cf8e;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background: linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    .card {
      width: min(100%, 620px);
      padding: 45px 35px;
      text-align: center;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 20px;
      background: rgba(15, 12, 5, 0.85);
      box-shadow: 0 0 35px rgba(212, 175, 55, 0.12), 
                  inset 0 0 25px rgba(212, 175, 55, 0.04);
      backdrop-filter: blur(16px);
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 50px;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: #f3d798;
      font-size: 11px;
      letter-spacing: 2px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 12px 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, #fff3d1 0%, #d4af37 50%, #aa820a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
    }
    .subtext {
      color: #c9b996;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 25px;
    }
    .code-box {
      background: #070603;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 12px;
      padding: 16px;
      font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
      font-size: 12.5px;
      color: #ffe8ab;
      word-break: break-all;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.8);
      margin: 20px 0;
      text-align: left;
      user-select: all;
    }
    .divider {
      height: 1px;
      width: 60%;
      margin: 30px auto;
      background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
    }
    .credits {
      font-size: 13px;
      color: #d4af37;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .footer {
      margin-top: 8px;
      font-size: 11px;
      color: #7e7152;
      letter-spacing: 1.5px;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">SECURITY GATEWAY</div>
    <h1>Access via Direct HTTP Request Restricted</h1>
    
    <div class="subtext">
      You are not authorized to access this endpoint directly.<br>
      Please execute the official loader script within your client environment:
    </div>
    
    <div class="code-box">loadstring(game:HttpGet("https://link-hive-scripts.vercel.app/api/loader"))()</div>

    <div class="divider"></div>

    <div class="credits">Protected by Luraph Obfuscation Architecture ✨</div>
    <div class="footer">DEVELOPED BY LIVEHIVE SCRIPTS</div>
  </div>
</body>
</html>
`;

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  // Normal web browsers receive the gold security gateway
  if (userAgent.includes("Mozilla") && !userAgent.includes("Roblox")) {
    res.status(403);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(html);
  }

  // Roblox executors receive raw Lua code
  res.status(200);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return res.send(luaSource);
}
