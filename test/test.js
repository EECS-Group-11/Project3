
end = false;

/**
 * Calls all the tests
 */
function test() {
    reset()
    console.log("getRandomPiece returns instance of Piece: ", test1())
    console.log("All origCoords functions work: ", test2())
    console.log("moveDown works for all piece types: ", test3())
    console.log("moveHor(1) works for all piece types: ", test4())
    console.log("moveHor(-1) works for all piece types: ", test5())
    console.log("rotate() works for all piece types in all orientations: ", test6())
    console.log("Display updates when piece moves down: ", test7());
    console.log("Display updates when piece moves right: ", test8());
    console.log("Display updates when piece moves left: ", test9());
    console.log("Display updates when piece rotates: ", test10());
    console.log("Nextpiece becomes currentpiece after bottom collision (wall): ", test11())
    console.log("Piece doesn't move after left collision (wall): ", test12())
    console.log("Piece doesn't move after right collision (wall): ", test13())
    console.log("Piece doesn't rotate if collision would occur (wall): ", test14())
    console.log("Nextpiece becomes currentpiece after bottom collision (piece): ", test15())
    console.log("Piece doesn't move after left collision (piece): ", test16())
    console.log("Piece doesn't move after right collision (piece): ", test17())
    console.log("Piece doesn't rotate if collision would occur (piece): ", test18())
    console.log("Held piece swap functions properly when heldPiece is null: ", test19())
    console.log("Held piece swap functions properly when heldPiece is not null: ", test20())
    console.log("Held piece swap prevented after using it once: ", test21())
    console.log("Held piece swap allowed again after bottom collision: ", test22())
    console.log("check10Row does nothing when no rows are complete: ", test23())
    console.log("check10Row removes 1 line when 1 line is complete: ", test24())
    console.log("check10Row does not remove noncomplete rows: ",test25())
    console.log("check10Row removes all complete rows: ",test26())
}

/**
 * Tests if getRandomPiece returns a piece object
 * since function functions with rng, may need to run multiple times
 * @returns true if it succeeds, false if it fails
 */
function test1() {
    return getRandomPiece() instanceof Piece
}

/**
 * Tests if all orig coords functions return correct coordinates
 * @returns true if it succeeds, false if it fails
 */
function test2() {
    let pieces = [I,O,L,J,T,S,Z]
    for (const Shape of pieces) {
        let piece = new Shape();
        if (!piece.coords.equals(piece.getOrigCoords())) {
            return false
        }
    }
    return true
}

/**
 * Tests that moveDown works for all pieces
 * @returns true if it succeeds, false if it fails
 */
function test3() {
    let pieces = [I,O,L,J,T,S,Z]
    for (const Shape of pieces) {
        let piece = new Shape();
        let orig = piece.getOrigCoords()
        piece.moveDown();
        orig.forEach(x => x[0] += 1)
        if (!piece.coords.equals(orig)) return false;
    }
    return true;
}

/**
 * Tests that moveHor(1) works for all pieces
 * @returns true if it succeeds, false if it fails
 */
function test4() {
    let pieces = [I,O,L,J,T,S,Z]
    for (const Shape of pieces) {
        let piece = new Shape();
        let orig = piece.getOrigCoords()
        piece.moveHor(1);
        orig.forEach(x => x[1] += 1)
        if (!piece.coords.equals(orig)) return false;
    }
    return true;
}

/**
 * Tests that moveHor(-1) works for all pieces
 * @returns true if it succeeds, false if it fails
 */
function test5() {
    let pieces = [I,O,L,J,T,S,Z]
    for (const Shape of pieces) {
        let piece = new Shape();
        let orig = piece.getOrigCoords()
        piece.moveHor(-1);
        orig.forEach(x => x[1] -= 1)
        if (!piece.coords.equals(orig)) return false;
    }
    return true;
}

/**
 * Tests that rotate() works for all pieces in all orientations
 * @returns true if it succeeds, false if it fails
 */
function test6() {
    let pieces = [I,O,L,J,T,S,Z]
    for (const Shape of pieces) {
        let piece = new Shape();
        let tester = copyPiece(piece);
        for (let testRIndex = 0; testRIndex < 4; testRIndex++) {
            piece.rotate()
            for (let i = 0; i < tester.coords.length; i++) {
                tester.coords[i][0] += tester.rotationIncrements[testRIndex][i][0];
                tester.coords[i][1] += tester.rotationIncrements[testRIndex][i][1];
            }
            if (!piece.coords.equals(tester.coords)) return false;
        }
    }
    return true;
}

/**
 * Tests that display updates when piece moves down
 * @returns true if it succeeds, false if it fails
 */
function test7() {
    currentPiece = new I();
    currentPiece.moveDown()
    updateGraphics();
    return !currentPiece.coords.some(x => board[x[0]][x[1]] !== currentPiece.color);
}

/**
 * Tests that display updates when piece moves right
 * @returns true if it succeeds, false if it fails
 */
function test8() {
    currentPiece = new I();
    currentPiece.moveHor(1)
    updateGraphics();
    return !currentPiece.coords.some(x => board[x[0]][x[1]] !== currentPiece.color);
}

/**
 * Tests that display updates when piece moves left
 * @returns true if it succeeds, false if it fails
 */
function test9() {
    currentPiece = new I();
    currentPiece.moveHor(-1)
    updateGraphics();
    return !currentPiece.coords.some(x => board[x[0]][x[1]] !== currentPiece.color);
}

/**
 * Tests if display updates when piece rotates
 * @returns true if it succeeds, false if it fails
 */
function test10() {
    currentPiece = new I();
    currentPiece.rotate()
    updateGraphics();
    return !currentPiece.coords.some(x => board[x[0]][x[1]] !== currentPiece.color);
}

/**
 * Tests if currentpiece becomes next piece after bottom collision (wall)
 * @returns true if it succeeds, false if it fails
 */
function test11() {
    reset();
    currentPiece = new I();
    temp = copyPiece(nextPiece);
    while (!downCollisionCheck()) {
        currentPiece.moveDown()
    }
    return (currentPiece.shape === temp.shape && currentPiece.coords.equals(temp.coords))
}

/**
 * Tests if piece doesnt move after left collision (wall)
 * @returns true if it succeeds, false if it fails
 */
function test12() {
    reset();
    currentPiece = new I();
    let temp = copyPiece(currentPiece);
    while (!leftCollisionCheck()) {
        currentPiece.moveHor(-1)
        temp = copyPiece(currentPiece)
    }
    return currentPiece.coords.equals(temp.coords)
}

/**
 * Tests if piece doesnt move after right collision (wall)
 * @returns true if it succeeds, false if it fails
 */
function test13() {
    reset();
    currentPiece = new I();
    let temp = copyPiece(currentPiece);
    while (!rightCollisionCheck()) {
        currentPiece.moveHor(1)
        temp = copyPiece(currentPiece)
    }
    return currentPiece.coords.equals(temp.coords)
}

/**
 * Tests if piece doesnt rotate if collision would occur (wall)
 * @returns true if it succeeds, false if it fails
 */
function test14() {
    reset();
    currentPiece = new I();
    let temp;
    while (!rightCollisionCheck()) {
        currentPiece.moveHor(1)
    }
    temp = copyPiece(currentPiece)
    return rotateCollisionCheck();
}

/**
 * Tests if currentpiece becomes next piece after bottom collision (wall)
 * @returns true if it succeeds, false if it fails
 */
function test15() {
    reset();
    currentPiece = new I();
    temp = copyPiece(nextPiece);
    //creating fake "piece" cells
    board[23].fill("#333333")
    while (!downCollisionCheck()) {
        currentPiece.moveDown()
    }
    return (currentPiece.equals(temp))
}

/**
 * Tests if piece doesnt move after left collision (piece)
 * @returns true if it succeeds, false if it fails
 */
function test16() {
    reset();
    currentPiece = new I()
    tempPiece = new I()
    tempPiece.moveHor(-1);
    tempPiece.coords.forEach(x => board[x[0]][x[1]] = tempPiece.color)
    return leftCollisionCheck();
}

/**
 * Tests if piece doesnt move after right collision (piece)
 * @returns true if it succeeds, false if it fails
 */
function test17() {
    reset();
    currentPiece = new I()
    tempPiece = new I()
    tempPiece.moveHor(1);
    tempPiece.coords.forEach(x => board[x[0]][x[1]] = tempPiece.color)
    return rightCollisionCheck();
}

/**
 * Tests if piece doesnt rotate if collision would occur (piece)
 * @returns true if it succeeds, false if it fails
 */
function test18() {
    reset();
    currentPiece = new I()
    tempPiece = new I()
    tempPiece.moveHor(1);
    tempPiece.coords.forEach(x => board[x[0]][x[1]] = tempPiece.color)
    return rotateCollisionCheck();
}

/**
 * Tests if held piece works properly when held piece is null
 * @returns true if it succeeds, false if it fails
 */
function test19() {
    reset();
    let origNext = copyPiece(nextPiece)
    let origCurr = copyPiece(currentPiece)
    //this is called a pro gamer move, where I create a fake keydown event
    e = {key: 'z', preventDefault: function() {}}
    downkey(e)
    return heldPiece.equals(origCurr) && currentPiece.equals(origNext)
}

/**
 * Tests if held piece works properly when held piece is not null
 * @returns true if it succeeds, false if it fails
 */
function test20() {
    reset();
    let origCurr = copyPiece(currentPiece)
    heldPiece = getRandomPiece()
    let origHeld = copyPiece(heldPiece)
    e = {key: 'z', preventDefault: function() {}}
    downkey(e)
    return heldPiece.equals(origCurr) && currentPiece.equals(origHeld)
}

/**
 * Tests if held piece swap is prevented once it has happened
 * @returns true if it succeeds, false if it fails
 */
function test21() {
    reset();
    e = {key: 'z', preventDefault: function() {}}
    downkey(e)
    let swapCurr = copyPiece(currentPiece)
    let swapHeld = copyPiece(heldPiece)
    downkey(e)
    return currentPiece.equals(swapCurr) && heldPiece.equals(swapHeld);
}

/**
 * Tests if held piece swap is allowed after bottom collision
 * @returns true if it succeeds, false if it fails
 */
function test22() {
    reset();
    e = {key: 'z', preventDefault: function() {}}
    downkey(e)
    let firstSwapHeld = copyPiece(heldPiece)
    while (!downCollisionCheck()) currentPiece.moveDown()
    let pre2ndSwapCurr = copyPiece(currentPiece)
    downkey(e)
    return currentPiece.equals(firstSwapHeld) && heldPiece.equals(pre2ndSwapCurr);
}

/**
 * Tests if check10Row does nothing when no rows are complete
 * @returns true if it succeeds, false if it fails
 */
function test23() {
    reset();
    check10Row();
    return score === 0;
}

/**
 * Tests if check10Row removes a complete line
 * @returns true if it succeeds, false if it fails
 */
function test24() {
    reset();
    board[23].fill("#696969")
    check10Row();
    return score === 100;
}

/**
 * Checks if check10Row does not remove not complete rows
 * @returns true if it succeeds, false if it fails
 */
function test25() {
    reset()
    for (let i = 4; i < 24; i++) {
        board[i][Math.floor(Math.random() * 10)] = "#069420"
    }
    check10Row();
    return score === 0
}

/**
 * Checks if check10Row removes all complete rows
 * @returns true if it succeeds, false if it fails
 */
function test26() {
    for (let i = 0; i < 100; i++) {
        reset();
        let num = Math.floor(Math.random() * 20);
        for (let j = 0; j < num; j++) {
            let row = Math.floor(Math.random() * 20) + 4
            while (!board[row].includes("#ffffff")) row = Math.floor(Math.random() * 20) + 4
            board[row].fill("#420420")
        }
        check10Row();
        if (board.some(x => !x.includes("#ffffff"))) return false
    }
    return true
}

/**
 * Compares arrays
 * @returns true if same, false otherwise
 */
Array.prototype.equals = function(array2) {
    if (this.length !== array2.length) return false;
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i]) && Array.isArray(array2[i])) {
            if (!this[i].equals(array2[i])) return false;
        }
        else if (this[i] !== array2[i]) return false;
    }
    return true;
}

/**
 * Compares 2 pieces
 * @returns true if same, false otherwise
 */
Piece.prototype.equals = function(piece) {
    return this.shape === piece.shape && this.coords.equals(piece.coords)
}

/**
 * resets game
 */
function reset() {
    clearTimeout(timeoutID)
    clearTimeout(autoID)
    time = 0;
    wait = 1000
    board = Array(24).fill(null).map(x => x = Array(10).fill("#ffffff"));
    heldPiece = null;
    swapped = false;
    score = 0
    currentPiece = getRandomPiece();
    nextPiece = getRandomPiece();
    updateGraphics()
}

document.addEventListener("DOMContentLoaded", reset);