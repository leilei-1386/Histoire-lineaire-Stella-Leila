// Dialogue array
const dialogues = [
  { name: "Moi", text: "Maman… tu sais où il est, mon frère ?" },
  { name: "Maman", text: "Mais j’en sais rien, moi. Il a encore dû partir traîner je ne sais où… sûrement en train de jouer dans le jardin, qui sait." },
  { name: "Moi", text: "… Sérieusement ? Mais… il aurait au moins dû me dire quelque chose." },
  { name: "Moi", text: "J’ai juste… j’ai un mauvais pressentiment." },
  { name: "Maman", text: "Arrête de t’inquiéter comme ça. Il reviendra bien quand il aura fini ses bêtises." },
  { name: "Moi", text: "… j’espère. Parce que… j’ai vraiment aucune idée d’où il est." }
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
    window.location.href = "hall.html"; // next page
    return;
  }

  showDialogue();
});

// Start first dialogue
showDialogue();
