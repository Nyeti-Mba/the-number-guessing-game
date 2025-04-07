document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let randomNumber;
    let turnsLeft;
    let gameOver;
    let guessHistory = [];
    
    // DOM elements
    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-button');
    const turnsDisplay = document.getElementById('turns-display');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    const historyArea = document.getElementById('history-area');
    const historyList = document.getElementById('history-list');
    const playAgainContainer = document.getElementById('play-again-container');
    const playAgainButton = document.getElementById('play-again-button');
    
    // Initialize the game
    startNewGame();
    
    // Event listeners
    submitButton.addEventListener('click', handleGuess);
    guessInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleGuess();
      }
    });
    playAgainButton.addEventListener('click', startNewGame);

    // Functions
    function startNewGame() {
        // Generate a random number between 1 and 100
        randomNumber = Math.floor(Math.random() * 100) + 1;
        turnsLeft = 10;
        gameOver = false;
        guessHistory = [];
        
        // Reset UI
        turnsDisplay.textContent = `Turns left: ${turnsLeft}`;
        guessInput.value = '';
        guessInput.disabled = false;
        submitButton.disabled = false;
        messageBox.classList.add('hidden');
        historyArea.classList.add('hidden');
        playAgainContainer.classList.add('hidden');
        historyList.innerHTML = '';
        
        // Focus on input
        guessInput.focus();
    }

    function handleGuess() {
        if (gameOver) return;
        
        // Get and validate the guess
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
          showMessage('Please enter a valid number between 1 and 100.', 'negative');
          return;
        }
        
        // Add to history
        guessHistory.push(guess);
        updateHistory();
        
        // Decrease turns
        turnsLeft--;
        turnsDisplay.textContent = `Turns left: ${turnsLeft}`;
        
        // Check guess
        if (guess === randomNumber) {
          endGame(`Congratulations! You guessed the number ${randomNumber} in ${10 - turnsLeft} turns!`, 'positive');
        } else if (turnsLeft === 0) {
          endGame(`Game over! The number was ${randomNumber}.`, 'negative');
        } else if (guess > randomNumber) {
          showMessage(`Too high! You have ${turnsLeft} turns left.`, 'warning');
        } else {
          showMessage(`Too low! You have ${turnsLeft} turns left.`, 'warning');
        }
        
        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }
      
    function showMessage(text, type) {
        messageText.textContent = text;
        messageBox.className = `ui message ${type}`;
        messageBox.classList.remove('hidden');
    }

    function endGame(text, type) {
        showMessage(text, type);
        gameOver = true;
        guessInput.disabled = true;
        submitButton.disabled = true;
        playAgainContainer.classList.remove('hidden');
    }
      
    function updateHistory() {
        if (guessHistory.length > 0) {
          historyArea.classList.remove('hidden');
          historyList.innerHTML = '';
          
          guessHistory.forEach((guess, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'history-item';
            listItem.textContent = `Guess #${index + 1}: ${guess} ${getGuessHint(guess)}`;
            historyList.appendChild(listItem);
          });
        }
    }
      
    function getGuessHint(guess) {
        if (guess > randomNumber) {
          return '(too high)';
        } else if (guess < randomNumber) {
          return '(too low)';
        } else {
          return '(correct!)';
        }
    }

});