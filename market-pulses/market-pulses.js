function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('open');
}

function toggleDropdown(event, element) {
    event.preventDefault();
    const dropdown = element.parentElement;
    dropdown.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the totalSlides from the data attribute on the parent container
    const infoContainer = document.querySelector("main");
    const totalSlides = parseInt(infoContainer.getAttribute("data-total-slides"), 10); // Get the totalSlides dynamically

    let currentSlide = 1;

    // Load images dynamically into the image carousel
    const carouselImages = document.querySelector(".carousel-images");
    for (let i = 1; i <= totalSlides; i++) {
        const img = document.createElement("img");
        img.src = `s${i}.jpg`; // Image paths (adjust accordingly)
        img.alt = `Slide ${i}`;
        img.classList.add("carousel-slide");
        carouselImages.appendChild(img);
    }

    // Function to show the current slide (for both carousels)
    function showTextSlide(slideNumber) {
        const textSlides = document.querySelectorAll(".text-carousel-slide");
        textSlides.forEach((slide, index) => {
            slide.style.display = (index + 1 === slideNumber) ? "block" : "none";
        });
    }

    function showImageSlide(slideNumber) {
        const imageSlides = document.querySelectorAll(".carousel-images img");
        imageSlides.forEach((img, index) => {
            img.style.display = (index + 1 === slideNumber) ? "block" : "none";
        });
    }

    // Show the first slide for both carousels initially
    showTextSlide(currentSlide);
    showImageSlide(currentSlide);

    // Shared Navigation Button Logic
    document.querySelector("#next-button").addEventListener("click", function () {
        // Move to the next slide for both carousels
        currentSlide = (currentSlide % totalSlides) + 1; // Corrected logic: single increment
        showTextSlide(currentSlide);
        showImageSlide(currentSlide);
    });

    document.querySelector("#back-button").addEventListener("click", function () {
        // Move to the previous slide for both carousels
        currentSlide = (currentSlide === 1) ? totalSlides : currentSlide - 1; // Corrected logic: single decrement
        showTextSlide(currentSlide);
        showImageSlide(currentSlide);
    });
});
