document.addEventListener('DOMContentLoaded', function() {
    // Activate the next button after 2 seconds
    setTimeout(function() {
        const nextButton = document.getElementById('next-button');
        nextButton.classList.remove('inactive');
    }, 2000);

    // Handle click event for Next button
    document.getElementById('next-button').addEventListener('click', function() {
        window.location.href = 'index9_0.html';
    });
});
