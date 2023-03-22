import { Board } from "./board.mjs"
import { Piece } from './piece.mjs'

var board = new Board('chess-board')

board.loadFen("4r3/2P3R1/R1N2k1P/5Np1/K1p1p3/1pr5/3P4/Bn3Q2 w - - 0 1")

board.draw()

// var mPiece = null
// onMouseDown((_x, _y) => {
//     let iX = Math.floor(_x/(canvas.clientWidth/8))
//     let iY = Math.floor(_y/(canvas.clientHeight/8))
//     let index = 8 * iY + iX

//     console.log(index)
//     let piece = board.grid[index]
//     if(!piece)
//         return console.log(`No piece to move`)

//     piece.startMove(_x, _y)
//     piece.oIndex = index
//     mPiece = piece
//     draw(board)
// })

// onMouseMove((_x, _y) => {
//     if(!mPiece)
//         return

//     mPiece.startMove(_x, _y)
//     draw(board)
// })

// onMouseUp((_x, _y) => {
//     if(!mPiece)
//         return

//     let iX = Math.floor(_x/(canvas.clientWidth/8))
//     let iY = Math.floor(_y/(canvas.clientHeight/8))
//     let index = 8 * iY + iX

//     board.grid[mPiece.oIndex] = null
//     board.grid[index] = mPiece

//     mPiece.endMove()
//     mPiece = null
//     draw(board)
// })