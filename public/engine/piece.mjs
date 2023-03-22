class PieceColor{
    white = 0
    black = 1
}

class PieceTypes{
    king = 0
    queen = 1
    bishop = 2
    knight = 3
    rook = 4
    pawn = 5
}

export class Piece{
    constructor(type, color){
        this.type = type
        this.color = color

        this.isMoving = false
        this.x = 0
        this.y = 0
    }

    startMove(x, y){
        this.isMoving = true
        this.x = x
        this.y = y
    }

    endMove(){
        this.isMoving = false
    }
}