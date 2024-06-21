document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.getElementById('next-button');
    const quizForm = document.getElementById('quiz-form');
    const feedback = document.getElementById('feedback');

    // Activate the next button after 2 seconds
    setTimeout(function() {
        nextButton.classList.remove('inactive');
    }, 2000);

    // Enable the Next button when a radio button is selected
    quizForm.addEventListener('change', function() {
        nextButton.classList.remove('inactive');
    });

    // Handle click event for Next button
    nextButton.addEventListener('click', function() {
        if (!nextButton.classList.contains('inactive')) {
            const selectedAnswer = quizForm.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                if (selectedAnswer.value === 'B') {
                    window.location.href = 'index7.html';
                } else {
                    feedback.textContent = "Are you sure...?";
                }
            } else {
                feedback.textContent = "Please select an answer.";
            }
        }
    });
});
