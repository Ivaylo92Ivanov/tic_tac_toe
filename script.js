const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let positionCounter = 0;
    let board = [];
    let newGame = true;

// Build the functions that allow players to add
// marks to a specific spot on the board, and then 
// tie it to the DOM, letting players click on the 
// gameboard to place their marker. Don’t forget 
// the logic that keeps players from playing in spots 
// that are already taken!


// to break up in Modules and factory functions
// game board should be concerning only the board
// player creation only the players 
// game flow - separate module

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

    function displayBoard(){
        if (!newGame) {
            
            //to add playGame function 
            //and display board properly
            console.log("not new game!");
        } else {
        newGame = false;
        board = resetBoard();
        board.forEach(field => document.querySelector(".board").appendChild(field));
        
        // call a function to resume from here
        let winner = playGame();
        
        };
    };

    //in game flow

    function playGame() { // tuka da podam obekta koito se wryshta ot gameBoard()
        let playerOne = cratePlayer(document.querySelector("#player1-name").value, "X");
        let playerTwo = cratePlayer(document.querySelector("#player2-name").value, "O");
        let winner = 0; // for testing
        let playerOneTurn = true;
        board.forEach(field => field.addEventListener("click", () => {
            [playerOneTurn, marker] = getPlayerChoice(playerOneTurn); 
            if (field.innerHTML != "") {
                playerOneTurn = !playerOneTurn;;
            } else {
                field.innerHTML = marker;
            };
        }));
        
        return winner // for testing
    } 
    
    function getPlayerChoice(playerOneTurn) {
        if (playerOneTurn) {
            playerOneTurn=false;
            marker="X";
        } else {
            playerOneTurn=true;
            marker="O";
        }
        return [playerOneTurn, marker]
    };
    
    function checkWinCondition() {
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

    return {board:board, displayBoard};
})();






const startGameButton = document.querySelector(".start-game")
startGameButton.addEventListener("click", () => {
    gameBoard.displayBoard();

    // hide the form after clicking the start button
    // show it again on new game
    document.querySelector(".forms-wrapper").style.display = "none";
});




