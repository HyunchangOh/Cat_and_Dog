document.addEventListener('DOMContentLoaded', function() {
    // Disable Next button for 2 seconds after page load
    setTimeout(function() {
        document.getElementById('next-button').classList.remove('inactive');
    }, 2000);

    // Handle click event for Next button
    document.getElementById('next-button').addEventListener('click', function() {
        window.location.href = 'index4.html';
    });
});
