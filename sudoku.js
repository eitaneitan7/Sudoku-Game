
// use the URL object provided by the browser to pull the "diff" parameter from the URL
let difficulty = (new URL(window.location.href).searchParams.get("diff"));
// We will use difficulty based on this:
// 1 = 75% Show
// 2 = 50% Show
// 3 = 25% Show

let numSelected = null;
let tileSelected = null;
let errors = 0;

let board = [];

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];


window.onload = function() {
    setGame();
}

// Create a new function 'replaceAt' on String types, Which replaces a character at a specific index
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function randomizeBoard() {

    // Use slice() function to get a new copy of the array without a refernce to the old one
    let boardCopy = solution.slice();

    // Decide based on difficulty how many numbers to hide
    let hideAmount = 3;
    if (difficulty == 1) {
        hideAmount = 3;
    } else if (difficulty == 2) {
        hideAmount = 5;
    } else if (difficulty == 3) {
        hideAmount = 7;
    }

    // Loop through each sudoku line
    // 0 => 8
    for (let i = 0; i <= 8; i++) {

        // On each line iteration get a new unqiue set of numbers (3, 5, or 7) depending on difficulty
        let indexesToHide = uniqueRandomRange(hideAmount, 0, 8)

        // Replace said indexes which would contain a number with a dash
        for (let x = 0; x <= hideAmount - 1; x++) {

            // Replace the randomly chosen numbers with dashes
            boardCopy[i] = String(boardCopy[i]).replaceAt(indexesToHide[x], "-");     
        }

    }

    // Once again we use slice() to copy the 'boardCopy' variable into our working 'board' variable for use
    board = boardCopy.slice();

}
randomizeBoard();

function setGame() {
    // 1 - 9 Numbers
    for ( let i = 1 ; i <= 9 ; i++) {
        // loop to create div, adding div ="1" + adding Class="number"
        let number = document.createElement("div"); // Creating Div for each number var
        number.id = i;  // Div id = i
        number.innerHTML = i; // inner html = i
        number.addEventListener("click", selectNumber); // on click execute selectNumber() function
        number.classList.add("number"); // add class "number" to each div
        document.getElementById("digits").appendChild(number); // add to div digits the div created "number"
    }


    // Board 9x9
    for ( let r = 0 ; r < 9 ; r++) {     /// r = Row
        for ( let c = 0 ;c < 9 ; c++) {  /// c = Column
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();  // each tile has an id of his location , id = r(0) - c(0)
            if(board[r][c] != "-") { // if location does not have "-" , add tile.innertext in board at location [r][c]
                tile.innerText = board[r][c]; // add innerText of what is in board[r][c]
                tile.classList.add("tile-start"); // add class tile start for CSS

            }
            if(r == 2 || r == 5) {
                tile.classList.add("horizontal-line") // Adding CSS grids for sudoku
            }
            if( c == 2 || c == 5) {
                tile.classList.add("vertical-line")  // Adding CSS grids for sudoku
            }
            tile.addEventListener("click" , selectTile) // on click execute selectTile() function
            tile.classList.add("tile");  // add class of tile to all
            document.getElementById("board").append(tile)
        }
    }


}

function selectNumber() {
    if (numSelected != null){ // If numSeleceted is not equal to null , it means a number was already selected and it will remove the class styling
        numSelected.classList.remove("number-selected")
    }
    numSelected = this; // This refers to the Div itself
    numSelected.classList.add("number-selected"); // add background to new number

}

function selectTile() {
    if (numSelected) {
        if (this.innerText != ""){
            return;
        }

        // ID's look like this - "0-0" , "0-1" .. "3-1"
        let coords = this.id.split("-"); // Creates an array of 2 different strings ["1","1"] for example
        let r = parseInt(coords[0]); // parseInt transforms the array of strings to integar
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id; // "this" is referring to the tile itself
        }
        else {
            this.innerText = numSelected.id;
            errors += 1;
            document.getElementById("errors").innerText = errors; // how many errors were done
        }

    }
}

function validateGame() {      
    if(errors == 0 ){
        alert("You have completed the Sudoku!")
        window.location.href ="choice.html"
       }
       else{
        alert("you have failed, you have " + errors + ' errors, please try again')
        window.location.href ="choice.html"
       }
    
}

function uniqueRandomRange(amount, min, max) {
    var arr = [];
    while (arr.length < amount) {
        var r = Math.floor(Math.random() * (max - min + 1)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

