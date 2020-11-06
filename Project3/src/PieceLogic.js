
class Piece {
    constructor(type) {
        this.shape = type;
        //[row,col]
        this.coords = Array(4).fill(null).map(x => x = [0,0]);
    }

    moveDown() {
        this.coords.forEach(x => x[0] += 1);
    }

    moveHor(dir) {
        //-1 = left, 1 = right
        this.coords.forEach(x => x[1] += dir);
    }

    rotate() {
        //each piece has a different center of rotation uhoh, see image for reference
        //https://vignette.wikia.nocookie.net/tetrisconcept/images/3/3d/SRS-pieces.png/revision/latest?cb=20060626173148
    }
}

class I extends Piece {
    constructor() {
        super("I");
        this.coords = [[0,5],[1,5],[2,5],[3,5]];
        this.color = "blue";
    }
}

class O extends Piece {
    constructor() {
        super("O");
        this.coords = [[0,4],[0,5],[1,4],[1,5]];
        this.color = "yellow"
    }
}

class L extends Piece {
    constructor() {
        super("L");
        this.coords = [[0,5],[1,5],[2,5],[2,6]]
        this.color = "red"
    }
}

class J extends Piece {
    constructor() {
        super("J");
        this.coords = [[0,5],[1,5],[2,5],[2,4]]
        this.color = "brown"
    }
}

class T extends Piece {
    constructor() {
        super("T");
        this.coords = [[0,5],[1,5],[2,5],[1,6]]
        this.color = "orange"
    }
}

class S extends Piece {
    constructor() {
        super("S");
        this.coords = [[0,5],[0,6],[1,5],[1,4]]
        this.color = "green"
    }
}

class Z extends Piece {
    constructor() {
        super("Z");
        this.coords = [[1,5],[1,6],[0,5],[0,4]]
        this.color = "purple"
    }
}

//returns object of a random type of piece
function getRandomPiece() {
    let types = [I,O,L,J,T,S,Z];
    return new types[Math.floor(Math.random() * types.length)]();
}