
document.documentElement.classList.add("js");

// Menu mobile
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuToggle.addEventListener("click", function () {
  setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
  if (e.matches) setMenu(false);
});

// Rolagem suave para âncoras internas (compensando o header fixo)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (event) {
    const id = anchor.getAttribute("href");
    if (id === "#" || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    history.pushState(null, "", id);
  });
});

// Header com fundo ao rolar
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 20);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Link ativo no menu conforme a seção visível
const navLinks = document.querySelectorAll(".nav__link");
const sections = ["inicio", "servicos", "sobre", "contato"]
  .map(function (id) {
    return document.getElementById(id);
  })
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Animações leves ao rolar
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--delay", Math.min(index, 5) * 90 + "ms");
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(function (el) {
    el.classList.add("is-visible");
  });
}

// Ano atual no rodapé
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
