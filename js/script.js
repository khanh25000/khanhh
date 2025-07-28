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

// Xử lý click cho các liên kết nội bộ (có #)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Chỉ xử lý khi không phải là liên kết đến trang khác
    if (
      this.getAttribute("href").startsWith("#") &&
      !this.getAttribute("href").includes(".html")
    ) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement =
        document.getElementById(targetId) || document.querySelector(".hero");
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: "smooth",
      });

      // Đóng menu trên mobile
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
      }

      // Cập nhật active state
      const navLinks = document.querySelectorAll(".nav-link");
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    }
  });
});

// Xử lý cho các nút modal
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
  alert("Đây là thông tin chi tiết về ngành. Vui lòng liên hệ để biết thêm!");
}

// Animation cho các card
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

document
  .querySelectorAll(".job-card, .industry-card, .company-card")
  .forEach((card) => {
    observer.observe(card);
  });
