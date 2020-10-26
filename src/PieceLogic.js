
class Piece {
    constructor() {
        //either pass in piece type, randomly generate it in here,
        //or maybe make subclasses?
    }

    moveDown() {
        //no need to move up in tetris
    }

    moveHor(dir) {
        //-1 = left, 1 = right
    }

    rotate() {
        //each piece has a different center of rotation uhoh
    }
}

function getRandomPiece() {
    //depends on how Piece constructor works
    return new Piece()
    //or
    let types = ["I", "J","L","S","O","Z","T"]
    return new Piece(types[Math.floor(Math.random() * 7)]);
    //or the subclasses method
}