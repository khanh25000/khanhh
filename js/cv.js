// Khởi tạo hiệu ứng particles background
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00ddeb" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ddeb",
      opacity: 0.4,
      width: 1,
    },
    move: { enable: true, speed: 2, direction: "none", random: false },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: { grab: { distance: 200 }, push: { particles_nb: 4 } },
  },
  retina_detect: true,
});

// Xử lý menu mobile
const navMenu = document.querySelector(".nav-menu");
const logo = document.querySelector(".logo-img");

// Click logo để toggle menu trên mobile
if (logo && navMenu) {
  logo.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Highlight menu item tương ứng với trang hiện tại
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");

    if (
      (currentPage === "index.html" && linkPage === "index.html") ||
      currentPage === linkPage
    ) {
      link.classList.add("active");
    }
  });
});

// Xử lý modal cho các mẫu CV
document.querySelectorAll(".job-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = card.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Ngăn scroll khi modal mở
    }
  });
});

// Hàm đóng modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Khôi phục scroll
  }
}

// Đóng modal khi click bên ngoài nội dung modal
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Highlight menu item tương ứng với trang hiện tại
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link:not(.nav-link-topcv)"); // Loại trừ Top CV
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPage = link.getAttribute("href");

    if (
      (currentPage === "index.html" && linkPage === "index.html") ||
      currentPage === linkPage
    ) {
      link.classList.add("active");
    }
  });
});

// Animation cho các reason card
const reasonCards = document.querySelectorAll(".reason-card");
reasonCards.forEach((card, index) => {
  card.style.setProperty("--order", index);
});

// Xử lý khi scroll để thêm hiệu ứng cho header
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// Xử lý responsive cho menu
function handleResponsiveMenu() {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
  }
}

window.addEventListener("resize", handleResponsiveMenu);
