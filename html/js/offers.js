// Countdown Timer for Featured Offer
function startCountdown() {
    // Set the date we're counting down to (30 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 30);
    
    // Update the countdown every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("mainOfferTimer").innerHTML = "<p class='text-white'>Offer Expired</p>";
        }
    }, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
});
