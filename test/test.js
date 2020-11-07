
end = false;

/**
 * Calls all the tests
 */
function test() {
    console.log("^^^ That error is because there are no graphics in the test suite, the error is useful because it prevents the game from starting on window load")
    console.log("getRandomPiece returns instance of Piece: ", test1())
    console.log("All origCoords functions work: ", test2())
    console.log("moveDown works for all piece types: ", test3())
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
        return true;
    }
}

/**
 * Compares arrays
 * @returns true is same, false otherwise
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