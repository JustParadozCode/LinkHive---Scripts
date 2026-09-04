const luaSource = `print("test")`;

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>LinkHive | Unauthorized</title>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;
    background:
        radial-gradient(circle at center, #062c46 0%, #020914 45%, #010409 100%);
    color: #00d9ff;
    font-family: Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

body::before {
    content: "";
    position: fixed;
    inset: 0;
    background:
        linear-gradient(rgba(0,210,255,.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,210,255,.05) 1px, transparent 1px);
    background-size: 35px 35px;
    pointer-events: none;
}

.card {
    width: min(90%, 650px);
    padding: 55px 35px;
    text-align: center;
    border: 1px solid rgba(0,220,255,.45);
    border-radius: 18px;
    background: rgba(2,15,28,.82);
    box-shadow:
        0 0 25px rgba(0,200,255,.2),
        inset 0 0 30px rgba(0,180,255,.04);
    backdrop-filter: blur(12px);
    animation: appear .7s ease;
}

.icon {
    font-size: 60px;
    margin-bottom: 15px;
    text-shadow: 0 0 20px #00d9ff;
}

h1 {
    margin: 0;
    font-size: 32px;
    letter-spacing: 4px;
    text-shadow: 0 0 12px #00d9ff;
}

.status {
    margin-top: 12px;
    color: #8cecff;
    font-size: 14px;
    letter-spacing: 2px;
}

.line {
    height: 1px;
    width: 80%;
    margin: 28px auto;
    background: #00d9ff;
    box-shadow: 0 0 12px #00d9ff;
}

.message {
    color: #b9eefa;
    font-size: 16px;
    line-height: 1.7;
}

.error {
    display: inline-block;
    margin-top: 25px;
    padding: 10px 18px;
    border: 1px solid #00d9ff;
    border-radius: 8px;
    color: #00d9ff;
    font-size: 12px;
    letter-spacing: 2px;
    box-shadow: 0 0 12px rgba(0,217,255,.25);
}

.footer {
    margin-top: 30px;
    font-size: 11px;
    color: #47798a;
    letter-spacing: 1px;
}

@keyframes appear {
    from {
        opacity: 0;
        transform: translateY(20px) scale(.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
</head>

<body>

<div class="card">
    <div class="icon">⚠</div>

    <h1>UNAUTHORIZED ACCESS</h1>

    <div class="status">
        ACCESS DENIED // LINKHIVE SECURITY
    </div>

    <div class="line"></div>

    <div class="message">
        You cannot access the script.<br>
        This resource is restricted to authorized requests only.
    </div>

    <div class="error">
        ERROR 403 — ACCESS FORBIDDEN
    </div>

    <div class="footer">
        LINKHIVE SECURITY SYSTEM
    </div>
</div>

</body>
</html>
`;

export default function handler(req, res) {
    const userAgent = req.headers["user-agent"] || "";

    // Normal browsers see the cyber security page.
    if (
        userAgent.includes("Mozilla") &&
        !userAgent.includes("Roblox")
    ) {
        res.status(403);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        return res.send(html);
    }

    // Authorized/demo requests receive the Lua source.
    res.status(200);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send(luaSource);
}
