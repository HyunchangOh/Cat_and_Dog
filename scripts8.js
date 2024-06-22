const catImg = document.getElementById('cat');
const dogImg = document.getElementById('dog');
const catDropzone = document.getElementById('cat-dropzone');
const dogDropzone = document.getElementById('dog-dropzone');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('message-text');
const messageButton = document.getElementById('message-button');

let catDropped = false;
let dogDropped = false;

catImg.addEventListener('dragstart', dragStart);
dogImg.addEventListener('dragstart', dragStart);

catDropzone.addEventListener('dragover', dragOver);
dogDropzone.addEventListener('dragover', dragOver);

catDropzone.addEventListener('drop', (event) => drop(event, 'cat'));
dogDropzone.addEventListener('drop', (event) => drop(event, 'dog'));

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event, animal) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);

    if ((animal === 'cat' && data === 'cat') || (animal === 'dog' && data === 'dog')) {
        event.target.appendChild(draggedElement);
        if (animal === 'cat') catDropped = true;
        if (animal === 'dog') dogDropped = true;
    } else {
        showMessage('Hmm.. remember that AI does not even know the word "cat" and "dog" yet.', 'Try Again');
    }

    if (catDropped && dogDropped) {
        showMessage('Congratulations! You got it right!', 'Next');
    }
}

function showMessage(text, buttonText) {
    messageText.innerText = text;
    messageButton.innerText = buttonText;
    messageDiv.classList.remove('hidden');
    messageButton.addEventListener('click', resetGame);
}

function resetGame() {
    catDropped = false;
    dogDropped = false;
    catDropzone.innerHTML = 'Cat';
    dogDropzone.innerHTML = 'Dog';
    document.querySelector('.container').prepend(catImg);
    document.querySelector('.container').appendChild(dogImg);
    messageDiv.classList.add('hidden');
    window.location.href = 'index9.html';
}