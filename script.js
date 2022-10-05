const GameboardController = (() => {

    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    let currentPlayerSymbol = "X"
    let player1NameDOM = document.querySelector("#player1-name")
    let player2NameDOM = document.querySelector("#player2-name")
    player1NameDOM.classList.add("current-turn")

    const updateBoard = (position) => {
        if (board[position] === " ") {
            board[position] = getCurrentPlayerSymbol()
            nextPlayerTurn()
            return true
        }
        return false
    }

    const nextPlayerTurn = () => {
        if (getCurrentPlayerSymbol() === "X") {
            setCurrentPlayerSymbol("O");
            player1NameDOM.classList.remove("current-turn")
            player2NameDOM.classList.add("current-turn")
        }
        else {
            setCurrentPlayerSymbol("X");
            player2NameDOM.classList.remove("current-turn")
            player1NameDOM.classList.add("current-turn")
        }
    }

    const checkGameOver = () => {
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
                    let playerWinner = board[combo[0]] === "X" ? player1.getName() : player2.getName()
                    message.innerHTML = ("<p>" + playerWinner + " IS THE WINNER!</p>")
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

    const reset = () => {
        board.fill(" ")
        setCurrentPlayerSymbol("X")
        player1NameDOM.classList.add("current-turn")
        player2NameDOM.classList.remove("current-turn") 
    }

    const getCurrentPlayerSymbol = () => {
        return currentPlayerSymbol
    }

    const setCurrentPlayerSymbol = (symbol) => {
        currentPlayerSymbol = symbol
    }

    const getSymbolInCell = (position) => {
        return board[position]
    }

    return { updateBoard, getSymbolInCell, checkGameOver, reset }

})();

const Gameboard = (() => {

    let cells = document.querySelectorAll(".section")

    placeSymbol = (e) => {
        let cell = e.target
        if (GameboardController.updateBoard(cell.id)) {
            cell.innerHTML = "<p>" + GameboardController.getSymbolInCell(cell.id) + "</p>"
            if (GameboardController.checkGameOver()) {
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
        GameboardController.reset()
        cells.forEach((el) => el.innerHTML = " ")
        cells.forEach((el) => el.addEventListener('click', placeSymbol));
    })

    cells.forEach((el) => el.addEventListener('click', placeSymbol));
})();

const Player = (playerNumber) => {
    let name = document.querySelector("#player" + playerNumber).textContent;

    const getName = () => {
        return name;
    }

    const setName = (newName) => {
        if (newName.length !== 0) {
            name = newName;
        }
    }

    return { getName, setName }
}

let changeName = (e) => {
    let newName = e.target.textContent
    if (e.target.id === "player1-name") {
        player1.setName(newName)
    }
    else {
        player2.setName(newName)
    }
}

document.querySelectorAll(".player").forEach(el => el.addEventListener("keyup", changeName))

let player1 = Player(1)
let player2 = Player(2)