document.addEventListener("DOMContentLoaded", function () {
  // Language change functionality
  document.querySelector("#language-dk").addEventListener("click", function () {
    changeLanguage("da");
  });
  document.querySelector("#language-en").addEventListener("click", function () {
    changeLanguage("en");
  });

  function changeLanguage(locale) {
    fetch("language.json")
      .then((response) => response.json())
      .then((data) => {
        updateTexts(data[locale].texts);
      })
      .catch((error) => console.error("Fejl ved hentning af JSON:", error));
  }

  function updateTexts(textArray) {
    textArray.forEach((element) => {
      const el = document.querySelector(element.location);
      if (el) {
        el.innerHTML = element.text;
      }
    });
  }

  // Scroll and animation handling
  const section1 = document.querySelector("#section1");
  const paragraphs = section1.querySelectorAll("p");

  setTimeout(() => {
    section1.classList.add("visible");

    paragraphs.forEach((p, index) => {
      setTimeout(() => {
        p.classList.add("visible");
      }, index * 200);
    });
  }, 150);

  // Scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollThumb = document.createElement("div");
  scrollThumb.classList.add("scroll-indicator-thumb");
  scrollIndicator.appendChild(scrollThumb);

  function updateScrollIndicator() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercentage =
      (scrollPosition / (documentHeight - windowHeight)) * 100;
    scrollThumb.style.height = `${scrollPercentage}%`;
  }

  window.addEventListener("scroll", updateScrollIndicator);
  updateScrollIndicator();

  // Kompetenz cards visibility handling
  const cards = document.querySelectorAll(".kompetencer_card");

  function checkScroll() {
    const triggerHeight = window.innerHeight * 0.8;
    const scrollTop = window.scrollY || window.pageYOffset;

    cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop > window.innerHeight || scrollTop === 0) {
        card.classList.remove("visible");
      }

      if (cardTop < triggerHeight) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();

  // Navigation section handling
  const sections = document.querySelectorAll("section");
  const activeSection = document.getElementById("active-section");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");

  function updateActiveSection() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    if (current) {
      const activeLink = document.querySelector(`a[href="#${current}"]`);
      if (activeLink) {
        activeSection.textContent = activeLink.textContent;
      }
    }
  }

  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", (e) => {
      activeSection.textContent = e.target.textContent;
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });

  // Modal functionality
  const openModalBtn = document.getElementById("openModal");
  const modal = document.getElementById("videoModal");
  const closeModalBtn = document.querySelector(".close");
  const vimeoPlayer = document.getElementById("vimeoPlayer");
  const player = new Vimeo.Player(vimeoPlayer);
  let isModalOpen = false;

  modal.style.display = "none";

  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
    isModalOpen = true;
    player.setCurrentTime(0);
    player.play();
  });

  closeModalBtn.addEventListener("click", function () {
    closeModal();
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("scroll", function () {
    if (isModalOpen) {
      const projekt3 = document.getElementById("projekt3");
      const rect = projekt3.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        closeModal();
      }
    }
  });

  function closeModal() {
    modal.style.display = "none";
    isModalOpen = false;
    player.pause();
  }

  // Header color change on project intersection
  const headerLinks = document.querySelectorAll("header a");
  const headerButtons = document.querySelectorAll("header button");
  const languageSwitcherDivider = document.querySelector(
    "header #language-switcher div"
  );
  const projects = [
    { selector: "#projekt1", color: "var(--primary-light)" },
    { selector: "#projekt2", color: "var(--primary-light)" },
    { selector: "#projekt3", color: "var(--primary-light)" },
    { selector: "#projekt4", color: "var(--primary-light)" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      let active = false;
      entries.forEach((entry) => {
        const project = projects.find(
          (p) => p.selector === `#${entry.target.id}`
        );

        if (entry.isIntersecting && project) {
          headerLinks.forEach((link) => {
            link.style.color = project.color;
          });
          headerButtons.forEach((button) => {
            button.style.color = project.color; // Change button color as well
          });
          if (languageSwitcherDivider) {
            languageSwitcherDivider.style.color = project.color; // Change divider color
          }
          active = true;
        }
      });

      if (!active) {
        headerLinks.forEach((link) => {
          link.style.color = "var(--primary-green)";
        });
        headerButtons.forEach((button) => {
          button.style.color = "var(--primary-green)"; // Reset button color
        });
        if (languageSwitcherDivider) {
          languageSwitcherDivider.style.color = "var(--primary-green)"; // Reset divider color
        }
      }
    },
    { threshold: 0.5 }
  );

  projects.forEach((project) => {
    const projectElement = document.querySelector(project.selector);
    if (projectElement) {
      observer.observe(projectElement);
    }
  });
});
