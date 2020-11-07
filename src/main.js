
function main() {
    //obviously these variables might be moved or declared elsewhere, but these are 
    //some basic elements that will likely be in the game

    board = Array(24).fill(null).map(x => x = Array(10).fill("#ffffff"));
    generateBoard();
    currentPiece = getRandomPiece();
    nextPiece = getRandomPiece();
    heldPiece = null;
    score = 0;
    updateGraphics();
    timer();
    autoPlay();
    end = false
}

function generateBoard() {
    let board = document.querySelector('#board')
    for (let i = 4; i < 24; i++) {
        board.innerHTML += `<div id="row${i - 4}" class="row"></div>`
        let curRow = board.querySelector(`#row${i - 4}`);
        for (let j = 0; j < 10; j++) {
            curRow.innerHTML += `<div id="r${i-4}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
    let next = document.querySelector('#next')
    for (let i = 0; i < 4; i++) {
        next.innerHTML += `<div id="nrow${i}" class="row"></div>`
        let curRow = next.querySelector(`#nrow${i}`);
        for (let j = 0; j < 4; j++) {
            curRow.innerHTML += `<div id="nr${i}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
    let held = document.querySelector('#held')
    for (let i = 0; i < 4; i++) {
        held.innerHTML += `<div id="hrow${i}" class="row"></div>`
        let curRow = held.querySelector(`#hrow${i}`);
        for (let j = 0; j < 4; j++) {
            curRow.innerHTML += `<div id="hr${i}c${j}" class="cell" style="background-color: rgb(255, 255, 255);"></div>`
        }
    }
}

function updateGraphics() {
    //put currentPiece on board
    for (const coord of currentPiece.coords) {
        board[coord[0]][coord[1]] = currentPiece.color;
    }
    //draw board
    for (let i = 4; i < 24; i++) {
        for (let j = 0; j < 10; j++) {
            document.querySelector('#r'+ (i-4) + 'c' + j).style.backgroundColor = board[i][j];
        }
    }
    //draw next
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            document.querySelector('#nr'+ i + 'c' + j).style.backgroundColor = "#ffffff"
            if (nextPiece.coords.some(x => x[0] === i && x[1] - 3 === j)) {
                document.querySelector('#nr'+ i + 'c' + j).style.backgroundColor = nextPiece.color;
            }
        }
    }
    //draw held
    if (heldPiece !== null) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                document.querySelector('#hr'+ i + 'c' + j).style.backgroundColor = "#ffffff"
                if (heldPiece.coords.some(x => x[0] === i && x[1] - 3 === j)) {
                    document.querySelector('#hr'+ i + 'c' + j).style.backgroundColor = heldPiece.color;
                }
            }
        }
    }
}

time = 0;
timeoutID = null
autoID = null
wait = 1000;

function timer() {
    time += 1;
    timeoutID = setTimeout(timer, 1000);
    if (!(time % 10)) wait -= 10;
    updateGraphics()
}

function autoPlay() {
    autoID = setTimeout(autoPlay, wait)
    if (!downCollisionCheck()) currentPiece.moveDown();
}

function gameOver() {
    end = true;
    let screen = document.querySelector('#extras')
    screen.innerHTML = `<p>Game Over!</p><p>Score: ${score}</p><button onclick='window.location.reload()'>Play again?</button>`
}

function downkey(e) {
    if (e.key !== 'F5' && e.key !== 'F12') e.preventDefault();
    if (e.key === 'ArrowDown') {
        if (!downCollisionCheck()) currentPiece.moveDown();
    }
    if (e.key === 'ArrowLeft') {
        if (!leftCollisionCheck()) currentPiece.moveHor(-1);
    }
    if (e.key === 'ArrowRight') {
        if (!rightCollisionCheck()) currentPiece.moveHor(1);
    }
    //swap held piece and currentPiece
    if (e.key === 'z') {
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        if (heldPiece === null) {
            heldPiece = currentPiece;
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
        }
        else {
            let temp = heldPiece;
            heldPiece = currentPiece;
            currentPiece = temp;
        }
        while (heldPiece.rotationIndex !== 0) heldPiece.rotate();
        heldPiece.coords = heldPiece.getOrigCoords();
    }
    //rotate
    if (e.key === ' ') {
        let temp = clone(currentPiece);
        temp.rotate();
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        for (const c of temp.coords) {
            if (c[1] < 0 || c[1] > 9 || c[0] > 19 || board[c[0]][c[1]] !== "#ffffff") {
                for (const c of currentPiece.coords) {
                    board[c[0]][c[1]] = currentPiece.color;
                }
                return;
            }
        }
        currentPiece.rotate();
    }
    //maybe add a hard drop function too?
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
            score = score+100;
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
  if (piece instanceof I) copy = new I()
  else if (piece instanceof O) copy = new O()
  else if (piece instanceof L) copy = new L()
  else if (piece instanceof J) copy = new J()
  else if (piece instanceof T) copy = new T()
  else if (piece instanceof S) copy = new S()
  else copy = new Z()

  for (const prop in piece) {
    copy[prop] = clone(piece[prop])
  }
  return copy
}

//creates deepcopy of anything that doesnt have a superclass, and also pieces
function clone(obj) {
    if (typeof(obj) !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(x => x = clone(x));
    if (obj instanceof Piece) return copyPiece(obj);
    let copy;
    for (const prop in obj) {
      copy[prop] = clone(obj[prop])
    }
    return copy
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", downkey);