/* AdMoat — site interactions (vanilla, no dependencies) */
(function () {
  "use strict";

  /* Sticky header state */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile navigation */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.classList.remove("open");
      })
    );
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  /* Contact form -> mailto fallback (no backend required) */
  const form = document.querySelector("form[data-mailto]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const to = form.getAttribute("data-mailto");
      const get = (n) => (form.querySelector(`[name="${n}"]`) || {}).value || "";
      const subject = `【お問い合わせ】${get("name")} 様より`;
      const body =
        `お名前: ${get("name")}\n` +
        `会社名: ${get("company")}\n` +
        `メール: ${get("email")}\n` +
        `電話番号: ${get("tel")}\n` +
        `ご相談内容: ${get("topic")}\n\n` +
        `${get("message")}\n`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    });
  }

  /* Footer year */
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
