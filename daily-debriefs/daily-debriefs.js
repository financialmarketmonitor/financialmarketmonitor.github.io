// ================== GLOBAL HELPERS ==================
function getCurrentDebrief() {
  const m = window.location.pathname.match(/dd(\d+)/);
  return m ? Number(m[1]) : null;
}

function setCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

// ================== HEADER ==================
function buildHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const debriefs = [
    { n: 5, date: "02/17/2026" },
    { n: 4, date: "02/12/2026" },
    { n: 3, date: "02/11/2026" },
    { n: 2, date: "02/10/2026" },
    { n: 1, date: "02/09/2026" }
  ];

  const pulses = [
    { n: 15, date: "01/26/2026" },
    { n: 14, date: "01/19/2026" },
    { n: 13, date: "05/20/2025" },
    { n: 12, date: "03/17/2025" },
    { n: 11, date: "02/24/2025" },
    { n: 10, date: "02/03/2025" },
    { n: 9, date: "01/20/2025" },
    { n: 8, date: "01/06/2025" },
    { n: 7, date: "12/20/2024" },
    { n: 6, date: "11/18/2024" },
    { n: 5, date: "10/28/2024" },
    { n: 4, date: "10/14/2024" },
    { n: 3, date: "09/30/2024" },
    { n: 2, date: "09/23/2024" },
    { n: 1, date: "09/16/2024" }
  ];

  const extras = [
    { href: "/other/trade-signal-1/trade-signal-1.html", label: "Trade Signal 1 11/04/2024" },
    { href: "/other/trade-signal-2/trade-signal-2.html", label: "Trade Signal 2 03/10/2025" }
  ];

  const currentDebrief = getCurrentDebrief();
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
          active: false
        })
      )
    )
  );

  ul.appendChild(
    dropdown(
      "Daily Debriefs",
      debriefs.map(d =>
        navItem({
          href: `/daily-debriefs/dd${d.n}/dd${d.n}.html`,
          label: `Daily Debrief ${d.n} ${d.date}`,
          active: currentDebrief === d.n
        })
      ),
      currentDebrief !== null
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

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  setCurrentYear();
});
