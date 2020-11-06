
class Piece {
    constructor(type) {
        this.shape = type;
        //[row,col]
        this.coords = Array(4).fill(null).map(x => x = [0,0]);
        this.rotationIndex = 0
        this.rotationIncrements = []
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
        for (let c in this.coords) {
            this.coords[c][0] += this.rotationIncrements[this.rotationIndex][c][0]
            this.coords[c][1] += this.rotationIncrements[this.rotationIndex][c][1]
          }
        this.rotationIndex = (this.rotationIndex + 1) % 4
    }
}

class I extends Piece {
    constructor() {
        super("I");
        this.coords = [[0,5],[1,5],[2,5],[3,5]];
        this.color = "blue";
        this.rotationIncrements = [
            [[2,1],[1,0],[0,-1],[-1,-2]],
            [[1,-2],[0,-1],[-1,0],[-2,1]],
            [[-2,-1],[-1,0],[0,1],[1,2]],
            [[-1,2],[0,1],[1,0],[2,-1]]];
    }
}

class O extends Piece {
    constructor() {
        super("O");
        this.coords = [[0,4],[0,5],[1,4],[1,5]];
        this.color = "yellow"
        this.rotationIncrements = [
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0]]];
    }
}

class L extends Piece {
    constructor() {
        super("L");
        this.coords = [[0,5],[1,5],[2,5],[2,6]]
        this.color = "red"
        this.rotationIncrements = [
            [[1,1],[0,0],[-1,-1],[0,-2]],
            [[1,-1],[0,0],[-1,1],[-2,0]],
            [[-1,-1],[0,0],[1,1],[0,2]],
            [[-1,1],[0,0],[1,-1],[2,0]]];
    }
}

class J extends Piece {
    constructor() {
        super("J");
        this.coords = [[0,4],[1,4],[2,4],[0,5]];
        this.color = "brown";
        this.rotationIncrements = [
            [[1,1],[0,0],[-1,-1],[2,0]],
            [[1,-1],[0,0],[-1,1],[0,-2]],
            [[-1,-1],[0,0],[1,1],[-2,0]],
            [[-1,1],[0,0],[1,-1],[0,2]]];
    }
}

class T extends Piece {
    constructor() {
        super("T");
        this.coords = [[0,5],[1,5],[2,5],[1,6]];
        this.color = "orange";
        this.rotationIncrements = [
            [[1,1],[0,0],[-1,-1],[1,-1]],
            [[1,-1],[0,0],[-1,1],[-1,-1]],
            [[-1,-1],[0,0],[1,1],[-1,1]],
            [[-1,1],[0,0],[1,-1],[1,1]]];
    }
}

class S extends Piece {
    constructor() {
        super("S");
        this.coords = [[0,4],[1,4],[1,5],[2,5]]
        this.color = "green"
        this.rotationIncrements = [
            [[1,1],[0,0],[1,-1],[0,-2]],
            [[1,-1],[0,0],[-1,-1],[-2,0]],
            [[-1,-1],[0,0],[-1,1],[0,2]],
            [[-1,1],[0,0],[1,1],[2,0]]];
    }
}

class Z extends Piece {
    constructor() {
        super("Z");
        this.coords = [[0,5],[1,5],[1,4],[2,4]]
        this.color = "purple"
        this.rotationIncrements = [
            [[2,0],[1,-1],[0,0],[-1,-1]],
            [[0,-2],[-1,-1],[0,0],[-1,1]],
            [[-2,0],[-1,1],[0,0],[1,1]],
            [[0,2],[1,1],[0,0],[1,-1]]];
    }
}

//returns object of a random type of piece
function getRandomPiece() {
    let types = [I,O,L,J,T,S,Z];
    return new types[Math.floor(Math.random() * types.length)]();
}