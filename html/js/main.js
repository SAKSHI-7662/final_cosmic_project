// ===========================
// DOM Content Loaded
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
    }
  }, 1500)

  // Initialize all features
  initNavbar()
  initScrollTop()
  initCounters()
  initScrollAnimations()
})

// ===========================
// Sticky Navbar
// ===========================
function initNavbar() {
  const navbar = document.getElementById("mainNav")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link")
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })
}

// ===========================
// Scroll to Top Button
// ===========================
function initScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTop")

  if (!scrollTopBtn) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("show")
    } else {
      scrollTopBtn.classList.remove("show")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===========================
// Animated Counters
// ===========================
function initCounters() {
  const counters = document.querySelectorAll(".counter")
  let countersStarted = false

  function startCounters() {
    if (countersStarted) return

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 16) // 60fps
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          counter.textContent = Math.floor(current) + "+"
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target + "+"
        }
      }

      updateCounter()
    })

    countersStarted = true
  }

  // Intersection Observer for counters
  const statsSection = document.querySelector(".stats-section")
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsSection)
  }
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe category cards
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Observe stat cards
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
}

// ===========================
// Scroll Indicator
document.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const categoriesSection = document.querySelector(".categories-section");

      if (categoriesSection) {
        categoriesSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }
});


//////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

  // 🔍 SEARCH FUNCTION
  const searchBox = document.getElementById("searchBox");

  if (!searchBox) return;

  const searchSelectors = [
    ".category-card:not(nav .category-card)",
    ".event-item",
    ".galaxy-card",
    ".universe-article-card",
    ".value-card",
    ".team-card"
  ];

  const getSearchItems = () => {
    const items = [];
    searchSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(item => {
        if (!item.closest("nav") && !item.closest("footer")) {
          items.push(item);
        }
      });
    });
    return items;
  };

  const getFallbackItems = () => {
    return Array.from(document.body.children).filter(el => {
      return !["NAV", "FOOTER", "SCRIPT", "STYLE"].includes(el.tagName) && el.id !== "loading-screen";
    });
  };

  const noResults = document.createElement("div");
  noResults.id = "search-no-results";
  noResults.textContent = "No results found.";
  noResults.style.display = "none";
  noResults.style.padding = "1rem";
  noResults.style.color = "#ffffff";
  noResults.style.textAlign = "center";
  noResults.style.marginTop = "1rem";
  document.body.insertBefore(noResults, document.body.firstChild);

  searchBox.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    const items = getSearchItems();
    const targets = items.length ? items : getFallbackItems();
    let firstVisible = null;

    targets.forEach(item => {
      const text = item.innerText.toLowerCase();
      const match = value === "" || text.includes(value);
      item.style.display = match ? "" : "none";

      if (match && !firstVisible) {
        firstVisible = item;
      }
    });

    noResults.style.display = targets.length && !firstVisible && value !== "" ? "block" : "none";

    if (firstVisible) {
      firstVisible.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

});