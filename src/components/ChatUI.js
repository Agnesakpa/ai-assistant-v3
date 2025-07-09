export function createChatUI() {
    const intro = document.createElement("div");
    intro.id = "intro";
    const h1 = document.createElement("h1");
    h1.id = "heading";
    h1.textContent = "Welcome to Oshanodes AI Assistant";
  const chat = document.createElement("div");
  chat.id = "chat";

  const output = document.createElement("div");
  output.id = "chat-output";

  const inputArea = document.createElement("div");
  inputArea.id = "input-area";

  const input = document.createElement("input");
  input.id = "user-input";
  input.placeholder = "Ask me about Fire Stick...";

  const button = document.createElement("button");
  button.id = "send-button";
  button.textContent = "Send";

  intro.appendChild(h1);
  inputArea.appendChild(input);
  inputArea.appendChild(button);

  chat.appendChild(intro);
  chat.appendChild(output);
  chat.appendChild(inputArea);
  

  return chat;
}
