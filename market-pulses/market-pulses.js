// ======= Global Helpers (can live outside DOMContentLoaded) =======
function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("open");
}
  
function toggleDropdown(event, element) {
    event.preventDefault();
    const dropdown = element.parentElement;
    dropdown.classList.toggle("open");
}
  
function getCurrentPulse() {
    const m = window.location.pathname.match(/mp(\d+)/);
    return m ? Number(m[1]) : null;
}
  
function buildHeader() {
    const header = document.getElementById("site-header");
  
    const pulses = [
      { n: 13, date: "05/20/2025" },
      { n: 12, date: "03/17/2025" },
      { n: 11, date: "02/24/2025" },
      { n: 10, date: "02/03/2025" },
      { n: 9,  date: "01/20/2025" },
      { n: 8,  date: "01/06/2025" },
      { n: 7,  date: "12/20/2024" },
      { n: 6,  date: "11/18/2024" },
      { n: 5,  date: "10/28/2024" },
      { n: 4,  date: "10/14/2024" },
      { n: 3,  date: "09/30/2024" },
      { n: 2,  date: "09/23/2024" },
      { n: 1,  date: "09/16/2024" }
    ];
  
    const extras = [
      { href: "/other/trade-signal-1/trade-signal-1.html", label: "Trading Signal 1 11/04/2024" }
    ];
  
    const currentPulse = getCurrentPulse();
  
    const ul = document.createElement("ul");
    ul.appendChild(navItem({
      href: "/index.html",
      label: "Home",
      active: window.location.pathname.endsWith("/index.html")
    }));
  
    ul.appendChild(
      dropdown(
        "Market Pulses",
        pulses.map((p) =>
          navItem({
            href: `/market-pulses/mp${p.n}/market-pulse-${p.n}.html`,
            label: `Market Pulse ${p.n} ${p.date}`,
            active: currentPulse === p.n,
          })
        ),
        currentPulse !== null
      )
    );
  
    ul.appendChild(
      dropdown(
        "Other",
        extras.map((e) => navItem({ ...e, active: false }))
      )
    );
  
    const nav = document.createElement("nav");
    nav.append(logo("website-logo-left"), ul, logo("website-logo-right"));
    header.appendChild(nav);
}
  
function navItem({ href, label, active }) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    if (active) a.classList.add("active");
    li.appendChild(a);
    return li;
}
  
function dropdown(title, items, activeParent = false) {
    const li = document.createElement("li");
    li.classList.add("dropdown");
    if (activeParent) li.classList.add("open");
  
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.onclick = (e) => e.preventDefault();
    anchor.textContent = title;
    if (activeParent) anchor.classList.add("active");
    li.appendChild(anchor);
  
    const sub = document.createElement("ul");
    sub.classList.add("dropdown-content");
    items.forEach((it) => sub.appendChild(it));
    li.appendChild(sub);
    return li;
}
  
function logo(cls) {
    const img = document.createElement("img");
    img.src = "/website-logo.jpg";
    img.alt = "Website Logo";
    img.className = cls;
    return img;
}
  
// ========================= Carousel + Slider =========================
document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
  
    const infoContainer = document.querySelector("main");
    const totalSlides = parseInt(infoContainer.getAttribute("data-total-slides"), 10);
    let currentSlide = 1;
  
    // ------- Image Carousel Setup -------
    const carouselImages = document.querySelector(".carousel-images");
    for (let i = 1; i <= totalSlides; i++) {
      const img = document.createElement("img");
      img.src = `s${i}.jpg`;
      img.alt = `Slide ${i}`;
      img.classList.add("carousel-slide");
      carouselImages.appendChild(img);
    }
  
    // ------- Slider Setup -------
    const slider = document.getElementById("carousel-slider");
    const sliderLabel = document.getElementById("slider-label");
    if (slider) {
      slider.max = totalSlides;
      slider.value = currentSlide;
    }
  
    function updateSliderLabel() {
      if (sliderLabel) {
        sliderLabel.textContent = `Slide ${currentSlide} of ${totalSlides}`;
      }
      if (slider) {
        slider.value = currentSlide;
      }
    }
  
    // ------- Show Functions -------
    function showTextSlide(slideNumber) {
      const textSlides = document.querySelectorAll(".text-carousel-slide");
      textSlides.forEach((slide, index) => {
        slide.style.display = index + 1 === slideNumber ? "block" : "none";
      });
    }
  
    function showImageSlide(slideNumber) {
      const imageSlides = document.querySelectorAll(".carousel-images img");
      imageSlides.forEach((img, index) => {
        img.style.display = index + 1 === slideNumber ? "block" : "none";
      });
    }
  
    // ------- Initial Render -------
    showTextSlide(currentSlide);
    showImageSlide(currentSlide);
    updateSliderLabel();
  
    // ------- Slider Listener -------
    if (slider) {
      slider.addEventListener("input", function () {
        currentSlide = parseInt(this.value, 10);
        showTextSlide(currentSlide);
        showImageSlide(currentSlide);
        updateSliderLabel();
      });
    }
  
    // ------- Button Logic -------
    document.querySelector("#next-button")?.addEventListener("click", function () {
      currentSlide = (currentSlide % totalSlides) + 1;
      showTextSlide(currentSlide);
      showImageSlide(currentSlide);
      updateSliderLabel();
    });
  
    document.querySelector("#back-button")?.addEventListener("click", function () {
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
      showTextSlide(currentSlide);
      showImageSlide(currentSlide);
      updateSliderLabel();
    });
});  
