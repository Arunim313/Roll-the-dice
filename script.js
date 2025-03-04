// Game state variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameActive = true;

// DOM elements
const player1Element = document.querySelector('.player-1');
const player2Element = document.querySelector('.player-2');
const player1SavedScore = document.getElementById('player1-saved-score');
const player2SavedScore = document.getElementById('player2-saved-score');
const player1CurrentScore = document.getElementById('player1-current-score');
const player2CurrentScore = document.getElementById('player2-current-score');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const editPlayer1Btn = document.getElementById('edit-player1');
const editPlayer2Btn = document.getElementById('edit-player2');
const diceElement = document.getElementById('dice');
const rollBtn = document.getElementById('roll-btn');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const messageElement = document.getElementById('message');
const winnerModal = document.getElementById('winner-modal');
const winnerMessage = document.getElementById('winner-message');
const playAgainBtn = document.getElementById('play-again-btn');
const diceDots = Array.from(document.querySelectorAll('.dice-dot'));

// Initialize game
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameActive = true;
    
    player1SavedScore.textContent = '0';
    player2SavedScore.textContent = '0';
    player1CurrentScore.textContent = '0';
    player2CurrentScore.textContent = '0';
    
    player1Element.classList.add('active');
    player2Element.classList.remove('active');
    
    messageElement.textContent = '';
    winnerModal.style.display = 'none';
    
    // Hide all dice dots initially
    updateDiceDisplay(1);
    hideDice();
}

// Roll the dice
function rollDice() {
    if (!gameActive) return;
    
    // Generate random dice number
    const dice = Math.floor(Math.random() * 6) + 1;
    
    // Animate dice roll
    diceElement.classList.add('roll-animation');
    hideDice();
    
    setTimeout(() => {
        // Show the dice with correct dots
        updateDiceDisplay(dice);
        diceElement.classList.remove('roll-animation');
        
        // Update current score if dice is not 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`player${activePlayer + 1}-current-score`).textContent = currentScore;
            messageElement.textContent = `Rolled a ${dice}!`;
        } else {
            // If dice is 1, lose current score and switch player
            messageElement.textContent = 'Oops! Rolled a 1 - turn lost!';
            switchPlayer();
        }
    }, 800); // Wait for animation to complete
}

// Save current score
function saveScore() {
    if (!gameActive || currentScore === 0) return;
    
    // Add current score to player's saved score
    scores[activePlayer] += currentScore;
    document.getElementById(`player${activePlayer + 1}-saved-score`).textContent = scores[activePlayer];
    
    // Check if player won
    if (scores[activePlayer] >= 100) {
        gameActive = false;
        const winnerName = document.getElementById(`player${activePlayer + 1}-name`).value;
        winnerMessage.textContent = `${winnerName} Wins!`;
        winnerModal.style.display = 'flex';
        messageElement.textContent = '';
    } else {
        // Switch to other player
        messageElement.textContent = 'Score saved!';
        switchPlayer();
    }
}

// Switch active player
function switchPlayer() {
    // Reset current score
    currentScore = 0;
    document.getElementById(`player${activePlayer + 1}-current-score`).textContent = '0';
    
    // Switch active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    
    // Update UI to show active player
    player1Element.classList.toggle('active');
    player2Element.classList.toggle('active');
    
    // Hide dice when switching players
    hideDice();
}

// Update dice display
function updateDiceDisplay(value) {
    // Hide all dots first
    diceDots.forEach(dot => dot.style.opacity = '0');
    
    // Show specific dots based on dice value
    switch(value) {
        case 1:
            document.getElementById('dot5').style.opacity = '1'; // Center
            break;
        case 2:
            document.getElementById('dot1').style.opacity = '1'; // Top-left
            document.getElementById('dot9').style.opacity = '1'; // Bottom-right
            break;
        case 3:
            document.getElementById('dot1').style.opacity = '1'; // Top-left
            document.getElementById('dot5').style.opacity = '1'; // Center
            document.getElementById('dot9').style.opacity = '1'; // Bottom-right
            break;
        case 4:
            document.getElementById('dot1').style.opacity = '1'; // Top-left
            document.getElementById('dot3').style.opacity = '1'; // Top-right
            document.getElementById('dot7').style.opacity = '1'; // Bottom-left
            document.getElementById('dot9').style.opacity = '1'; // Bottom-right
            break;
        case 5:
            document.getElementById('dot1').style.opacity = '1'; // Top-left
            document.getElementById('dot3').style.opacity = '1'; // Top-right
            document.getElementById('dot5').style.opacity = '1'; // Center
            document.getElementById('dot7').style.opacity = '1'; // Bottom-left
            document.getElementById('dot9').style.opacity = '1'; // Bottom-right
            break;
        case 6:
            document.getElementById('dot1').style.opacity = '1'; // Top-left
            document.getElementById('dot3').style.opacity = '1'; // Top-right
            document.getElementById('dot4').style.opacity = '1'; // Middle-left
            document.getElementById('dot6').style.opacity = '1'; // Middle-right
            document.getElementById('dot7').style.opacity = '1'; // Bottom-left
            document.getElementById('dot9').style.opacity = '1'; // Bottom-right
            break;
    }
}

// Hide dice by setting all dots to opacity 0
function hideDice() {
    diceDots.forEach(dot => dot.style.opacity = '0');
}

// Handle name editing
function handleNameEdit(inputElement) {
    inputElement.focus();
    inputElement.select();
}

// Event listeners
rollBtn.addEventListener('click', rollDice);
saveBtn.addEventListener('click', saveScore);
resetBtn.addEventListener('click', init);
playAgainBtn.addEventListener('click', init);

editPlayer1Btn.addEventListener('click', () => handleNameEdit(player1Name));
editPlayer2Btn.addEventListener('click', () => handleNameEdit(player2Name));

// Prevent form submission when pressing enter in name inputs
player1Name.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
    }
});

player2Name.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
    }
});

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', init);