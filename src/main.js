
function main() {
    //obviously these variables might be moved or declared elsewhere, but these are 
    //some basic elements that will likely be in the game

    board = Array(20).fill(null).map(x => x = Array(10).fill(0));
    currentPiece = getRandomPiece();
    nextPiece = getRandomPiece();
    heldPiece = null;
}

function onCollisionDetected() {
    if (/*left or right wall collision*/true) {
        //prevent left or right movement
    }
    else {
        currentPiece = nextPiece;
        nextPiece = getRandomPiece()
    }
}

function downkey(e) {
    if (e.key !== 'F5' && e.key !== 'F12') e.preventDefault();
    //will need to add collision detection on movement functions
    if (e.key === 'ArrowDown') currentPiece.moveDown();
    if (e.key === 'ArrowLeft') currentPiece.moveHor(-1);
    if (e.key === 'ArrowRight') currentPiece.moveHor(1);
    if (e.key === 'z') {//swap heldPiece and currentPiece
        let temp = heldPiece;
        heldPiece = currentPiece;
        currentPiece = temp;
    }
    if (e.key === ' ') currentPiece.rotate();
    //maybe add a hard drop function too?
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", downkey);