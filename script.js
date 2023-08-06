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
            board.push(fieldDiv);
            }
        };
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
        playGame(playerOneTurn, playerOne, playerTwo);
    };

    //in game flow

    function playGame(playerOneTurn, player1, player2) { 
        board.forEach(field => field.addEventListener("click", () => {
            [playerOneTurn, marker] = playRound(playerOneTurn, player1, player2); 
            if (field.innerHTML != "") {
                playerOneTurn = !playerOneTurn;;
            } else {
                field.innerHTML = marker;
            };
            checkWinCondition(board, player1, player2);
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
    
    function checkWinCondition(board, player1, player2) {
        //also check for draw
        let winnerName;
        let winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        for (let condition of winConditions) {
            [a, b, c] = condition;
            if (board[a].innerHTML === "" ||
                board[b].innerHTML === "" ||
                board[c].innerHTML ==="") {
                    // do nothing
            } else if(
                board[a].innerHTML === board[b].innerHTML &&
                board[b].innerHTML === board[c].innerHTML) {
                console.log("we have a winner")
                if(board[a].innerHTML===player1.marker) {
                    winnerName=player1.name
                } else {
                    winnerName=player2.name
                };
                showWiningPath(a, b, c);
                displayVictory(winnerName);
            };
        };
    };

    function askForNewGame() {
        let winnerDisplay = document.querySelector(".winner-display");
        winnerDisplay.style.display = "block";

        let rematchButton = document.querySelector(".rematch-button");
        rematchButton.addEventListener("click", () => {
            initiateNewGame();
            winnerDisplay.style.display = "none";
        });

        let changePlayersButton = document.querySelector(".change-players");
        changePlayersButton.addEventListener("click", () => {
            initiateNewGame();
            winnerDisplay.style.display = "none";

        });
        // 
    };

    function displayVictory(winnerName){
        let announcement = document.querySelector(".winner-display-h1");
        announcement.innerHTML = `${winnerName} wins this round!`;
        askForNewGame();        
    };

    function showWiningPath (index1, index2, index3){
        let winingPathFields= [
            document.querySelector(`[data-position="${index1}"]`),
            document.querySelector(`[data-position="${index2}"]`),
            document.querySelector(`[data-position="${index3}"]`)
            ];

        for (let field of winingPathFields) {
            field.style.backgroundColor = "#fef08a"
            field.style.transform="scale(1.1)";
            field.style.transition="0.7s";
            field.style.border="0.5rem outset black";
        };  
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




