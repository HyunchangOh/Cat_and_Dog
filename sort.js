const bubble = document.getElementById("tomBubble");

document.addEventListener('DOMContentLoaded', () => {
    const congratulationMessage = document.getElementById('congratulation-message');
    const tomSpeechBubble = document.getElementById('tom-speech');
    const sortableItems = document.querySelectorAll('.sortable-item');
    const textBox = document.getElementById('text-box');
    const redirectButton = document.getElementById('redirect-button');
    const pictureFrame = document.getElementById('picture-frame');
    let currentIndex = sortableItems.length - 1; // Start from the last item (index 4)

    // Function to initialize swipe behavior for the current item
    function initSwipeBehavior() {
        // Disable draggability for all items initially
        sortableItems.forEach(item => {
            item.draggable = false;
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragover', handleDragOver);
            item.removeEventListener('dragend', handleDragEnd);
        });

        // Enable draggability for the current item based on currentIndex
        const currentSortableItem = sortableItems[currentIndex];
        if (currentSortableItem) {
            currentSortableItem.draggable = true;
            currentSortableItem.addEventListener('dragstart', handleDragStart);
            currentSortableItem.addEventListener('dragover', handleDragOver);
            currentSortableItem.addEventListener('dragend', handleDragEnd);
        }
    }

    // Initialize swipe behavior for the initial item
    initSwipeBehavior();

    // Function to handle drag start
    let startY = null;
    function handleDragStart(e) {
        startY = e.clientY;
        e.dataTransfer.setDragImage(this, 0, 0); // Hide default drag image
    }

    // Function to handle drag over
    function handleDragOver(e) {
        e.preventDefault(); // Allow drop
    }

    // Function to handle drag end
    function handleDragEnd(e) {
        if (startY !== null) {
            let currentY = e.clientY;
            let diffY = currentY - startY;

            const currentSortableItem = sortableItems[currentIndex];

            if (currentIndex >= 2 && diffY < -50) { // Swipe Up for items 3, 4, 5
                handleCorrectSwipe(currentSortableItem, 'up');
            } else if (currentIndex < 2 && diffY > 50) { // Swipe Down for items 0, 1, 2
                handleCorrectSwipe(currentSortableItem, 'down');
            } else {
                handleWrongSwipe(currentSortableItem);
            }

            startY = null;
        }
    }

    // Function to handle correct swipe
    function handleCorrectSwipe(item, direction) {
        const translateY = direction === 'up' ? '-200px' : '200px';
        bubble.innerHTML = "Thank you for the label!";
        setTimeout(() => {
            if(currentIndex>-1){
                bubble.innerHTML = "What is this animal?";
            }
        }, 2000);
        item.style.transform = `translateY(${translateY})`; // Move off-screen

        setTimeout(() => {
            item.style.display = 'none'; // Hide the item
            currentIndex--; // Move to the next picture
            if(currentIndex>-1){
                checkWin();
            }
            else{
                bubble.innerHTML = "All Photos have been labelled correctly!";
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
                        window.location.href = 'index10.html';
                    };
                }

            }
        }, 300);

    }

    // Function to handle wrong swipe
    function handleWrongSwipe(item) {
        item.style.transform = 'translateX(-10px)'; // Shake effect
        setTimeout(() => {
            item.style.transform = 'translateX(0)'; // Reset position
        }, 500);
    }

    const next = document.getElementById('next');

    // Function to check win condition
    function checkWin() {
        if (currentIndex < 0) {
            congratulationMessage.style.display = 'block'; // Show congratulation message
            tomSpeechBubble.textContent = "All Photos have been labelled correctly!";
            textBox.style.display = 'block'; // Show textbox and button
            pictureFrame.innerHTML="All Photos have been labeled correctly!";
        } else {
            initSwipeBehavior(); // Initialize swipe behavior for the new item
        }
    }

    // Redirect button click event
    redirectButton.addEventListener('click', () => {
        window.location.href = 'index10.html';
    });
});
