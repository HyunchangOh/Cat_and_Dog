document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const nextbutton = document.getElementById("next-button");
    const tom = document.getElementById('tom');
    const collectedDataContainer = document.getElementById('collected-data');
    const message = document.getElementById('congratulation-message');
    const gameContainer = document.getElementById('game-container');
    let draggedItem = null;
    let isDragging = false;
    let touchOffset = { x: 1000, y: 1000 };
    let intervals = new Map();

    // Touch events handlers
    function handleTouchStart(e) {
        const touch = e.touches[0];
        draggedItem = e.target;
        
        if (e.target.classList.contains('draggable')) {
            isDragging = true;
            const rect = draggedItem.getBoundingClientRect();
            touchOffset.x = touch.clientX - rect.left + 100;
            touchOffset.y = touch.clientY - rect.top + 150;

            if (intervals.has(draggedItem)) {
                clearInterval(intervals.get(draggedItem));
            }
        }
    }

    function handleTouchMove(e) {
        if (isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = draggedItem.getBoundingClientRect();
            
            draggedItem.style.position = 'absolute';
            draggedItem.style.left = `${touch.clientX - touchOffset.x}px`;
            draggedItem.style.top = `${touch.clientY - touchOffset.y}px`;
        }
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        const tomRect = tom.getBoundingClientRect();
        const itemRect = draggedItem.getBoundingClientRect();

        if (isColliding(tomRect, itemRect)) {
            handleDrop();
        } else {
            startMovingElement(draggedItem);
        }

        isDragging = false;
        draggedItem = null;
    }

    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    function handleDrop() {
        if (intervals.has(draggedItem)) {
            clearInterval(intervals.get(draggedItem));
            intervals.delete(draggedItem);
        }
        draggedItem.style.position = 'static';
        draggedItem.classList.remove('draggable');
        draggedItem.classList.add('collected-item');
        collectedDataContainer.appendChild(draggedItem);
        checkWin();
    }

    // Mouse events
    draggables.forEach(draggable => {
        let mouseOffset = { x: 0, y: 0 };
        let isMouseDragging = false;

        draggable.addEventListener('mousedown', (e) => {
            if (!e.target.classList.contains('draggable')) return;
            
            isMouseDragging = true;
            draggedItem = e.target;
            const rect = draggedItem.getBoundingClientRect();
            mouseOffset.x = e.clientX - rect.left;
            mouseOffset.y = e.clientY - rect.top;

            if (intervals.has(draggedItem)) {
                clearInterval(intervals.get(draggedItem));
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDragging || !draggedItem) return;

            draggedItem.style.position = 'absolute';
            draggedItem.style.left = `${e.clientX - mouseOffset.x}px`;
            draggedItem.style.top = `${e.clientY - mouseOffset.y}px`;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isMouseDragging || !draggedItem) return;

            const tomRect = tom.getBoundingClientRect();
            const itemRect = draggedItem.getBoundingClientRect();

            if (isColliding(tomRect, itemRect)) {
                handleDrop();
            } else {
                startMovingElement(draggedItem);
            }

            isMouseDragging = false;
            draggedItem = null;
        });

        // Add touch events
        draggable.addEventListener('touchstart', handleTouchStart, { passive: false });
        draggable.addEventListener('touchmove', handleTouchMove, { passive: false });
        draggable.addEventListener('touchend', handleTouchEnd);
    });

    tom.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tom.addEventListener('drop', (e) => {
        handleDrop();
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    function checkWin() {
        if (document.querySelectorAll('.draggable').length === 0) {
            message.textContent = 'Glückwunsch! Du hast es geschafft!';
            nextbutton.style.display="block";
        }
    }

    nextbutton.addEventListener('click',(e)=>{
        window.location.href="label.html";
    });

    function moveRandomly(element) {
        const container = document.getElementById('game-container');
        const maxX = container.clientWidth - element.clientWidth;
        const maxY = container.clientHeight - element.clientHeight;

        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);

        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    }

    function startMovingElement(element) {
        if (intervals.has(element)) {
            clearInterval(intervals.get(element));
        }
        const intervalId = setInterval(() => {
            if (document.body.contains(element) && element.classList.contains('draggable')) {
                moveRandomly(element);
            } else {
                clearInterval(intervalId);
                intervals.delete(element);
            }
        }, 1000);
        intervals.set(element, intervalId);
    }

    function startMoving() {
        draggables.forEach(draggable => {
            startMovingElement(draggable);
        });
    }

    startMoving();
});
