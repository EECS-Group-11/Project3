
end = false;

/**
 * Calls all the tests
 */
function test() {
    clearTimeout(timeoutID)
    clearTimeout(autoID)
    time = 0;
    wait = 1000
    board = Array(24).fill(null).map(x => x = Array(10).fill("#ffffff"));
    heldPiece = null;
    console.log("^^^ That error is because there are no graphics in the test suite, the error is useful because it prevents the game from starting on window load")
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
    console.log("Nextpiece becomes currentpiece after bottom collision: ", test11())
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

function test11() {
    temp = clone(nextPiece)
    while (!downCollisionCheck()) {
        currentPiece.moveDown()
    }
    return (currentPiece === temp)
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