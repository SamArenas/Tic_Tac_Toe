const GameboardController = () => {

    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    let currentPlayerSymbol = "X"

    updateBoard = (position) => {
        if (board[position] === " ") {
            board[position] = getCurrentPlayerSymbol()
            nextPlayerTurn()
            return true
        }
        return false
    }

    nextPlayerTurn = () => {
        if (getCurrentPlayerSymbol() === "X") {
            setCurrentPlayerSymbol("O");
        }
        else {
            setCurrentPlayerSymbol("X");
        }
    }

    checkGameOver = () => {
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
        let message = document.querySelector(".win-message")
        for (let i = 0; i < winningCombinations.length; i++) {
            combo = winningCombinations[i];
            if (board[combo[0]] !== " ") {
                if (board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
                    message.innerHTML = ("<p>" + board[combo[0]] + " IS THE WINNER!</p>")
                    message.classList.add("visible")
                    return true
                }
            }
        }
        if (board.includes(" ")) {
            return false
        }
        message.innerHTML = "<p>DRAW</p>"
        message.classList.add("visible")
        return true
    }

    reset = () => {
        board.fill(" ")
        setCurrentPlayerSymbol("X")
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

    return { updateBoard, getSymbolInCell, checkGameOver, reset }

}

const Gameboard = () => {

    let cells = document.querySelectorAll(".section")

    placeSymbol = (e) => {
        let cell = e.target
        if (gameboardController.updateBoard(cell.id)) {
            cell.innerHTML = "<p>" + gameboardController.getSymbolInCell(cell.id) + "</p>"
            if (gameboardController.checkGameOver()) {
                lockBoard()
            }
        }
    }

    lockBoard = () => {
        cells.forEach((el) => el.removeEventListener('click', placeSymbol))
    }


    document.querySelector("button").addEventListener('click', () => {
        let message = document.querySelector(".win-message")
        message.classList.remove("visible")
        gameboardController.reset()
        cells.forEach((el) => el.innerHTML = " ")
        cells.forEach((el) => el.addEventListener('click', placeSymbol));
    })

    cells.forEach((el) => el.addEventListener('click', placeSymbol));
}

gameboardController = GameboardController()
gameboard = Gameboard()