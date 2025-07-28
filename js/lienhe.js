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

// Xử lý click cho menu và footer links
document.querySelectorAll(".nav-menu a, .footer-right a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Chỉ preventDefault và xử lý smooth scroll cho các liên kết nội bộ (bắt đầu bằng #)
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement =
        document.getElementById(targetId) ||
        document.querySelector(".contact-section");

      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: "smooth",
      });

      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
      }

      // Cập nhật active class cho menu
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      if (this.classList.contains("nav-link")) {
        this.classList.add("active");
      }
    }
    // Các liên kết đến trang khác sẽ hoạt động bình thường
  });
});

// Xử lý active menu item khi scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  // Kiểm tra vị trí scroll để thêm class active cho menu item tương ứng
  document.querySelectorAll(".nav-link").forEach((link) => {
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);

    if (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    }
  });
});

// Xử lý submit form liên hệ
function handleContactSubmit(event) {
  event.preventDefault();
  alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
}

// Intersection Observer cho hiệu ứng xuất hiện
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".contact-box").forEach((box) => {
  observer.observe(box);
});

// Hiệu ứng di chuyển nhãn khi nhập liệu
const inputs = document.querySelectorAll(
  ".form-group input, .form-group textarea"
);
inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    const label = input.nextElementSibling;
    label.style.top = "-10px";
    label.style.left = "1rem";
    label.style.fontSize = "0.9rem";
    label.style.color = "#00ddeb";
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      const label = input.nextElementSibling;
      label.style.top = "50%";
      label.style.left = "1rem";
      label.style.fontSize = "1rem";
      label.style.color = "#888";
    }
  });

  // Xử lý trường hợp có giá trị sẵn khi load trang
  if (input.value) {
    const label = input.nextElementSibling;
    label.style.top = "-10px";
    label.style.left = "1rem";
    label.style.fontSize = "0.9rem";
    label.style.color = "#00ddeb";
  }
});

// Thêm class active cho menu item "Liên Hệ" khi trang được load
document.querySelector('.nav-link[href="#contact"]').classList.add("active");
