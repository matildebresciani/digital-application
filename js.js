document.addEventListener("DOMContentLoaded", function () {
  const section1 = document.querySelector("#section1");
  const paragraphs = section1.querySelectorAll("p"); // Få alle p-tags i section1

  // Tilføj klassen, der gør section1 synlig
  setTimeout(() => {
    section1.classList.add("visible");

    // Tilføj forsinkelse for hvert p-element i section1
    paragraphs.forEach((p, index) => {
      setTimeout(() => {
        p.classList.add("visible"); // Tilføj "visible" klasse for at vise p-elementet
      }, index * 200); // Forsinkelse for hvert p-element, 200ms mellem hver
    });
  }, 150); // Initial forsinkelse før visning af section1
});

// Get the scroll indicator and thumb
const scrollIndicator = document.querySelector(".scroll-indicator");
const scrollThumb = document.createElement("div"); // Create the thumb div
scrollThumb.classList.add("scroll-indicator-thumb");
scrollIndicator.appendChild(scrollThumb);

// Function to update the scroll indicator based on scroll position
function updateScrollIndicator() {
  const scrollPosition = window.scrollY; // Hvor langt ned på siden du er
  const windowHeight = window.innerHeight; // Højden af vinduet (viewport)
  const documentHeight = document.documentElement.scrollHeight; // Højden af hele dokumentet

  // Beregn hvor langt ned du er på siden som en procentdel
  const scrollPercentage =
    (scrollPosition / (documentHeight - windowHeight)) * 100;

  // Opdater højden af scroll-indikatoren (thumb)
  scrollThumb.style.height = `${scrollPercentage}%`;
}

// Event listener for scroll event
window.addEventListener("scroll", updateScrollIndicator);

// Initial opdatering af scroll-indikatoren ved første indlæsning
updateScrollIndicator();

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".kompetencer_card");

  function checkScroll() {
    const triggerHeight = window.innerHeight * 0.8; // Justér procenten for at styre forsinkelsen
    const scrollTop = window.scrollY || window.pageYOffset;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;

      // Hvis kortet er blevet scrollet ud af visningen (f.eks. oppe i toppen), fjern klassen
      if (cardTop > window.innerHeight || scrollTop === 0) {
        card.classList.remove("visible");
      }

      // Hvis kortet er synligt, tilføj klassen
      if (cardTop < triggerHeight) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Kør ved load for at fange allerede synlige kort
});

const sections = document.querySelectorAll("section"); // Henter alle sektioner
const activeSection = document.getElementById("active-section");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

// Funktion til at finde den aktuelle sektion i viewporten
function updateActiveSection() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id"); // Få fat i sektionens ID
    }
  });

  if (current) {
    const activeLink = document.querySelector(`a[href="#${current}"]`);
    if (activeLink) {
      activeSection.textContent = activeLink.textContent; // Opdater header
    }
  }
}

// Kør funktionen ved scroll
window.addEventListener("scroll", updateActiveSection);
updateActiveSection(); // Kør ved load for at sætte startværdien

// Dropdown-menu funktionalitet
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("open");
});

// Luk menu og opdater aktivt punkt ved klik
document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    activeSection.textContent = e.target.textContent;
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
  });
});
