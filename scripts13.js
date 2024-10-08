document.addEventListener("DOMContentLoaded", function() {
    const choices = document.querySelectorAll('.choice');
    const checkButton = document.getElementById('check-button');
    const message = document.getElementById('message');

    checkButton.addEventListener('click', function() {
        let correctAnswer = 'C'; // Change this to the correct answer (A, B, C, or D)
        let selectedAnswer = null;

        // Find the selected answer
        choices.forEach(choice => {
            const radio = choice.querySelector('input[type="radio"]');
            if (radio.checked) {
                selectedAnswer = radio.value;
            }
        });

        // Check if an answer is selected
        if (!selectedAnswer) {
            showMessage("Bitte wähle eine Antwort aus.", "red");
            return;
        }

        // Check if the selected answer is correct
        if (selectedAnswer === correctAnswer) {
            showMessage("Herzlichen Glückwunsch! Weiter geht's mit dem Nächsten in 2 Sekunden...", "green");
            setTimeout(function() {
                window.location.href = "final.html"; // Redirect after 2 seconds
            }, 2000);
        } else {
            showMessage("Wenn dein Machine-Learning-Modell in der Praxis eingesetzt werden soll, welche Art von Daten würde es sehen?", "red");
            // Deactivate the selected wrong answer
            choices.forEach(choice => {
                const radio = choice.querySelector('input[type="radio"]');
                if (radio.checked) {
                    choice.classList.add('deactivated');
                }
            });

            // Disable the check button temporarily
            checkButton.disabled = true;
            setTimeout(function() {
                checkButton.disabled = false;
            }, 200);
        }
    });

    function showMessage(text, color) {
        message.textContent = text;
        message.style.color = color;
        message.classList.remove('hidden');
    }
});
