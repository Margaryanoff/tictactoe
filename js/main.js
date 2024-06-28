const statusDisplay = document.querySelector(".game_status");

let gameActive = true;
let currentPlayer = "X";
let gameState = Array(9).fill("");
const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => `Game ended. It's a draw`;
const curentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

statusDisplay.textContent = curentPlayerTurn();

document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));
document.querySelector(".game_restart").addEventListener("click", handleRestartGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cell-ind");

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";  // ? xia ete esi chenq grum 2rd angam xaxy chi berum?
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = curentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = curentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        } else if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.textContent = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}


