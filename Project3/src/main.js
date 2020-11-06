
function main() {
    //obviously these variables might be moved or declared elsewhere, but these are 
    //some basic elements that will likely be in the game

    board = Array(24).fill(null).map(x => x = Array(10).fill("#ffffff"));
    currentPiece =  getRandomPiece();
    nextPiece = getRandomPiece();
    heldPiece = null;
    score = 0;
}

//obviously will need to be refactored some, just some demo code
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
}

function downkey(e) {
    if (e.key !== 'F5' && e.key !== 'F12') e.preventDefault();
    //will need to add collision detection on movement functions
    if (e.key === 'ArrowDown') {
        let temp = currentPiece.coords.map(x => [x[0] + 1, x[1]]);
        //remove from board so it doesnt attempt to collide with itself
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        for (const c of temp) {
            //avoid drawing things that are above screen
            if (c[0] < 0) continue;
            //if collision
            if (c[0] > 23 || board[c[0]][c[1]] !== "#ffffff") {
                //redraw on board
                for (const c of currentPiece.coords) {
                    board[c[0]][c[1]] = currentPiece.color;
                }
                if (currentPiece.coords.some(x => x[0] < 4)) {
                    alert("Game Over!");
                    document.removeEventListener("keydown", downkey);
                }
                //swap pieces
                currentPiece = nextPiece;
                nextPiece = getRandomPiece();
                check10Row();
                return;
            }
        } 
        currentPiece.moveDown();
    }
    if (e.key === 'ArrowLeft') {
        let temp = currentPiece.coords.map(x => [x[0], x[1] - 1]);
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        for (const c of temp) {
            if (c[0] < 0) continue;
            if (c[1] < 0 || board[c[0]][c[1]] !== "#ffffff") {
                for (const c of currentPiece.coords) {
                    board[c[0]][c[1]] = currentPiece.color;
                }
                return;
            }
        }
        currentPiece.moveHor(-1);
    }
    if (e.key === 'ArrowRight') {
        let temp = currentPiece.coords.map(x => [x[0], x[1] + 1]);
        for (const c of currentPiece.coords) {
            board[c[0]][c[1]] = "#ffffff";
        }
        for (const c of temp) {
            if (c[0] < 0) continue;
            if (c[1] > 9 || board[c[0]][c[1]] !== "#ffffff") {
                for (const c of currentPiece.coords) {
                    board[c[0]][c[1]] = currentPiece.color;
                }
                return;
            }
        }
        currentPiece.moveHor(1);
    }
    //swap held piece and currentPiece
    if (e.key === 'z') {//swap heldPiece and currentPiece
        let temp = heldPiece;
        heldPiece = currentPiece;
        currentPiece = temp;
    }
    if (e.key === ' ') currentPiece.rotate();
    //maybe add a hard drop function too?
    updateGraphics();
}

function check10Row(){
    has10 = true;
    for(i = 4; i < 24; i++){
        has10 = true;
        for(j = 0; j < 10; j++){
            if (board[i][j] === "#ffffff"){
                has10 = false;
                break;
            }
        }
        if(has10 == true){
            clearRow(i);
            score = score+100;
        }
    }
    
}

function clearRow(row){
    for(x = 0; x < 10; x++){
        board[row][x] =  "#ffffff";
    }
    shiftDown();
    check10Row()
}

function checkForSpace(){
    for(i = 4; i < 24; i++){
        for(j = 0; j < 10; j++){
            if (board[i][j] !== "#ffffff" && (i+1<24)){
                if(board[i+1][j] === "#ffffff"){
                    shiftDown();

                }
            }
        }
    }
}

function shiftDown(){
    for(r = 4; r < 24; r++){
        for(c = 0; c < 10; c++){
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


document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", downkey);