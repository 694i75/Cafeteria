const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".slider-dot"));
const slideCount = document.querySelector(".slide-count");
const previousButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

let activeSlide = 0;

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        dots[slideIndex].classList.toggle("is-active", isActive);

        if (isActive) {
            dots[slideIndex].setAttribute("aria-current", "true");
        } else {
            dots[slideIndex].removeAttribute("aria-current");
        }
    });

    slideCount.innerHTML = `${String(activeSlide + 1).padStart(2, "0")} <span>/</span> ${String(slides.length).padStart(2, "0")}`;
}

previousButton.addEventListener("click", () => showSlide(activeSlide - 1));
nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
});

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) {
        return;
    }

    const submenu = link.closest(".has-submenu");
    if (submenu && link.parentElement === submenu && window.matchMedia("(max-width: 800px)").matches) {
        const isExpanded = link.getAttribute("aria-expanded") === "true";
        link.setAttribute("aria-expanded", String(!isExpanded));
        submenu.classList.toggle("submenu-open", !isExpanded);
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
});
