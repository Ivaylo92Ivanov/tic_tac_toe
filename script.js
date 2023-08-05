const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let positionCounter = 0;
    let board = [];

    const getBoard = () => board;

    function resetBoard() {
        board = clearBoardField();
        for (let i=0;  i <rows; i++) {
         for(let j=0; j<columns; j++) {
            let fieldDiv = document.createElement("div");
            fieldDiv.classList.add("field-box");
            fieldDiv.dataset.position = positionCounter;
            positionCounter++;
            console.log(fieldDiv);
            board.push(fieldDiv);
            }
        }
        positionCounter = 0;
        return board;
    };  

    function clearBoardField(){
        let boardField = document.querySelector(".board");
        boardField.innerHTML = "";
        board = [];
        return board;
    }

    function initiateNewGame(){
        board = resetBoard();
        board.forEach(field => document.querySelector(".board").appendChild(field));
        let playerOne = cratePlayer(document.querySelector("#player1-name").value, "X");
        let playerTwo = cratePlayer(document.querySelector("#player2-name").value, "O");
        let playerOneTurn = true;
        playGame(playerOne, playerTwo, playerOneTurn);
    };

    //in game flow

    function playGame(player1, player2, playerOneTurn) { 
        board.forEach(field => field.addEventListener("click", () => {
            [playerOneTurn, marker] = playRound(playerOneTurn, player1, player2); 
            if (field.innerHTML != "") {
                playerOneTurn = !playerOneTurn;;
            } else {
                field.innerHTML = marker;
            };
            checkWinCondition(board);
        })); 
    }; 
    
    function playRound(playerOneTurn, player1, player2) {
        if (playerOneTurn) {
            playerOneTurn=false;
            marker=player1.marker;
        } else {
            playerOneTurn=true;
            marker=player2.marker;
        };
        return [playerOneTurn, marker]
    };
    
    function checkWinCondition(board) {
        let winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
        for (let condition of winConditions) {
            [a, b, c] = condition
            if (board[a].innerHTML === "" ||
                board[b].innerHTML === "" ||
                board[c].innerHTML ==="" ) {
                    // do nothing
                } else if(board[a].innerHTML === board[b].innerHTML &&
                board[b].innerHTML === board[c].innerHTML) {
                    console.log("we have a winner")// pick up from here
                }
        }

        
        
        //
        // return
    };


    // player creation
    const cratePlayer = (name, marker) => {
        return {
            name: name, 
            marker: marker
        };
    };

    return {getBoard, initiateNewGame};
})();

const startGameButton = document.querySelector(".start-game")
startGameButton.addEventListener("click", () => {
    gameBoard.initiateNewGame();

    // hide the form after clicking the start button
    // show it again on new game
    document.querySelector(".forms-wrapper").style.display = "none";
});




