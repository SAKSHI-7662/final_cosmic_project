// Booking Form JavaScript

let currentStep = 1
const totalSteps = 4

// Navigate to next step
function nextStep(step) {
  const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`)
  const inputs = currentFormStep.querySelectorAll("input[required], select[required]")

  // Validate current step
  let isValid = true
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false
      input.classList.add("is-invalid")
    } else {
      input.classList.remove("is-invalid")
    }
  })

  if (!isValid) {
    return
  }

  // Update step indicators
  const stepItem = document.querySelector(`.step-item[data-step="${step}"]`)
  stepItem.classList.add("completed")

  // Move to next step
  currentStep = step + 1
  updateSteps()

  // Update summary if going to confirmation
  if (currentStep === 4) {
    updateSummary()
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Navigate to previous step
function prevStep(step) {
  currentStep = step - 1
  updateSteps()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Update visible steps
function updateSteps() {
  // Update form steps
  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.remove("active")
  })
  document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add("active")

  // Update step indicators
  document.querySelectorAll(".step-item").forEach((item, index) => {
    const stepNumber = index + 1
    if (stepNumber < currentStep) {
      item.classList.add("completed")
      item.classList.remove("active")
    } else if (stepNumber === currentStep) {
      item.classList.add("active")
      item.classList.remove("completed")
    } else {
      item.classList.remove("active", "completed")
    }
  })
}

// Update summary
function updateSummary() {
  // Event Details
  const eventType = document.getElementById("eventType").value
  const eventDate = document.getElementById("eventDate").value
  const guestCount = document.getElementById("guestCount").value
  const eventVenue = document.getElementById("eventVenue").value

  document.getElementById("summaryEventType").textContent =
    eventType.charAt(0).toUpperCase() + eventType.slice(1) || "-"
  document.getElementById("summaryDate").textContent = eventDate ? new Date(eventDate).toLocaleDateString() : "-"
  document.getElementById("summaryGuests").textContent = guestCount || "-"
  document.getElementById("summaryVenue").textContent =
    eventVenue
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "-"

  // Contact Information
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value

  document.getElementById("summaryName").textContent = `${firstName} ${lastName}` || "-"
  document.getElementById("summaryEmail").textContent = email || "-"
  document.getElementById("summaryPhone").textContent = phone || "-"

  // Preferences
  const budget = document.getElementById("budget").value
  const theme = document.getElementById("theme").value

  document.getElementById("summaryBudget").textContent = budget || "-"
  document.getElementById("summaryTheme").textContent = theme || "-"

  // Services
  const services = []
  document.querySelectorAll('.form-check-input[type="checkbox"]:checked').forEach((checkbox) => {
    const label = document.querySelector(`label[for="${checkbox.id}"]`)
    if (label) {
      services.push(label.textContent)
    }
  })
  document.getElementById("summaryServices").textContent = services.join(", ") || "None selected"
}

// Form submission
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const form = e.target
  if (!form.checkValidity()) {
    e.stopPropagation()
    form.classList.add("was-validated")
    return
  }

  // Hide form and show success message
  form.style.display = "none"
  const successMessage = document.getElementById("successMessage")
  successMessage.style.display = "block"

  // Set confirmation email
  const email = document.getElementById("email").value
  document.getElementById("confirmEmail").textContent = email

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
})

// Pre-fill event type from URL if specified
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const eventParam = urlParams.get("event")

  if (eventParam) {
    // Convert URL param to event type
    const eventType = eventParam.includes("wedding")
      ? "wedding"
      : eventParam.includes("birthday")
        ? "birthday"
        : eventParam.includes("engagement") || eventParam.includes("proposal")
          ? "engagement"
          : eventParam.includes("corporate") || eventParam.includes("team")
            ? "corporate"
            : ""

    if (eventType) {
      document.getElementById("eventType").value = eventType
    }
  }

  // Set minimum date to today
  const dateInput = document.getElementById("eventDate")
  const today = new Date().toISOString().split("T")[0]
  dateInput.setAttribute("min", today)
})
