// Events Page JavaScript

// Filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const eventItems = document.querySelectorAll(".event-item")

  // Check URL parameters for category filter
  const urlParams = new URLSearchParams(window.location.search)
  const category = urlParams.get("category")

  if (category) {
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === category) {
        btn.click()
      }
    })
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get filter value
      const filterValue = button.getAttribute("data-filter")

      // Filter events
      eventItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 10)
        } else {
          const itemCategory = item.getAttribute("data-category")
          if (itemCategory === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            }, 10)
          } else {
            item.style.opacity = "0"
            item.style.transform = "translateY(20px)"
            setTimeout(() => {
              item.style.display = "none"
            }, 300)
          }
        }
      })
    })
  })

  // Animate cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  eventItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "all 0.6s ease"
    observer.observe(item)
  })
})
