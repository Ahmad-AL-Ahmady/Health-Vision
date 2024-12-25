// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const headerOffset = 80;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Select elements
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;

function updateCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (i === index) {
      card.classList.add("active");
    }
  });

  leftArrow.disabled = index === 0;
  rightArrow.disabled = index === cards.length - 1;
}

rightArrow.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCard(currentIndex);
  }
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCard(currentIndex);
  }
});

// Get the menu icon and the nav links
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

navLinks.classList.add("hidden");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("show");

  if (navLinks.classList.contains("show")) {
    menuIcon.innerHTML = "&#10006;";
  } else {
    menuIcon.innerHTML = "&#9776;";
  }
});

const links = document.querySelectorAll(".nav-links a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    navLinks.classList.add("hidden");
    menuIcon.innerHTML = "&#9776;";
  });
});
