const GameboardController = () => {
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    let currentPlayerSymbol = "X"

    updateBoard = function (position) {
        if (board[position] === " ") {
            board[position] = getCurrentPlayerSymbol()
            nextPlayerTurn()
            return true
        }
        return false
    }

    nextPlayerTurn = function () {
        if (getCurrentPlayerSymbol() === "X") {
            setCurrentPlayerSymbol("O");
        }
        else {
            setCurrentPlayerSymbol("X");
        }
    }

    checkGameOver = function () {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombinations.length; i++) {
            combo = winningCombinations[i];
            if (board[combo[0]] !== " ") {
                if (board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
                    console.log(board[combo[0]], "is the winner!")
                    return true
                }
            }
        }
        if (board.includes(" ")) {
            return false
        }
        console.log("DRAW")
        return true
    }

    getCurrentPlayerSymbol = () => {
        return currentPlayerSymbol
    }

    setCurrentPlayerSymbol = (symbol) => {
        currentPlayerSymbol = symbol
    }

    getSymbolInCell = (position) => {
        return board[position]
    }

    return { updateBoard, getSymbolInCell, checkGameOver }

}

const Gameboard = () => {

    placeSymbol = (e) => {
        let cell = e.target
        if (gameboardController.updateBoard(cell.id)) {
            cell.innerHTML = gameboardController.getSymbolInCell(cell.id)
            if (gameboardController.checkGameOver()) {
                lockBoard()
            }
        }
        else {
            console.log("Select another square")
        }
    }

    lockBoard = () => {
        document.querySelectorAll(".section").forEach(el => el.removeEventListener('click', placeSymbol))
    }

    document.querySelectorAll(".section").forEach(el => el.addEventListener('click', placeSymbol));

    return null
}

gameboardController = GameboardController()
gameboard = Gameboard()