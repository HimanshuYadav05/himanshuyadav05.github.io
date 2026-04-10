const terminal = document.querySelector(".terminal");
const mainContent = document.querySelector(".main-content");
const lines = document.querySelectorAll(".terminal-body p");

const modal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close-modal");
const form = document.getElementById("contactForm");


const heroStartBtn = document.querySelector(".hero .start-project");
const ctaStartBtn = document.querySelector(".cta-section .start-project");
const contactBtn = document.querySelector(".contact-btn");


let started = false;
let index = 0;

function typeLines() {
  if (index < lines.length) {
    lines[index].style.opacity = "1";
    index++;
    setTimeout(typeLines, 400);
  }
}
typeLines();

function startSite() {
  if (started) return;
  started = true;

  terminal.style.transition = "0.6s";
  terminal.style.opacity = "0";

  setTimeout(() => {
    terminal.style.display = "none";
    mainContent.style.display = "block";
  }, 600);
}


setTimeout(startSite, 3200);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startSite();
});
document.addEventListener("click", startSite);


function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}


if (heroStartBtn) heroStartBtn.addEventListener("click", openModal);
if (ctaStartBtn) ctaStartBtn.addEventListener("click", openModal);
if (contactBtn) contactBtn.addEventListener("click", openModal);


if (closeBtn) closeBtn.addEventListener("click", closeModal);


if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
  }
});


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("🔥 Message sent successfully!");

    form.reset();
    closeModal();
  });
}



const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  posX += (mouseX - posX) * 0.2;
  posY += (mouseY - posY) * 0.2;

  cursor.style.left = posX + "px";
  cursor.style.top = posY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();


document.querySelectorAll("button, a, .contact-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});



const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "all 0.8s ease";
  observer.observe(sec);
});



document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});



const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section").forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.clientHeight;

    if (scrollY >= top - height / 3) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});



document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      rotateY(${x * 10}deg)
      rotateX(${y * -10}deg)
      scale(1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) scale(1)";
  });
});



const progress = document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "3px";
progress.style.background = "linear-gradient(90deg,#00f7ff,#9333ea)";
progress.style.zIndex = "2000";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;

  progress.style.width = (scroll / height) * 100 + "%";
});
