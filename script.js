// ------------- DOM -------------
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const helpBtn = document.getElementById("helpBtn");
const clickSound = document.getElementById("clickSound");

// ------------- UI helpers -------------
function playClick() {
    try {
        if (!clickSound || !clickSound.src) return;
        clickSound.currentTime = 0;
        clickSound.play();
    } catch (_) {}
}

function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function createMeta(text) {
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = text;
    return meta;
}

function createMessageRow({ role, text }) {
    const row = document.createElement("div");
    row.className = `msg-row ${role}`;

    const bubble = document.createElement("div");
    bubble.className = `bubble ${role}`;
    bubble.textContent = text;

    const meta = createMeta(role === "user" ? "You" : "Assistant");

    if (role === "user") {
        row.appendChild(meta);
        row.appendChild(bubble);
    } else {
        row.appendChild(bubble);
        row.appendChild(meta);
    }

    return row;
}

function addMessage(role, text) {
    const row = createMessageRow({ role, text });
    chatBody.appendChild(row);
    scrollToBottom();
}

let typingEl = null;

function showTyping() {
    if (typingEl) return;

    const row = document.createElement("div");
    row.className = "msg-row bot";

    const bubble = document.createElement("div");
    bubble.className = "bubble bot typing";

    const torch = document.createElement("div");
    torch.className = "icon-torch";
    torch.setAttribute("aria-hidden", "true");

    const dots = document.createElement("div");
    dots.className = "dots";
    dots.innerHTML = "<span></span><span></span><span></span>";

    const text = document.createElement("span");
    text.textContent = "Mining answer";

    bubble.appendChild(torch);
    bubble.appendChild(text);
    bubble.appendChild(dots);

    row.appendChild(bubble);
    typingEl = row;

    chatBody.appendChild(row);
    scrollToBottom();
}

function hideTyping() {
    if (!typingEl) return;
    typingEl.remove();
    typingEl = null;
}

function getUserText() {
    return chatInput.value.trim();
}

function setUserText(v) {
    chatInput.value = v;
}

// ------------- Azure call -------------
async function askAzureQnA(question) {
    const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
    });

    if (!res.ok) {
        throw new Error("API error");
    }

    return res.json();
}

function extractBestAnswer(data) {
    // Respuesta típica:
    // { answers: [ { answer: "...", confidenceScore: 0.xx, ... } ] }
    const answers = Array.isArray(data?.answers) ? data.answers : [];
    if (!answers.length) return null;

    const best = answers[0];
    const text = (best?.answer || "").trim();
    if (!text) return null;

    // Algunas KB devuelven "No good match found in KB"
    if (text.toLowerCase().includes("no good match")) return null;

    return text;
}

// ------------- Handlers -------------
async function handleSend() {
    const text = getUserText();
    if (!text) return;

    playClick();
    addMessage("user", text);
    setUserText("");
    chatInput.focus();

    showTyping();

    try {
        const data = await askAzureQnA(text);
        const answer = extractBestAnswer(data);

        hideTyping();

        if (answer) {
            addMessage("bot", answer);
        } else {
            addMessage(
                "bot",
                "I couldn't find a good match. Try rephrasing your question (e.g., about first night, food, tools, mining, mobs)."
            );
        }
    } catch (err) {
        hideTyping();
        addMessage(
            "bot",
            "Connection error. Check ENDPOINT / API_KEY / project and deployment names."
        );
        console.error(err);
    }
}

function handleClear() {
    playClick();
    chatBody.innerHTML = "";
    hideTyping();
    addMessage("bot", "Hi! Ask me a Minecraft beginner survival question.");
}

function handleHelp() {
    playClick();
    addMessage(
        "bot",
        "Try: “How do you survive the first night?” or “How does hunger work?”"
    );
}

// ------------- Events -------------
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
});

sendBtn.addEventListener("click", handleSend);
clearBtn.addEventListener("click", handleClear);
helpBtn.addEventListener("click", handleHelp);

// Welcome
addMessage("bot", "Hi! Ask me a Minecraft beginner survival question.");
