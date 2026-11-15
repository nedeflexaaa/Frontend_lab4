const motto = "Створюємо цифрові продукти, які працюють на людей.";
const mottoText = document.getElementById("mottoText");
let mottoIndex = 0;

function typeMotto() {
    if (mottoIndex <= motto.length) {
        mottoText.textContent = motto.slice(0, mottoIndex);
        mottoIndex += 1;
        window.setTimeout(typeMotto, 55);
        return;
    }
    window.setTimeout(() => {
        mottoText.textContent = "";
        mottoIndex = 0;
        typeMotto();
    }, 2400);
}

function startMotto() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        mottoText.textContent = motto;
        return;
    }
    typeMotto();
}

const pageLinks = document.querySelectorAll("[data-page-link]");

function pageFromHash() {
    const page = window.location.hash.replace("#", "");
    return ["home", "projects", "feedback"].includes(page) ? page : "home";
}

function showPage(pageName) {
    const sections = document.getElementsByTagName("section");
    for (const section of sections) {
        if (!section.dataset.page) {
            continue;
        }
        section.hidden = section.dataset.page !== pageName;
    }
    for (const link of pageLinks) {
        if (link.dataset.pageLink === pageName) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    }
    document.body.dataset.currentPage = pageName;
    if (pageName === "projects") {
        startCarousel();
    } else {
        stopCarousel();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}