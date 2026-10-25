
"use strict";

// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuButton = document.getElementById("menu-btn");
const navigation = document.getElementById("nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu when a navigation link is selected.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    });
  });

  // Close the mobile menu when switching to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    }
  });
}

// ======================================
// 2. SCROLL REVEAL ANIMATIONS
// ======================================

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  // Enable hidden initial states only when animation is supported.
  document.documentElement.classList.add("js-reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

// ======================================
// 3. AUTOMATIC FOOTER YEAR
// ======================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ======================================
// 4. NAVIGATION LINK HIGHLIGHT
// ======================================

const sectionLinks = document.querySelectorAll(
  '#nav-links a[href^="#"]'
);

const pageSections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window && sectionLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sectionLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${entry.target.id}`;

          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
