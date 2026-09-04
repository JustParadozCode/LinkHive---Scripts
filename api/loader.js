import fs from 'fs';
import path from 'path';

// Construct path to root directory relative to /api/ directory
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
  <title>LinkHive | Unauthorized</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: radial-gradient(circle at center, #062c46 0%, #020914 45%, #010409 100%);
      color: #00d9ff;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      width: min(100%, 650px);
      padding: 40px 30px;
      text-align: center;
      border: 1px solid rgba(0, 220, 255, 0.45);
      border-radius: 18px;
      background: rgba(2, 15, 28, 0.82);
      box-shadow: 0 0 25px rgba(0, 200, 255, 0.2);
      backdrop-filter: blur(12px);
    }
    h1 {
      margin: 0 0 10px 0;
      font-size: 22px;
      letter-spacing: 1px;
      color: #ff4d4d;
      text-shadow: 0 0 10px rgba(255, 77, 77, 0.5);
    }
    .subtext {
      color: #b9eefa;
      font-size: 15px;
      margin-bottom: 20px;
    }
    .code-box {
      background: #010a15;
      border: 1px solid #00d9ff;
      border-radius: 8px;
      padding: 15px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 13px;
      color: #00ffcc;
      word-break: break-all;
      box-shadow: inset 0 0 10px rgba(0, 217, 255, 0.1);
      margin: 20px 0;
      text-align: left;
    }
    .credits {
      margin-top: 25px;
      font-size: 13px;
      color: #8cecff;
    }
    .footer {
      margin-top: 15px;
      font-size: 11px;
      color: #47798a;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>You are not authorised to access this end point of the Script</h1>
    <div class="subtext">Use Our Official Loader</div>
    
    <div class="code-box">
      loadstring(game:HttpGet("https://link-hive-scripts.vercel.app/api/loader"))()
    </div>

    <div class="credits">Thanks for Luraph for Protection ❤️</div>
    <div class="footer">Made by LiveHive-Scripts</div>
  </div>
</body>
</html>
`;

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  // Normal browser traffic gets the UI block page
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

