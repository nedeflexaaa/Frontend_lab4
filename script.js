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

for (const link of pageLinks) {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const pageName = link.dataset.pageLink;
        if (window.location.hash === `#${pageName}`) {
            showPage(pageName);
            return;
        }
        window.location.hash = pageName;
    });
}

window.addEventListener("hashchange", () => {
    showPage(pageFromHash());
});

const carouselTrack = document.getElementById("carouselTrack");
const carouselDots = document.getElementById("carouselDots");
const carouselCounter = document.getElementById("carouselCounter");
const carouselSlides = document.getElementsByClassName("carousel-slide");
let carouselIndex = 0;
let carouselTimer = null;

function renderDots() {
    while (carouselDots.firstChild) {
        carouselDots.removeChild(carouselDots.firstChild);
    }
    for (let index = 0; index < carouselSlides.length; index += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", `Слайд ${index + 1}`);
        if (index === carouselIndex) {
            dot.classList.add("is-active");
        }
        dot.addEventListener("click", () => {
            goToSlide(index);
        });
        carouselDots.appendChild(dot);
    }
}

function goToSlide(index) {
    carouselIndex = (index + carouselSlides.length) % carouselSlides.length;
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
    carouselCounter.textContent = `${carouselIndex + 1} / ${carouselSlides.length}`;
    renderDots();
}