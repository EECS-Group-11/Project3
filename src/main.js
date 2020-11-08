
/**
 * Creates necessary game elements, starts the game
 */
function main() {
    end = false
    board = Array(24).fill(null).map(x => x = Array(10).fill("#ffffff"));
    generateBoard();
    swapped = false;
    currentPiece = getRandomPiece();
    nextPiece = getRandomPiece();
    heldPiece = null;
    score = 0;
    mult = 1;
    updateGraphics();
    timer();
    autoPlay();
}

/**
 * Generates the HTML for the entire display
 */
function generateBoard() {
    //main board
    let board = document.querySelector('#board')
    for (let i = 4; i < 24; i++) {
        //create row
        board.innerHTML += `<div id="row${i - 4}" class="row"></div>`
        let curRow = board.querySelector(`#row${i - 4}`);
        for (let j = 0; j < 10; j++) {
            //populate row with cells
            curRow.innerHTML += `<div id="r${i-4}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
    //next piece display
    let next = document.querySelector('#next')
    for (let i = 0; i < 4; i++) {
        //create row
        next.innerHTML += `<div id="nrow${i}" class="row"></div>`
        let curRow = next.querySelector(`#nrow${i}`);
        for (let j = 0; j < 4; j++) {
            //populate row with cells
            curRow.innerHTML += `<div id="nr${i}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
    //held piece display
    let held = document.querySelector('#held')
    for (let i = 0; i < 4; i++) {
        //create row
        held.innerHTML += `<div id="hrow${i}" class="row"></div>`
        let curRow = held.querySelector(`#hrow${i}`);
        for (let j = 0; j < 4; j++) {
            //populate row with cells
            curRow.innerHTML += `<div id="hr${i}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
}

/**
 * Redraws all 3 boards with updated data
 */
function updateGraphics() {
    //put currentPiece on board
    for (const coord of currentPiece.coords) {
        board[coord[0]][coord[1]] = currentPiece.color;
    }
    //draw board
    for (let i = 4; i < 24; i++) {
        for (let j = 0; j < 10; j++) {
            //gets colors from the board array
            document.querySelector('#r'+ (i-4) + 'c' + j).style.backgroundColor = board[i][j];
        }
    }
    //draw next
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            //clears next display
            document.querySelector('#nr'+ i + 'c' + j).style.backgroundColor = "#ffffff"
            //draws piece in that cell if that piece goes there
            if (nextPiece.coords.some(x => x[0] === i && x[1] - 3 === j)) {
                document.querySelector('#nr'+ i + 'c' + j).style.backgroundColor = nextPiece.color;
            }
        }
    }
    //draw held
    if (heldPiece !== null) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                //clears held display
                document.querySelector('#hr'+ i + 'c' + j).style.backgroundColor = "#ffffff"
                //draws piece in that cell if that piece goes there
                if (heldPiece.coords.some(x => x[0] === i && x[1] - 3 === j)) {
                    document.querySelector('#hr'+ i + 'c' + j).style.backgroundColor = heldPiece.color;
                }
            }
        }
    }
}

//time elapsed counter
time = 0;
//id of timer, used to disable timer at end
timeoutID = null
//id of autoplay, used to diable autoplay at end
autoID = null
//amount of time before piece moves automatically
wait = 1000;

/**
 * Counts seconds, decreases autoplay wait every 10 seconds
 */
function timer() {
    time += 1;
    timeoutID = setTimeout(timer, 1000);
    if (!(time % 10)) wait -= 10;
}

/**
 * Auto moves the current piece down after every wait period
 */
function autoPlay() {
    autoID = setTimeout(autoPlay, wait)
    if (!downCollisionCheck()) {
        currentPiece.moveDown();
        mult = 1;
    }
    if (!end) updateGraphics();
}

/**
 * Replaces next and held displays with end of game graphic
 */
function gameOver() {
    end = true;
    clearTimeout(autoID);
    clearTimeout(timeoutID);
    document.removeEventListener("keydown", downkey);
    let screen = document.querySelector('#extras')
    screen.innerHTML = `<p>Game Over!</p><p>Score: ${score}</p><button onclick='window.location.reload()'>Play again?</button>`
}

/**
 * Calls functions based on player input
 */
function downkey(e) {
    if (e.key !== 'F5' && e.key !== 'F12') e.preventDefault();
    if (e.key === 'ArrowDown') {
        if (!downCollisionCheck()) {
            currentPiece.moveDown();
            mult = 1;
        }
    }
    if (e.key === 'ArrowLeft') {
        if (!leftCollisionCheck()) currentPiece.moveHor(-1);
    }
    if (e.key === 'ArrowRight') {
        if (!rightCollisionCheck()) currentPiece.moveHor(1);
    }
    //swap held piece and currentPiece
    if (e.key === 'z' && swapped === false) {
        //remove current piece from board
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        //if held piece doesnt exist, current piece is next piece
        if (heldPiece === null) {
            heldPiece = currentPiece;
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
        }
        //if held piece does exist, current piece and held piece swap
        else {
            let temp = heldPiece;
            heldPiece = currentPiece;
            currentPiece = temp;
        }
        //reset new held piece to its natural state
        while (heldPiece.rotationIndex !== 0) heldPiece.rotate();
        heldPiece.coords = heldPiece.getOrigCoords();
        swapped = true;
    }
    //rotate
    if (e.key === ' ') {
        if (!rotateCollisionCheck()) currentPiece.rotate();
    }
    //update graphics if game isnt over
    if (!end) updateGraphics();
}
//checks for completed rows
function check10Row(){
    has10 = true;
    for(let i = 4; i < 24; i++){
        has10 = true;
        for(let j = 0; j < 10; j++){
            if (board[i][j] === "#ffffff"){
                has10 = false;
                break;
            }
        }
        if(has10 == true){
            clearRow(i);
            score = score + (100 * (mult + ((1100 - wait) / 100)));
            mult++;
            document.querySelector('#score').innerText = `Score: ${score}`
        }
    }
}
//clears completed rows
function clearRow(row){
    for(let x = 0; x < 10; x++){
        board[row][x] =  "#ffffff";
    }
    shiftDown();
    check10Row()
}
//checks for space below floating pieces
function checkForSpace(){
    for(let i = 4; i < 24; i++){
        for(let j = 0; j < 10; j++){
            if (board[i][j] !== "#ffffff" && (i+1<24)){
                if(board[i+1][j] === "#ffffff"){
                    shiftDown();
                }
            }
        }
    }
}
//shifts floating pieces down
function shiftDown(){
    for(let r = 4; r < 24; r++){
        for(let c = 0; c < 10; c++){
            if (board[r][c] !== "#ffffff" && (r+1<24)){
                if(board[r+1][c] === "#ffffff"){
                    board[r+1][c] = board[r][c];
                    board[r][c] = "#ffffff";
                }
            }
        }
    }
    checkForSpace();
}

//creates deepcopy of a piece
function copyPiece(piece) {
  let copy;
  //create correct type of piece
  if (piece instanceof I) copy = new I()
  else if (piece instanceof O) copy = new O()
  else if (piece instanceof L) copy = new L()
  else if (piece instanceof J) copy = new J()
  else if (piece instanceof T) copy = new T()
  else if (piece instanceof S) copy = new S()
  else copy = new Z()

  //copy object properties
  for (const prop in piece) {
    copy[prop] = clone(piece[prop])
  }
  return copy
}

//creates deepcopy of anything that doesnt have a superclass, and also pieces
function clone(obj) {
    //if nonobject, return itself
    if (typeof(obj) !== 'object' || obj === null) return obj;
    //if array, return array with clones of its contents
    if (Array.isArray(obj)) return obj.map(x => x = clone(x));
    //if piece, clone piece
    if (obj instanceof Piece) return copyPiece(obj);
    let copy;
    //clone object properties
    for (const prop in obj) {
      copy[prop] = clone(obj[prop])
    }
    return copy
}

//event listeners
document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", downkey);