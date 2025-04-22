const bubble = document.getElementById("tomBubble");

document.addEventListener('DOMContentLoaded', () => {
    const congratulationMessage = document.getElementById('congratulation-message');
    const tomSpeechBubble = document.getElementById('tom-speech');
    const sortableItems = document.querySelectorAll('.sortable-item');
    const textBox = document.getElementById('text-box');
    const redirectButton = document.getElementById('redirect-button');
    const pictureFrame = document.getElementById('picture-frame');
    let currentIndex = sortableItems.length - 1;
    let startY = null;
    let startX = null;
    let isDragging = false;

    // Function to initialize interaction behavior for the current item
    function initInteractionBehavior() {
        // Remove all event listeners from all items
        sortableItems.forEach(item => {
            item.style.pointerEvents = 'none';
            item.removeEventListener('mousedown', handleStart);
            item.removeEventListener('mousemove', handleMove);
            item.removeEventListener('mouseup', handleEnd);
            item.removeEventListener('mouseleave', handleEnd);
            item.removeEventListener('touchstart', handleStart);
            item.removeEventListener('touchmove', handleMove);
            item.removeEventListener('touchend', handleEnd);
        });

        // Enable interaction for the current item
        const currentSortableItem = sortableItems[currentIndex];
        if (currentSortableItem) {
            currentSortableItem.style.pointerEvents = 'auto';
            // Mouse events
            currentSortableItem.addEventListener('mousedown', handleStart);
            currentSortableItem.addEventListener('mousemove', handleMove);
            currentSortableItem.addEventListener('mouseup', handleEnd);
            currentSortableItem.addEventListener('mouseleave', handleEnd);
            // Touch events
            currentSortableItem.addEventListener('touchstart', handleStart);
            currentSortableItem.addEventListener('touchmove', handleMove);
            currentSortableItem.addEventListener('touchend', handleEnd);
        }
    }

    // Initialize interaction behavior for the initial item
    initInteractionBehavior();

    function handleStart(e) {
        if (e.type === 'mousedown' && e.button !== 0) return; // Only handle left mouse button
        
        e.preventDefault();
        isDragging = true;
        
        // Get starting position
        if (e.type === 'touchstart') {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        } else {
            startY = e.clientY;
            startX = e.clientX;
        }
        
        // Reset transform
        this.style.transition = 'none';
        this.style.transform = 'translate(0, 0)';
    }

    function handleMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentSortableItem = sortableItems[currentIndex];
        if (!currentSortableItem) return;

        let currentY, currentX;
        if (e.type === 'touchmove') {
            currentY = e.touches[0].clientY;
            currentX = e.touches[0].clientX;
        } else {
            currentY = e.clientY;
            currentX = e.clientX;
        }

        const diffY = currentY - startY;
        const diffX = currentX - startX;

        // Only allow vertical movement
        currentSortableItem.style.transform = `translate(0, ${diffY}px)`;
    }

    function handleEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const currentSortableItem = sortableItems[currentIndex];
        if (!currentSortableItem) return;

        let endY;
        if (e.type === 'touchend') {
            endY = e.changedTouches[0].clientY;
        } else {
            endY = e.clientY;
        }

        const diffY = endY - startY;
        
        currentSortableItem.style.transition = 'transform 0.3s ease-out';

        if (currentIndex >= 2 && diffY < -50) { // Swipe Up for items 3, 4, 5
            handleCorrectSwipe(currentSortableItem, 'up');
        } else if (currentIndex < 2 && diffY > 50) { // Swipe Down for items 0, 1, 2
            handleCorrectSwipe(currentSortableItem, 'down');
        } else {
            handleWrongSwipe(currentSortableItem);
        }

        startY = null;
        startX = null;
    }

    // Function to handle correct swipe
    function handleCorrectSwipe(item, direction) {
        const translateY = direction === 'up' ? '-200px' : '200px';
        bubble.innerHTML = "Danke für das Label!";
        setTimeout(() => {
            if(currentIndex > -1){
                bubble.innerHTML = "Was ist das für ein Tier?";
            }
        }, 2000);
        
        item.style.transform = `translateY(${translateY})`;

        setTimeout(() => {
            item.style.display = 'none';
            currentIndex--;
            if(currentIndex > -1){
                checkWin();
            } else {
                bubble.innerHTML = "Alle Fotos wurden korrekt beschriftet!";
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
                        window.location.href = 'sort_after.html';
                    };
                }
            }
        }, 300);
    }

    // Function to handle wrong swipe
    function handleWrongSwipe(item) {
        item.style.transform = 'translateX(0)';
    }

    const next = document.getElementById('next');

    // Function to check win condition
    function checkWin() {
        if (currentIndex < 0) {
            congratulationMessage.style.display = 'block';
            tomSpeechBubble.textContent = "All Photos have been labelled correctly!";
            textBox.style.display = 'block';
            pictureFrame.innerHTML = "All Photos have been labeled correctly!";
        } else {
            initInteractionBehavior();
        }
    }

    // Redirect button click event
    redirectButton.addEventListener('click', () => {
        window.location.href = 'evaluate.html';
    });
});
