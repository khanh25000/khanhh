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

// Reset favorites on page load
localStorage.removeItem("favorites");
let favorites = [];

// Toggle menu on mobile
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
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: "smooth",
        });
      }

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

// Show modals
document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const modalId = button.getAttribute("data-modal");
    const modalContainer = document.getElementById(
      `modal-container-${modalId}`
    );
    modalContainer.classList.add("active");
  });
});

function closeModals(modalId) {
  const modalContainer = document.getElementById(`modal-container-${modalId}`);
  modalContainer.classList.remove("active");
}

// Close modals on outside click or Escape
document.querySelectorAll(".modal-container").forEach((container) => {
  container.addEventListener("click", (e) => {
    if (e.target === container) container.classList.remove("active");
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-container").forEach((container) => {
      container.classList.remove("active");
    });
  }
});

// Favorites
const favoritesList = document.getElementById("favorites-list");

function updateFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("industry-card", "visible");
    card.innerHTML = `
      <i class="fas fa-heart industry-icon"></i>
      <h3>${item.title}</h3>
      <div class="industry-info">${item.info}</div>
      <a href="#" class="contact-link">Liên Hệ</a>
      <button class="remove-favorite-btn" data-index="${index}" title="Xoá">X</button>
    `;
    favoritesList.appendChild(card);
  });
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Handle favorite icon on cards
document.querySelectorAll(".industry-card .favorite-icon").forEach((icon) => {
  const card = icon.closest(".industry-card");
  const title = card.querySelector("h3").textContent;
  const info = card.querySelector(".industry-info").innerHTML;
  const industryId = icon.getAttribute("data-industry");

  if (favorites.some((fav) => fav.id === industryId)) {
    icon.classList.add("active");
  }

  icon.addEventListener("click", () => {
    const index = favorites.findIndex((fav) => fav.id === industryId);
    if (index === -1) {
      favorites.push({ id: industryId, title, info });
      icon.classList.add("active");
    } else {
      favorites.splice(index, 1);
      icon.classList.remove("active");
    }
    updateFavorites();
  });
});

// Handle favorite icon in modals
document.querySelectorAll(".modal .favorite-icon").forEach((icon) => {
  const industryId = icon.getAttribute("data-industry");
  const modal = icon.closest(".modal");
  const title = modal.querySelector("h2").textContent;
  const description = modal.querySelector(".modal-details").innerHTML;

  if (favorites.some((fav) => fav.id === industryId)) {
    icon.classList.add("active");
  }

  icon.addEventListener("click", () => {
    const index = favorites.findIndex((fav) => fav.id === industryId);
    if (index === -1) {
      favorites.push({ id: industryId, title, info: description });
      icon.classList.add("active");
    } else {
      favorites.splice(index, 1);
      icon.classList.remove("active");
    }
    updateFavorites();
  });
});

// Remove individual favorite
favoritesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-favorite-btn")) {
    const index = e.target.getAttribute("data-index");
    favorites.splice(index, 1);
    document.querySelectorAll(".favorite-icon").forEach((icon) => {
      const industryId = icon.getAttribute("data-industry");
      if (favorites.every((fav) => fav.id !== industryId)) {
        icon.classList.remove("active");
      }
    });
    updateFavorites();
  }
});

// Clear all favorites
function clearFavorites() {
  favorites.length = 0;
  document
    .querySelectorAll(".favorite-icon")
    .forEach((icon) => icon.classList.remove("active"));
  updateFavorites();
}

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".industry-card").forEach((card) => {
  observer.observe(card);
});

// Search functionality
const searchInput = document.getElementById("searchInput");
const resetBtn = document.querySelector(".reset-btn");

// Scroll to first matching industry on input
searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  let firstMatch = null;

  document.querySelectorAll(".industry-card").forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const startsWithQuery = query.length > 0 && title.startsWith(query);
    card.style.display = startsWithQuery ? "block" : "none";
    if (startsWithQuery && !firstMatch) {
      firstMatch = card;
    }
  });

  if (firstMatch) {
    window.scrollTo({
      top: firstMatch.offsetTop - 100,
      behavior: "smooth",
    });
  }
});

// Reset search
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  document.querySelectorAll(".industry-card").forEach((card) => {
    card.style.display = "block";
  });
});

// Initialize
document.querySelectorAll(".industry-card").forEach((card) => {
  card.style.display = "block";
});
updateFavorites();

// Thêm class active cho menu item "Ngành Nghề" khi trang được load
document.querySelector('.nav-link[href="#industries"]').classList.add("active");
