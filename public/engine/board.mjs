import { createCanvas, drawBoard, drawPiece, drawMovingPiece } from './renderer.mjs'
import { Piece } from "./piece.mjs"


export class Board{
    constructor(id){
        this.canvas = createCanvas(id)
        this.grid = [8*8] // 8*8

        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = null
        }
    }

    draw(){
        drawBoard()

        for (let i = 0; i < this.grid.length; i++) {
            if(this.grid[i]){
                var position = this.indexToPosition(i)
                drawPiece(this.grid[i], position.x, position.y)
            }
        }
    }

    loadFen(fen){
        let getType = (c) => {
            switch (c.toLowerCase()) {
                case 'k': return 0
                case 'q': return 1
                case 'b': return 2
                case 'n': return 3
                case 'r': return 4
                case 'p': return 5
            }
        } 

        let getColor = (c) => {
            return /^[A-Z]+$/.test(c) ? 0 : 1
        }

        let x = 0
        let y = 0
        for (let i = 0; i < fen.length; i++) {
            let char = fen.charAt(i)

            if(char == ' ')
                break
            
            if(!isNaN(char - parseFloat(char))){
                x += parseFloat(char)
                continue
            }

            if(char == '/'){
                y += 1
                x = 0
                continue
            }

            console.log(char)
            let index = this.positionToIndex(x, y)
            this.grid[index] = new Piece(getType(char), getColor(char))
            x++
        }
    }

    setPiece(piece, x, y){
        if(this.notInBounds(x, y))
            return console.log(`can't move piece to ${x}, ${y}`)

        let index = this.positionToIndex(x, y)
        this.grid[index] = piece
    }

    positionToIndex(x, y){
        return 8 * y + x
    }

    indexToPosition(index){
        let y = Math.floor(index/8)
        let x = index % 8
        return { x: x, y: y }
    }

    notInBounds(x, y){
        return x < 0 || x > 8 || y < 0 || y > 8
    }
}

