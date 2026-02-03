const arena   = document.getElementById("arena");
const card    = document.querySelector(".card");
const noBtn   = document.getElementById("noBtn");
const yesBtn  = document.getElementById("yesBtn");
const message = document.getElementById("message");
const note    = document.getElementById("note");
const canvas  = document.getElementById("confetti-canvas");
const ctx     = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Initial position: somewhere playful but visible
function resetNoPosition() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bw = noBtn.offsetWidth || 160;
  const bh = noBtn.offsetHeight || 55;

  const x = w * 0.65 - bw / 2;
  const y = h * 0.55 - bh / 2;

  noBtn.style.left   = `${x}px`;
  noBtn.style.top    = `${y}px`;
  noBtn.style.opacity = "1";
}

resetNoPosition();
window.addEventListener("resize", resetNoPosition);

// Dodge logic – moves anywhere on screen
function dodgeMouse(e) {
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top  + rect.height / 2;

  const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (dist < 220) {  // bigger trigger radius since screen is larger
    spawnLoveTrail(centerX, centerY);
    moveNoRandomly();
  }
}

function moveNoRandomly() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bw = noBtn.offsetWidth;
  const bh = noBtn.offsetHeight;

  // Keep it fully on screen with small margin
  const margin = 40;
  const maxX = w - bw - margin * 2;
  const maxY = h - bh - margin * 2;

  const x = margin + Math.random() * maxX;
  const y = margin + Math.random() * maxY;

  noBtn.classList.add("scared");
  noBtn.style.transition = "left 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;

  setTimeout(() => noBtn.classList.remove("scared"), 900);
}

document.addEventListener("mousemove", dodgeMouse);   // ← listen on whole document

// Love trail when dodging
function spawnLoveTrail(x, y) {
  const symbols = ["💗", "💖", "💕", "💘", "💓", "✨", "💞"];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "love";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 90;
    const ox = Math.cos(angle) * radius;
    const oy = Math.sin(angle) * radius;

    el.style.left = `${x + ox}px`;
    el.style.top  = `${y + oy}px`;
    el.style.animationDuration = `${1.6 + Math.random() * 1}s`;

    arena.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}

// Yes celebration (same as before)
yesBtn.addEventListener("click", () => {
  message.textContent = "YES!! 💖 You caught my heart and won forever";
  note.textContent    = "No more running away… only us from now on ✨";

  message.classList.add("visible");
  note.classList.add("visible");

  noBtn.style.opacity = "0.3";
  noBtn.style.transition = "opacity 1.5s ease";

  setTimeout(launchLuxuryConfetti, 600);
});

// Confetti function remains the same as previous version
function launchLuxuryConfetti() {
  // ... (copy from previous script – 300 particles, shadows, etc.) ...
  // paste your previous confetti code here if needed
}