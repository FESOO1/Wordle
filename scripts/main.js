// ERROR MESSAGES
const errorMessages = document.querySelector('.error-messages');

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
    randomWord: 'hello',
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

// CHECKING THE GUESS

function checkingTheGuess() {
    const errors = [];

    // CHECKING IF THE ARRAY'S LENGTH IS 5
    if (wordle.try.tryArr.length < 5) {
        errors.push('Array is not completely filled.');
        wordContainers[wordle.try.tryParentIndex].classList.add('main-word-inner-error');
        setTimeout(() => wordContainers[wordle.try.tryParentIndex].classList.remove('main-word-inner-error'), 300);
        errorMessage('Not enough letters');
    };


    if (errors.length === 0) {
        // CHECKING IF THE GUESS WAS CORRECT
        const enteredGuess = wordle.try.tryArr.join(',').replaceAll(',', '');

        if (enteredGuess === wordle.randomWord) {
            for (const word of wordContainers[wordle.try.tryParentIndex].children) {
                word.classList.add('');
            };
        };
    };
};

// ERROR MESSAGE

function errorMessage(errorMessageText) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = errorMessageText;

    errorMessages.appendChild(errorMessage);
    setTimeout(() => errorMessages.removeChild(errorMessage), 1500);
};

// INITIALIZE BUTTONS
enterKey.addEventListener('click', checkingTheGuess);
removeKey.addEventListener('click', handlingTheRemoveFunctionality);