import "./style.css";
import { createChatUI } from "./components/ChatUI.js";

const VITE_API_KEY = import.meta.env.VITE_API_KEY; // Replace with your real key

const context = `
You are a helpful assistant for a product called Fire Stick from Oshanodes.

Product Information:
- Fire Stick is a candle that kills mosquitoes.
- Its scent is safe for humans but deadly to mosquitoes.
- It starts working within 5 minutes after being lit.
- It costs 20 Naira per stick.
- It can be distributed nationwide in Nigeria.
`;

document.getElementById("app").appendChild(createChatUI());

const h1 = document.getElementById("heading");
const input = document.getElementById("user-input");
const button = document.getElementById("send-button");
const output = document.getElementById("chat-output");

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  output.innerHTML += `<div class="message user">You: ${userMessage}</div>`;
  input.value = "";
  output.innerHTML += `<div class="message bot"><em>Typing...</em></div>`;
  output.scrollTop = output.scrollHeight;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: context },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
        temperature: 0.5,
      }),
    });

    const data = await res.json();
    document.querySelector(".bot:last-child").remove();

    if (data.choices && data.choices[0]) {
      const reply = data.choices[0].message.content.trim();
      output.innerHTML += `<div class="message bot">Oshanodes Assistant: ${reply}</div>`;
    } else {
      output.innerHTML += `<div class="message bot">Sorry, something went wrong.</div>`;
      console.error("OpenAI API error:", data);
    }

    output.scrollTop = output.scrollHeight;
  } catch (err) {
    output.innerHTML += `<div class="message bot">Error: ${err.message}</div>`;
    console.error(err);
  }
}
