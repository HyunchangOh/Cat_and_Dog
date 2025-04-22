const bubble = document.getElementById("tomBubble");

document.addEventListener('DOMContentLoaded', () => {
    const congratulationMessage = document.getElementById('congratulation-message');
    const tomSpeechBubble = document.getElementById('tom-speech');
    const sortableItems = document.querySelectorAll('.sortable-item');
    const textBox = document.getElementById('text-box');
    const redirectButton = document.getElementById('redirect-button'); // Make sure this element exists in HTML
    const pictureFrame = document.getElementById('picture-frame');
    const tomElement = document.getElementById('tom'); // Element that triggers the start
    let currentIndex = sortableItems.length - 1; // Start from the last item (index 4)

    // Hide redirectButton initially
    redirectButton.style.display = 'none';

    // Function to set all sortable-item class images to 100px height
    function setSortableItemHeight() {
        sortableItems.forEach(item => {
            item.style.height = '200px';
        });
    }

    // Call the function to set the height on DOM content loaded
    setSortableItemHeight();

    // Set the initial message to "Click me!"
    bubble.innerHTML = "Klicke mich!";

    // Add click event listener to the 'tom' element
    tomElement.addEventListener('click', () => {
        bubble.innerHTML = "Ich denke, das is..."; // Change message immediately upon click

        // Start swiping process after 1 second
        setTimeout(() => {
            startAutoSwipe();
        }, 1000); // 1-second delay before starting the swipe
    });

    // Function to initialize automatic swipe behavior
    function startAutoSwipe() {
        if (currentIndex >= 0) {
            setTimeout(() => {
                // Determine the direction and label based on the current index
                let isDog = false;
                if(currentIndex ===1 || currentIndex===3){
                    isDog=true;
                };
                console.log(currentIndex);

                const direction = isDog ? 'up' : 'down';
                handleCorrectSwipe(sortableItems[currentIndex], direction, isDog ? 'ein Hund!' : 'eine Katze!!'); // Automatically swipe
                currentIndex--; // Move to the next item

                if (currentIndex >= 0) {
                    startAutoSwipe(); // Continue to the next swipe after a delay
                } else {
                    // checkWin(); // All pictures have been swiped, now check the win condition
                    bubble.innerHTML = "Wie gut habe ich abgeschnitten?";
                    pictureFrame.innerHTML = "<button id='yay'>Next</button>"
                    const yayButton = document.getElementById('yay');
    
                    if (yayButton) {
                        yayButton.style.padding = '10px 20px';
                        yayButton.style.backgroundColor = '#4CAF50';
                        yayButton.style.color = 'white';
                        yayButton.style.border = 'none';
                        yayButton.style.borderRadius = '5px';
                        yayButton.style.fontSize = '16px';
                        yayButton.style.cursor = 'pointer';
                        yayButton.style.transition = 'background-color 0.3s ease';
                
                        yayButton.onclick = () => {
                            window.location.href = 'index11.html';
                        };
                    }
                }
            }, 2000); // Delay of 2 seconds between each swipe
        }
    }

    // Function to handle correct swipe
    function handleCorrectSwipe(item, direction, label) {
        const translateY = direction === 'up' ? '-200px' : '200px';

        // Display the appropriate label for the picture
        bubble.innerHTML = label; 
        
        setTimeout(() => {
            bubble.innerHTML = ".";
        }, 2000);

        item.style.transition = 'transform 0.5s ease'; // Smooth transition for the swipe
        item.style.transform = `translateY(${translateY})`; // Move off-screen

        setTimeout(() => {
            item.style.display = 'none'; // Hide the item
        }, 500); // Transition duration is 0.5s, then hide the item
    }

    // Function to check win condition (called after all pictures are swiped)
    function checkWin() {
        congratulationMessage.style.display = 'block'; // Show congratulation message
        tomSpeechBubble.textContent = "All Photos have been labelled correctly!";
        textBox.style.display = 'block'; // Show textbox and button
        redirectButton.style.display='block';
        // Always show yayButton at the end
        pictureFrame.innerHTML = "<button id='yay'>Weiter</button>";
        const yayButton = document.getElementById('yay');

        if (yayButton) {
            yayButton.style.padding = '10px 20px';
            yayButton.style.backgroundColor = '#4CAF50';
            yayButton.style.color = 'white';
            yayButton.style.border = 'none';
            yayButton.style.borderRadius = '5px';
            yayButton.style.fontSize = '16px';
            yayButton.style.cursor = 'pointer';
            yayButton.style.transition = 'background-color 0.3s ease';

            yayButton.onclick = () => {
                window.location.href = 'index10.html';
            };
        }
    }

    // Redirect button click event
    redirectButton.addEventListener('click', () => {
        window.location.href = 'index10.html';
    });
});
