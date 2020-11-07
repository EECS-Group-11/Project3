function downCollisionCheck() {
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
                clearTimeout(autoID);
                clearTimeout(timeoutID);
                gameOver();
                document.removeEventListener("keydown", downkey);
            }
            //swap pieces
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
            check10Row();
            return true;
        }
    }
    return false;
}

function leftCollisionCheck() {
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
            return true;
        }
    }
    return false;
}

function rightCollisionCheck() {
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
            return true;
        }
    }
    return false;
}