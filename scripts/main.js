// WORD CONTAINERS
const wordContainers = document.querySelectorAll('.main-word-inner');

// KEYS
const letterKeys = document.querySelectorAll('.main-keyboard-button-letter');
const enterKey = document.querySelector('.main-keyboard-button-enter');
const removeKey = document.querySelector('.main-keyboard-button-remove');

// WORDLE
const wordle = {
    try: {
        tryIndex: 0,
        tryParentIndex: 0,
        tryChildIndex: 0,
        tryArr: [],
    },
};

// HANDLING THE KEYS' FUNCTIONALITIES

for (let i = 0; i < letterKeys.length; i++) {
    letterKeys[i].addEventListener('click', () => {
        if (wordle.try.tryArr.length < 5) {
            wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].textContent = letterKeys[i].value;
            wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].classList.add('main-word-inner-itself-occupied');
            wordle.try.tryArr.push(letterKeys[i].value);
            wordle.try.tryChildIndex++;
        };
    });
};

// HANDLING THE REMOVE FUNCTIONALITY

function handlingTheRemoveFunctionality() {
    if (wordle.try.tryArr.length > 0) {
        wordle.try.tryChildIndex--;
        wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].textContent = '';
        wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].classList.remove('main-word-inner-itself-occupied');
        wordle.try.tryArr.pop();
    };
};

// INITIALIZE BUTTONS
removeKey.addEventListener('click', handlingTheRemoveFunctionality);