 
/* =========================================================
   MUHAMMAD WASIF PORTFOLIO
   script.js
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");

const themeToggle = document.getElementById("themeToggle");

const scrollTop = document.getElementById("scrollTop");

const currentYear = document.getElementById("currentYear");

const navLinks = document.querySelectorAll(".navbar a");

const sections = document.querySelectorAll("main section[id]");


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navbar || !menuToggle) {
            return;
        }

        navbar.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon = themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


/* Load saved theme */

const savedTheme = localStorage.getItem("mwPortfolioTheme");

if (savedTheme === "light") {

    body.classList.add("light-mode");

}


/* Theme button */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        const currentTheme =
            body.classList.contains("light-mode")
                ? "light"
                : "dark";

        localStorage.setItem(
            "mwPortfolioTheme",
            currentTheme
        );

        updateThemeIcon();

    });

}


/* Set correct icon when page loads */

updateThemeIcon();


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


/* Run on scroll */

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* Run on page load */

updateActiveNavigation();


/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

function updateScrollButton() {

    if (!scrollTop) {
        return;
    }

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    updateScrollButton
);


if (scrollTop) {

    scrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length < 2
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight = 80;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   REVEAL ELEMENTS ON SCROLL
========================================================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .contact-item, .about-content, .about-image"
);


/* Initial state */

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


/* Intersection Observer */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(".skill-bar span");


skillBars.forEach(bar => {

    const originalWidth =
        bar.style.width;

    bar.style.width = "0";

    bar.style.transition =
        "width 1.2s ease";

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            bar.style.width =
                                originalWidth;

                        }, 200);

                        observer.unobserve(
                            bar
                        );

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

    observer.observe(bar);

});


/* =========================================================
   PREVENT BROKEN EXTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(link => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    updateActiveNavigation();

    updateScrollButton();

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "Muhammad Wasif Portfolio loaded successfully."
);

console.log(
    "Web Developer | Frontend Developer"
);
  loadTheme();
