// Dialogue array
const dialogues = [
  { name: "Moi", text: "…" },
  { name: "Moi", text: "…" },
  { name: "Moi", text: "…" },
];

let index = 0;
let typingSpeed = 40; // writing animation speed, 10 = fast, 30 = normal, 60, slow
let isTyping = false;
let currentTimeout;

const text = document.getElementById("dialogue-text");
const nameBox = document.getElementById("character-name");
const arrow = document.getElementById("next-arrow");

// Typing function
function typeText(fullText) {
  text.textContent = "";
  let i = 0;
  isTyping = true;

  function type() {
    if (i < fullText.length) {
      text.textContent += fullText.charAt(i);
      i++;
      currentTimeout = setTimeout(type, typingSpeed);
    } else {
      isTyping = false;
    }
  }

  type();
}

// Show dialogue line
function showDialogue() {
  nameBox.textContent = dialogues[index].name;
  typeText(dialogues[index].text);
}

// Click arrow
arrow.addEventListener("click", () => {
  if (isTyping) {
    clearTimeout(currentTimeout);
    text.textContent = dialogues[index].text;
    isTyping = false;
    return;
  }

  index++;
  if (index >= dialogues.length) {
    window.location.href = "page2.html"; // next page
    return;
  }

  showDialogue();
});

// Start first dialogue
showDialogue();
