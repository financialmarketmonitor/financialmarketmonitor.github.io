// ================== GLOBAL STATE ==================
let totalSlides = 0;
let currentSlide = 1;

// ================== GLOBAL HELPERS ==================
function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav?.classList.toggle("open");
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

// ================== HEADER ==================
function buildHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const pulses = [
    { n: 15, date: "01/26/2026" },
    { n: 14, date: "01/19/2026" },
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

  const debriefs = [
    { n: 5, date: "02/17/2026" },
    { n: 4, date: "02/12/2026" },
    { n: 3, date: "02/11/2026" },
    { n: 2, date: "02/10/2026" },
    { n: 1, date: "02/09/2026" }
  ];

  const extras = [
    { href: "/other/trade-signal-1/trade-signal-1.html", label: "Trade Signal 1 11/04/2024" },
    { href: "/other/trade-signal-2/trade-signal-2.html", label: "Trade Signal 2 03/10/2025" }
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
      pulses.map(p =>
        navItem({
          href: `/market-pulses/mp${p.n}/market-pulse-${p.n}.html`,
          label: `Market Pulse ${p.n} ${p.date}`,
          active: currentPulse === p.n
        })
      ),
      currentPulse !== null
    )
  );

  ul.appendChild(
    dropdown(
      "Daily Debriefs",
      debriefs.map(d =>
        navItem({
          href: `/daily-debriefs/dd${d.n}/dd${d.n}.html`,
          label: `Daily Debrief ${d.n} ${d.date}`,
          active: false
        })
      )
    )
  );

  ul.appendChild(
    dropdown(
      "Other",
      extras.map(e => navItem({ ...e, active: false }))
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
  anchor.textContent = title;
  anchor.onclick = e => e.preventDefault();
  if (activeParent) anchor.classList.add("active");

  const sub = document.createElement("ul");
  sub.classList.add("dropdown-content");
  items.forEach(i => sub.appendChild(i));

  li.append(anchor, sub);
  return li;
}

function logo(cls) {
  const img = document.createElement("img");
  img.src = "/website-logo.jpg";
  img.alt = "Website Logo";
  img.className = cls;
  return img;
}

// ================== TOC ==================
function initTOC() {
  const tocItems = document.querySelectorAll("#toc-list li");
  if (!tocItems.length) return;

  tocItems.forEach(li => {
    const slide = parseInt(li.dataset.slide, 10);
    if (Number.isNaN(slide)) return;

    li.addEventListener("click", () => {
      goToSlide(slide);
    });
  });
}

function updateActiveTOC() {
  const tocItems = document.querySelectorAll("#toc-list li");
  tocItems.forEach(li => {
    const slide = parseInt(li.dataset.slide, 10);
    li.classList.toggle("active", slide === currentSlide);
  });
}

// ================== CAROUSEL CORE ==================
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

function updateSliderLabel() {
  const slider = document.getElementById("carousel-slider");
  const label = document.getElementById("slider-label");

  if (label) {
    label.textContent = `Slide ${currentSlide} of ${totalSlides}`;
  }
  if (slider) {
    slider.value = currentSlide;
  }
}

function goToSlide(slideNumber) {
  if (slideNumber < 1 || slideNumber > totalSlides) return;

  currentSlide = slideNumber;
  showTextSlide(currentSlide);
  showImageSlide(currentSlide);
  updateSliderLabel();
  updateActiveTOC();
}

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  buildHeader();

  const infoContainer = document.querySelector("main");
  if (!infoContainer) return;

  totalSlides = parseInt(infoContainer.dataset.totalSlides, 10) || 1;
  currentSlide = 1;

  // Build image slides dynamically
  const carouselImages = document.querySelector(".carousel-images");
  for (let i = 1; i <= totalSlides; i++) {
    const img = document.createElement("img");
    img.src = `s${i}.jpg`;
    img.alt = `Slide ${i}`;
    img.className = "carousel-slide";
    img.style.display = "none"; // hide initially
    carouselImages.appendChild(img);
  }

  // Slider
  const slider = document.getElementById("carousel-slider");
  if (slider) {
    slider.min = 1;
    slider.max = totalSlides;
    slider.value = currentSlide;
    slider.addEventListener("input", () => {
      goToSlide(parseInt(slider.value, 10));
    });
  }

  // Buttons
  document.querySelector("#next-button")
    ?.addEventListener("click", () =>
      goToSlide((currentSlide % totalSlides) + 1)
    );

  document.querySelector("#back-button")
    ?.addEventListener("click", () =>
      goToSlide(currentSlide === 1 ? totalSlides : currentSlide - 1)
    );

  // Initialize TOC clicks
  initTOC();

  // Initial render
  goToSlide(1);
});
