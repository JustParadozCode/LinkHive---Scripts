const luaSource = `print("Hello from LinkHive!")
print("This is my Lua script.")`;

function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  // Browser → pretty viewer
  if (
    userAgent.includes("Mozilla") &&
    !userAgent.includes("Roblox")
  ) {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>LinkHive | Loadstring</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #090b18;
  color: white;
  font-family: Arial, sans-serif;
}

.container {
  width: min(900px, 92vw);
  text-align: center;
}

h1 {
  margin-bottom: 8px;
  font-size: 25px;
}

p {
  color: #aeb4c7;
}

.editor {
  position: relative;
  text-align: left;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  background: #101426;
  border: 1px solid #252c48;
  box-shadow: 0 0 30px rgba(100, 80, 255, .15);
  overflow: auto;
}

pre {
  margin: 0;
  white-space: pre;
}

code {
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
}

.copy {
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0;
  border-radius: 7px;
  padding: 7px 12px;
  background: #292f4d;
  color: white;
  cursor: pointer;
}

.copy:hover {
  background: #394266;
}

.brand {
  color: #9b8cff;
  font-weight: bold;
}
</style>
</head>

<body>
<div class="container">

<div class="brand">⚡ LinkHive Scripts</div>

<h1>📜 Loadstring</h1>

<p>Contents can not be displayed on browser</p>

<div class="editor">
<button class="copy" onclick="copyCode()">Copy</button>
<pre><code>${escapeHTML(luaSource)}</code></pre>
</div>

</div>

<script>
async function copyCode() {
  const code = ${JSON.stringify(luaSource)};

  try {
    await navigator.clipboard.writeText(code);

    const button = document.querySelector(".copy");
    button.textContent = "Copied!";

    setTimeout(() => {
      button.textContent = "Copy";
    }, 1000);

  } catch {
    alert("Copy failed");
  }
}
</script>

</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    return res.status(200).send(html);
  }

  // Non-browser → raw Lua
  res.setHeader("Content-Type", "text/plain; charset=UTF-8");
  return res.status(200).send(luaSource);
}
