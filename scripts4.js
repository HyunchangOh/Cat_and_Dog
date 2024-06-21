const dogCharacteristicDropzone = document.getElementById('dog-characteristic');
const catCharacteristicDropzone = document.getElementById('cat-characteristic');
const balloons = document.querySelectorAll('.text-balloon');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('message-text');
const messageButton = document.getElementById('message-button');

const initialPositions = {}; // Object to store initial positions of balloons

// Add event listeners to make balloons draggable
balloons.forEach(balloon => {
    balloon.addEventListener('dragstart', dragStart);
    balloon.addEventListener('dragend', dragEnd);
    initialPositions[balloon.id] = { x: 0, y: 0 };
});

dogCharacteristicDropzone.addEventListener('dragover', dragOver);
catCharacteristicDropzone.addEventListener('dragover', dragOver);

dogCharacteristicDropzone.addEventListener('drop', drop);
catCharacteristicDropzone.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.style.opacity = '0.4'; // Reduce opacity of dragged item
}

function dragEnd(event) {
    event.target.style.opacity = ''; // Reset opacity after drag ends
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);

    // Determine correct drop zone based on event target
    if (event.target === dogCharacteristicDropzone && (data === 'balloon1' || data === 'balloon2')) {
        event.target.appendChild(draggedElement);
        checkAllCorrect();
    } else if (event.target === catCharacteristicDropzone && (data === 'balloon3' || data === 'balloon4')) {
        event.target.appendChild(draggedElement);
        checkAllCorrect();
    } else {
        // If dropped in wrong area, shake and return to initial position
        draggedElement.classList.add('shake');
        messageText.innerText = "That characteristic may fit better to the other animal.";
        // messageDiv.classList.remove('hidden');
        setTimeout(()=>{
            messageText.innerText="";
        },1200);
        setTimeout(() => {
            draggedElement.classList.remove('shake');
            draggedElement.style.transition = 'transform 0.2s';
            draggedElement.style.transform = `translate(${initialPositions[data].x}px, ${initialPositions[data].y}px)`;
            setTimeout(() => {
                draggedElement.style.transition = '';
            }, 200);
        }, 400);
    }
}

function checkAllCorrect() {
    if (dogCharacteristicDropzone.children.length === 2 && catCharacteristicDropzone.children.length === 2) {
        showMessage('You got it!', 'Next');
    }
}

function showMessage(text, buttonText) {
    messageText.innerText = text;
    messageButton.innerText = buttonText;
    messageButton.classList.remove('hidden');
    messageButton.addEventListener('click', redirectToNext);
}

function redirectToNext() {
    // For demonstration, redirect to index3.html after Next button click
    window.location.href = 'index5.html';
}
