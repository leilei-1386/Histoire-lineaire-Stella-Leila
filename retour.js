// Vérifie si la page contient les éléments nécessaires
const dialogueBox = document.getElementById("dialogue-box");
const text = document.getElementById("dialogue-text");
const nameBox = document.getElementById("character-name");
const arrow = document.getElementById("next-arrow");
const powerCut = document.getElementById('power-cut');
const flashlight = document.getElementById('flashlight');

if (!dialogueBox || !text || !nameBox || !arrow || !powerCut || !flashlight) {
  // Si on n'est pas sur la page avec le dialogue/blackout, le script s'arrête
  console.log("JS dialogue/torche non actif sur cette page");
} else {
  // =================== Dialogue array ===================
  const dialogues = [
    { name: "Moi", text: "J'ai verifié dehors, je ne l'ai pas retrouvé. Tu l'as vraim–" },
    { name: "Moi", text: "Maman?" },
    { name: "…", text: "*…*" },
    { name: "Moi", text: "MAMAN?" },
    { name: "Moi", text: "*C'est quoi ce bordel…*" },
    { name: "Moi", text: "*J’entends quelque chose dans le hall… des bruits humides et croustillants…?*" },
  ];

  let index = 0;
  let typingSpeed = 40;
  let isTyping = false;
  let currentTimeout;

  // =================== Flags ===================
  let blackoutDone = false;      
  let flashlightEquipped = false;

  // Crée le cercle lumineux pour la torche
  const lightCircle = document.createElement('div');
  lightCircle.classList.add('light-circle');
  document.body.appendChild(lightCircle);

  // =================== Typing function ===================
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

  // =================== Dialogue ===================
  function showDialogue() {
    const line = dialogues[index].text;
    nameBox.textContent = dialogues[index].name;

    // Vérifie si blackout à déclencher
    checkDialogueForPowerCut(line);

    // Affiche le texte normalement
    typeText(line);
  }

  // =================== Arrow click ===================
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

  // =================== Power cut ===================
  function triggerPowerCut() {
    powerCut.classList.add('power-flicker');

    setTimeout(() => {
      powerCut.classList.remove('power-flicker');
      powerCut.style.opacity = 1; // blackout
      blackoutDone = true;         // torche activable
    }, 1500);
  }

  function checkDialogueForPowerCut(line) {
    if (line.includes('*…*')) { // ligne déclenchement blackout
      triggerPowerCut();
    }
  }

  // =================== Lampe torche ===================
  document.addEventListener('keydown', (e) => {
    if(!blackoutDone) return; // torche impossible avant blackout
    if(e.key.toLowerCase() === 'f') {
      flashlightEquipped = !flashlightEquipped;
      flashlight.style.display = flashlightEquipped ? 'block' : 'none';
      lightCircle.style.display = flashlightEquipped ? 'block' : 'none';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if(!flashlightEquipped) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Position de la torche
    flashlight.style.left = (mouseX - flashlight.width / 2) + 'px';
    flashlight.style.top = (mouseY - flashlight.height / 2) + 'px';

    // Position du cercle lumineux
    lightCircle.style.left = (mouseX - 125) + 'px';
    lightCircle.style.top = (mouseY - 125) + 'px';

    // Rotation de la torche vers la souris
    const rect = flashlight.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - centerY, mouseX - centerX) * 180 / Math.PI;
    flashlight.style.transform = `rotate(${angle}deg)`;
  });

  // =================== Init ===================
  showDialogue();
}
