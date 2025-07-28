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

const navMenu = document.querySelector(".nav-menu");
const logo = document.querySelector(".logo-img");
logo.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Chỉ áp dụng smooth scroll cho các liên kết nội bộ (bắt đầu bằng #)
document.querySelectorAll(".nav-menu a, .footer-right a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Kiểm tra nếu href bắt đầu bằng # (liên kết nội bộ)
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement =
        document.getElementById(targetId) || document.querySelector(".hero");
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: "smooth",
      });
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
      }
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    }
    // Nếu không phải liên kết nội bộ, cho phép chuyển trang bình thường
  });
});

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.opacity = 1;
    }, 10);
  });
});

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

function showDetails(modalId) {
  alert(
    "Đây là thông tin chi tiết về cẩm nang. Vui lòng liên hệ để biết thêm!"
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".guide-card, .advice-card").forEach((card) => {
  observer.observe(card);
});

document
  .querySelector('.nav-link[href="camnang.html"]')
  .classList.add("active");
