/* =========================================================
   MUHAMMAD WASIF PORTFOLIO
   ADMIN PANEL JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   ADMIN LOGIN
========================================================= */

/*
   IMPORTANT:
   This is only a frontend demo login.
   Do NOT use this as real security.

   We will replace this with real authentication
   when the online database/backend is connected.
*/

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";

const loginScreen = document.getElementById("loginScreen");
const adminApp = document.getElementById("adminApp");

const loginForm = document.getElementById("loginForm");
const adminUsername = document.getElementById("adminUsername");
const adminPassword = document.getElementById("adminPassword");

const loginError = document.getElementById("loginError");

const passwordToggle = document.getElementById("passwordToggle");

const logoutBtn = document.getElementById("logoutBtn");


/* =========================================================
   STORAGE
========================================================= */

const STORAGE = {
    about: "mw_about",
    skills: "mw_skills",
    education: "mw_education",
    experience: "mw_experience",
    projects: "mw_projects",
    achievements: "mw_achievements",
    certificates: "mw_certificates",
    services: "mw_services",
    gallery: "mw_gallery",
    goals: "mw_goals",
    hobbies: "mw_hobbies",
    testimonials: "mw_testimonials",
    statistics: "mw_statistics",
    contact: "mw_contact",
    faq: "mw_faq"
};


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultData = {

    skills: [
        {
            id: createId(),
            title: "HTML",
            description: "Building structured and semantic websites.",
            value: 90
        },
        {
            id: createId(),
            title: "CSS",
            description: "Responsive layouts and modern UI design.",
            value: 85
        },
        {
            id: createId(),
            title: "JavaScript",
            description: "Interactive website functionality.",
            value: 75
        },
        {
            id: createId(),
            title: "Web Development",
            description: "Frontend website development.",
            value: 85
        }
    ],

    education: [
        {
            id: createId(),
            title: "Class 10",
            description: "Currently studying Class 10.",
            year: "Current"
        },
        {
            id: createId(),
            title: "Web Development",
            description: "Completed Web Development.",
            year: "Completed"
        },
        {
            id: createId(),
            title: "Frontend Development",
            description: "Completed Frontend Development.",
            year: "Completed"
        }
    ],

    projects: [
        {
            id: createId(),
            title: "The Citizen Model Academy",
            description: "School website with modern pages and student portal.",
            image: "",
            link: "https://modammadwasif-creator.github.io/THE-CITIZEN-MODEL-ACDEMY/index.html"
        },
        {
            id: createId(),
            title: "Spicy Villa",
            description: "Restaurant website with menu and ordering features.",
            image: "",
            link: "https://modammadwasif-creator.github.io/SPICY-VILLA/"
        }
    ],

    certificates: [],

    achievements: [],

    experience: [],

    services: [
        {
            id: createId(),
            title: "Website Development",
            description: "Modern responsive websites using HTML, CSS and JavaScript."
        },
        {
            id: createId(),
            title: "Frontend Development",
            description: "Clean and responsive frontend interfaces."
        },
        {
            id: createId(),
            title: "Website UI Design",
            description: "Modern user interfaces for websites."
        }
    ],

    gallery: [],

    goals: [
        {
            id: createId(),
            title: "Become a Full Stack Web Developer",
            description: "Learn frontend, backend and database development."
        }
    ],

    hobbies: [
        {
            id: createId(),
            title: "Coding",
            description: "Building websites and learning programming."
        },
        {
            id: createId(),
            title: "Learning",
            description: "Learning new web development technologies."
        }
    ],

    testimonials: [],

    statistics: [
        {
            id: createId(),
            title: "Projects",
            value: "2"
        },
        {
            id: createId(),
            title: "Skills",
            value: "4"
        },
        {
            id: createId(),
            title: "Courses",
            value: "2"
        },
        {
            id: createId(),
            title: "Goal",
            value: "1"
        }
    ],

    faq: []
};


/* =========================================================
   HELPERS
========================================================= */

function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}


function getData(key) {

    const saved = localStorage.getItem(STORAGE[key]);

    if (saved) {

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.error("Storage error:", error);
        }
    }

    return defaultData[key] || [];
}


function saveData(key, data) {

    localStorage.setItem(
        STORAGE[key],
        JSON.stringify(data)
    );
}


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   LOGIN
========================================================= */

function checkLogin() {

    const loggedIn =
        sessionStorage.getItem("mwAdminLoggedIn");

    if (loggedIn === "true") {

        loginScreen.style.display = "none";

        adminApp.classList.add("show");

        initializeAdmin();

    } else {

        loginScreen.style.display = "flex";

        adminApp.classList.remove("show");
    }
}


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = adminUsername.value.trim();
    const password = adminPassword.value;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "mwAdminLoggedIn",
            "true"
        );

        loginError.textContent = "";

        loginScreen.style.display = "none";

        adminApp.classList.add("show");

        initializeAdmin();

    } else {

        loginError.textContent =
            "Incorrect username or password.";

    }

});


passwordToggle.addEventListener("click", function() {

    const isPassword =
        adminPassword.type === "password";

    adminPassword.type =
        isPassword ? "text" : "password";

    passwordToggle.innerHTML =
        isPassword
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

});


logoutBtn.addEventListener("click", function() {

    sessionStorage.removeItem("mwAdminLoggedIn");

    location.reload();

});


/* =========================================================
   NAVIGATION
========================================================= */

const sidebarLinks =
    document.querySelectorAll(".sidebar-link");

const adminSections =
    document.querySelectorAll(".admin-section");

const pageTitle =
    document.getElementById("pageTitle");


function openSection(sectionId) {

    adminSections.forEach(section => {
        section.classList.remove("active");
    });

    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.add("active");
    }

    sidebarLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.section === sectionId
        );

    });

    const activeLink =
        document.querySelector(
            `.sidebar-link[data-section="${sectionId}"]`
        );

    if (activeLink) {

        pageTitle.textContent =
            activeLink.textContent.trim();

    } else {

        pageTitle.textContent = sectionId;

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


sidebarLinks.forEach(link => {

    link.addEventListener("click", function() {

        openSection(
            this.dataset.section
        );

        closeMobileSidebar();

    });

});


document.querySelectorAll(
    "[data-section]"
).forEach(button => {

    if (
        !button.classList.contains("sidebar-link")
    ) {

        button.addEventListener(
            "click",
            function() {

                openSection(
                    this.dataset.section
                );

            }
        );

    }

});


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const sidebar =
    document.getElementById("sidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");


mobileMenuBtn.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle("show");

    }
);


function closeMobileSidebar() {

    sidebar.classList.remove("show");

}


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   ABOUT
========================================================= */

const aboutForm =
    document.getElementById("aboutForm");


function loadAbout() {

    const data =
        JSON.parse(
            localStorage.getItem(STORAGE.about)
        ) || {

            name: "Muhammad Wasif S/O Muhammad Asif",

            title:
                "Web Developer & Frontend Developer",

            description:
                "I am a Class 10 student and web developer learning modern web development.",

            education: "Class 10",

            goal: "Full Stack Web Developer"
        };


    document.getElementById("aboutName").value =
        data.name || "";

    document.getElementById("aboutTitle").value =
        data.title || "";

    document.getElementById("aboutDescription").value =
        data.description || "";

    document.getElementById("aboutEducation").value =
        data.education || "";

    document.getElementById("aboutGoal").value =
        data.goal || "";
}


aboutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const data = {

            name:
                document.getElementById("aboutName").value.trim(),

            title:
                document.getElementById("aboutTitle").value.trim(),

            description:
                document.getElementById("aboutDescription").value.trim(),

            education:
                document.getElementById("aboutEducation").value.trim(),

            goal:
                document.getElementById("aboutGoal").value.trim()

        };


        localStorage.setItem(
            STORAGE.about,
            JSON.stringify(data)
        );


        showToast(
            "About information saved."
        );

    }
);


/* =========================================================
   GENERIC LIST RENDERER
========================================================= */

function renderList(
    key,
    containerId,
    emptyIcon,
    emptyText,
    showValue = false
) {

    const container =
        document.getElementById(containerId);

    if (!container) return;


    const data = getData(key);


    if (!data.length) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="${emptyIcon}"></i>
                <p>${emptyText}</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.map(item => `

            <div class="admin-item">

                <div class="admin-item-info">

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    <p>
                        ${
                            escapeHTML(
                                item.description || ""
                            )
                        }

                        ${
                            showValue && item.value
                                ? ` • ${escapeHTML(item.value)}`
                                : ""
                        }

                        ${
                            item.year
                                ? ` • ${escapeHTML(item.year)}`
                                : ""
                        }

                    </p>

                </div>

                <div class="admin-item-actions">

                    <button
                        class="item-btn edit"
                        onclick="editItem('${key}','${item.id}')"
                        title="Edit"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="item-btn delete"
                        onclick="deleteItem('${key}','${item.id}')"
                        title="Delete"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        `).join("");
}


/* =========================================================
   DELETE ITEM
========================================================= */

window.deleteItem = function(key, id) {

    const data = getData(key);

    const filtered =
        data.filter(item => item.id !== id);

    saveData(key, filtered);

    renderEverything();

    showToast("Item deleted.");

};


/* =========================================================
   EDIT ITEM
========================================================= */

window.editItem = function(key, id) {

    const data = getData(key);

    const item =
        data.find(entry => entry.id === id);

    if (!item) return;


    const title =
        prompt(
            "Enter title:",
            item.title || ""
        );

    if (title === null) return;


    const description =
        prompt(
            "Enter description:",
            item.description || ""
        );

    if (description === null) return;


    item.title = title.trim();

    item.description =
        description.trim();


    if (key === "skills") {

        const value =
            prompt(
                "Enter skill percentage:",
                item.value || 0
            );

        if (value !== null) {
            item.value =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(value) || 0
                    )
                );
        }
    }


    if (key === "education") {

        const year =
            prompt(
                "Enter year/status:",
                item.year || ""
            );

        if (year !== null) {
            item.year = year.trim();
        }
    }


    saveData(key, data);

    renderEverything();

    showToast("Item updated.");

};


/* =========================================================
   SKILLS
========================================================= */

document.getElementById(
    "addSkillBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Skill name:");

        if (!title) return;


        const description =
            prompt("Skill description:");

        if (description === null) return;


        let value =
            Number(
                prompt(
                    "Skill percentage (0-100):",
                    "80"
                )
            );


        if (Number.isNaN(value)) {
            value = 0;
        }


        value =
            Math.max(
                0,
                Math.min(100, value)
            );


        const data =
            getData("skills");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim(),

            value

        });


        saveData("skills", data);

        renderEverything();

        showToast("Skill added.");

    }
);


/* =========================================================
   EDUCATION
========================================================= */

document.getElementById(
    "addEducationBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Education / course name:");

        if (!title) return;


        const description =
            prompt("Description:");

        if (description === null) return;


        const year =
            prompt(
                "Year / status:",
                "Completed"
            );


        if (year === null) return;


        const data =
            getData("education");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim(),

            year: year.trim()

        });


        saveData("education", data);

        renderEverything();

        showToast("Education added.");

    }
);


/* =========================================================
   EXPERIENCE
========================================================= */

document.getElementById(
    "addExperienceBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Experience title:");

        if (!title) return;


        const description =
            prompt("Experience description:");

        if (description === null) return;


        const data =
            getData("experience");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim()

        });


        saveData("experience", data);

        renderEverything();

        showToast("Experience added.");

    }
);


/* =========================================================
   PROJECTS
========================================================= */

document.getElementById(
    "addProjectBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Project name:");

        if (!title) return;


        const description =
            prompt("Project description:");

        if (description === null) return;


        const link =
            prompt("Project URL:", "https://");


        if (link === null) return;


        const image =
            prompt(
                "Project image URL (optional):"
            );


        const data =
            getData("projects");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim(),

            link: link.trim(),

            image:
                image ? image.trim() : ""

        });


        saveData("projects", data);

        renderEverything();

        showToast("Project added.");

    }
);


/* =========================================================
   ACHIEVEMENTS
========================================================= */

document.getElementById(
    "addAchievementBtn"
).addEventListener(
    "click",
    function() {

        addSimpleItem(
            "achievements",
            "Achievement"
        );

    }
);


/* =========================================================
   CERTIFICATES
========================================================= */

document.getElementById(
    "addCertificateBtn"
).addEventListener(
    "click",
    function() {

        addSimpleItem(
            "certificates",
            "Certificate"
        );

    }
);


/* =========================================================
   SERVICES
========================================================= */

document.getElementById(
    "addServiceBtn"
).addEventListener(
    "click",
    function() {

        addSimpleItem(
            "services",
            "Service"
        );

    }
);


/* =========================================================
   GOALS
========================================================= */

document.getElementById(
    "addGoalBtn"
).addEventListener(
    "click",
    function() {

        addSimpleItem(
            "goals",
            "Goal"
        );

    }
);


/* =========================================================
   HOBBIES
========================================================= */

document.getElementById(
    "addHobbyBtn"
).addEventListener(
    "click",
    function() {

        addSimpleItem(
            "hobbies",
            "Hobby / Interest"
        );

    }
);


/* =========================================================
   SIMPLE ITEM
========================================================= */

function addSimpleItem(key, label) {

    const title =
        prompt(`${label} name:`);

    if (!title) return;


    const description =
        prompt(`${label} description:`);

    if (description === null) return;


    const data =
        getData(key);


    data.push({

        id: createId(),

        title: title.trim(),

        description:
            description.trim()

    });


    saveData(key, data);

    renderEverything();

    showToast(
        `${label} added.`
    );

}


/* =========================================================
   TESTIMONIALS
========================================================= */

document.getElementById(
    "addTestimonialBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Person name:");

        if (!title) return;


        const description =
            prompt("Testimonial:");

        if (description === null) return;


        const data =
            getData("testimonials");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim()

        });


        saveData(
            "testimonials",
            data
        );

        renderEverything();

        showToast(
            "Testimonial added."
        );

    }
);


/* =========================================================
   STATISTICS
========================================================= */

document.getElementById(
    "addStatisticBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt("Statistic name:");

        if (!title) return;


        const value =
            prompt("Statistic value:");

        if (value === null) return;


        const data =
            getData("statistics");


        data.push({

            id: createId(),

            title: title.trim(),

            value: value.trim()

        });


        saveData(
            "statistics",
            data
        );

        renderEverything();

        showToast(
            "Statistic added."
        );

    }
);


/* =========================================================
   GALLERY
========================================================= */

document.getElementById(
    "addGalleryBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt(
                "Image title:"
            );

        if (!title) return;


        const image =
            prompt(
                "Image URL:"
            );

        if (!image) return;


        const data =
            getData("gallery");


        data.push({

            id: createId(),

            title: title.trim(),

            image: image.trim()

        });


        saveData(
            "gallery",
            data
        );

        renderEverything();

        showToast(
            "Gallery image added."
        );

    }
);


/* =========================================================
   FAQ
========================================================= */

document.getElementById(
    "addFaqBtn"
).addEventListener(
    "click",
    function() {

        const title =
            prompt(
                "Question:"
            );

        if (!title) return;


        const description =
            prompt(
                "Answer:"
            );

        if (description === null) return;


        const data =
            getData("faq");


        data.push({

            id: createId(),

            title: title.trim(),

            description:
                description.trim()

        });


        saveData(
            "faq",
            data
        );

        renderEverything();

        showToast(
            "FAQ added."
        );

    }
);


/* =========================================================
   CONTACT
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


function loadContact() {

    const data =
        JSON.parse(
            localStorage.getItem(
                STORAGE.contact
            )
        ) || {

            phone: "03007024050",

            email:
                "modammadwasif@gmail.com",

            github:
                "https://github.com/modammadwasif-creator",

            image:
                "https://i.ibb.co/mCZd1Qwm/Screenshot-2026-10-03-152015.png"
        };


    document.getElementById(
        "contactPhone"
    ).value = data.phone || "";


    document.getElementById(
        "contactEmail"
    ).value = data.email || "";


    document.getElementById(
        "contactGithub"
    ).value = data.github || "";


    document.getElementById(
        "contactImage"
    ).value = data.image || "";

}


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const data = {

            phone:
                document.getElementById(
                    "contactPhone"
                ).value.trim(),

            email:
                document.getElementById(
                    "contactEmail"
                ).value.trim(),

            github:
                document.getElementById(
                    "contactGithub"
                ).value.trim(),

            image:
                document.getElementById(
                    "contactImage"
                ).value.trim()

        };


        localStorage.setItem(
            STORAGE.contact,
            JSON.stringify(data)
        );


        showToast(
            "Contact information saved."
        );

    }
);


/* =========================================================
   GALLERY RENDER
========================================================= */

function renderGallery() {

    const container =
        document.getElementById(
            "galleryList"
        );


    const data =
        getData("gallery");


    if (!data.length) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-images"></i>
                <p>No gallery images yet.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        data.map(item => `

            <div class="gallery-admin-item">

                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.title)}"
                >

                <div class="gallery-admin-overlay">

                    <button
                        onclick="deleteItem('gallery','${item.id}')"
                        title="Delete image"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        `).join("");
}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEverything() {

    renderList(
        "skills",
        "skillsList",
        "fa-solid fa-code",
        "No skills added yet.",
        true
    );


    renderList(
        "education",
        "educationList",
        "fa-solid fa-graduation-cap",
        "No education added yet."
    );


    renderList(
        "experience",
        "experienceList",
        "fa-solid fa-briefcase",
        "No experience added yet."
    );


    renderList(
        "projects",
        "projectsList",
        "fa-solid fa-folder-open",
        "No projects added yet."
    );


    renderList(
        "achievements",
        "achievementsList",
        "fa-solid fa-trophy",
        "No achievements added yet."
    );


    renderList(
        "certificates",
        "certificatesList",
        "fa-solid fa-certificate",
        "No certificates added yet."
    );


    renderList(
        "services",
        "servicesList",
        "fa-solid fa-laptop-code",
        "No services added yet."
    );


    renderList(
        "goals",
        "goalsList",
        "fa-solid fa-bullseye",
        "No goals added yet."
    );


    renderList(
        "hobbies",
        "hobbiesList",
        "fa-solid fa-heart",
        "No hobbies added yet."
    );


    renderList(
        "testimonials",
        "testimonialsList",
        "fa-solid fa-comments",
        "No testimonials added yet."
    );


    renderList(
        "statistics",
        "statisticsList",
        "fa-solid fa-chart-column",
        "No statistics added yet."
    );


    renderList(
        "faq",
        "faqList",
        "fa-solid fa-circle-question",
        "No FAQs added yet."
    );


    renderGallery();

    updateDashboardCounts();

}


/* =========================================================
   DASHBOARD COUNTS
========================================================= */

function updateDashboardCounts() {

    document.getElementById(
        "projectCount"
    ).textContent =
        getData("projects").length;


    document.getElementById(
        "certificateCount"
    ).textContent =
        getData("certificates").length;


    document.getElementById(
        "galleryCount"
    ).textContent =
        getData("gallery").length;


    document.getElementById(
        "achievementCount"
    ).textContent =
        getData("achievements").length;

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeAdmin() {

    loadAbout();

    loadContact();

    renderEverything();

}


/* =========================================================
   START
========================================================= */

checkLogin();