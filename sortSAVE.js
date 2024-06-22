document.addEventListener('DOMContentLoaded', () => {
    const congratulationMessage = document.getElementById('congratulation-message');
    let currentIndex = 4; // Start with the index of the last picture (item5)

    // Find all sortable items (pictures)
    const sortableItems = document.querySelectorAll('.sortable-item');

    // Function to initialize swipe behavior for the current rightmost picture
    function initSwipeBehavior() {
        // Disable draggability for all items initially
        sortableItems.forEach(item => {
            item.draggable = false;
            item.removeEventListener('dragstart', handleDragStart);
            item.removeEventListener('dragover', handleDragOver);
            item.removeEventListener('dragend', handleDragEnd);
        });

        // Enable draggability for the current rightmost picture
        const currentSortableItem = sortableItems[currentIndex];
        if (currentSortableItem) {
            currentSortableItem.draggable = true;
            currentSortableItem.addEventListener('dragstart', handleDragStart);
            currentSortableItem.addEventListener('dragover', handleDragOver);
            currentSortableItem.addEventListener('dragend', handleDragEnd);
        }
    }

    // Initialize swipe behavior for the initial rightmost picture
    initSwipeBehavior();

    let startY = null;

    // Function to handle drag start
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

            if (Math.abs(diffY) > 50) { // If dragged enough vertically
                const currentSortableItem = sortableItems[currentIndex];
                if (currentSortableItem === this) {
                    currentSortableItem.style.transform = `translateY(${diffY > 0 ? 200 : -200}px)`; // Move off-screen
                    setTimeout(() => {
                        currentSortableItem.style.display = 'none'; // Hide the item
                        currentIndex--; // Move to the previous picture
                        checkWin();
                        initSwipeBehavior(); // Initialize swipe behavior for the new rightmost picture
                    }, 300);
                }
            } else {
                this.style.transform = 'translateY(0)'; // Reset position
            }
            startY = null;
        }
    }

    function checkWin() {
        if (currentIndex < 0) {
            congratulationMessage.style.display = 'block'; // Show congratulation message
        }
    }
});
