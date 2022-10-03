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

    getCurrentPlayerSymbol = () => {
        return currentPlayerSymbol
    }

    setCurrentPlayerSymbol = (symbol) => {
        currentPlayerSymbol = symbol
    }

    getSymbolInCell = (position) => {
        return board[position]
    }

    return { updateBoard, getSymbolInCell }

}

const Gameboard = () => {
    document.querySelectorAll(".section").forEach(el => el.addEventListener('click', () => {
        let position = parseInt(el.id)

        if (gameboardController.updateBoard(position)) {
            el.innerHTML = gameboardController.getSymbolInCell(position)
        }
        else {
            console.log("Select another square")
        }
    }));

    return null
}
gameboardController = GameboardController()


gameboard = Gameboard()