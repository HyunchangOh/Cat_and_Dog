document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const nextbutton = document.getElementById("next-button");
    const tom = document.getElementById('tom');
    const collectedDataContainer = document.getElementById('collected-data');
    const message = document.getElementById('congratulation-message');
    const gameContainer = document.getElementById('game-container');
    let draggedItem = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggedItem = draggable;
            setTimeout(() => {
                draggable.style.display = 'none';
            }, 0);
        });

        draggable.addEventListener('dragend', () => {
            setTimeout(() => {
                if (draggedItem) {
                    draggedItem.style.display = 'block';
                }
                draggedItem = null;
            }, 0);
        });

        draggable.addEventListener('drag', (e) => {
            draggable.style.left = `${e.clientX - 40}px`;
            draggable.style.top = `${e.clientY - 40}px`;
        });
    });

    tom.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    tom.addEventListener('drop', (e) => {
        draggedItem.style.position = 'static';
        draggedItem.classList.remove('draggable');
        draggedItem.classList.add('collected-item');
        collectedDataContainer.appendChild(draggedItem);
        checkWin();
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
        if (e.target !== tom && draggedItem) {
            draggedItem.style.left = `${e.clientX - 40}px`;
            draggedItem.style.top = `${e.clientY - 40}px`;
        }
    });

    function checkWin() {
        if (document.querySelectorAll('.draggable').length === 0) {
            message.textContent = 'Congratulations! You did it!';
            nextbutton.style.display="block";
        }
    }

    nextbutton.addEventListener('click',(e)=>{
        window.location.href="sort.html";
    });

    function moveRandomly(element) {
        const container = document.getElementById('game-container');
        const maxX = container.clientWidth - element.clientWidth;
        const maxY = container.clientHeight - element.clientHeight;

        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
    }

    function startMoving() {
        draggables.forEach(draggable => {
            setInterval(() => {
                if (document.body.contains(draggable)) {
                    moveRandomly(draggable);
                }
            }, 1000);
        });
    }

    startMoving();
});
