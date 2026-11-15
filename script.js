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