import { loadTextureMap } from './texturemap.mjs'

// get canvas and context
var canvas = null
var context = null

// Load chess piece textures, this returns
// an array with the first 6 images being
// for the white pieces from king, queen,
// knight, bishop, rook and pawn. After these
// image comes the black pieces in the same order.
var textures = await loadTextureMap('/engine/chess_pieces_sprite.png', 6, 2)
var boardSize = 0
var tileSize = 0

function createCanvas(id){
    canvas = document.getElementById(id)
    context = canvas.getContext("2d", {alpha: true})
    
    boardSize = canvas.width
    tileSize = boardSize / 8

    console.log(canvas.style.width, canvas.style.height)
    return canvas
}

function drawBoard(){
    if (!canvas || !context)
        return console.log(`Did not create canvas!`)

    // set up board dimensions and colors
    var lightColor = "#f0d9b5"
    var darkColor = "#b58863"
    
    // draw board
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            context.fillStyle = (row + col) % 2 === 0 ? lightColor : darkColor
            context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
        }
    }
}

function drawPiece(piece, x, y){
    let textureIndex = piece.type + (piece.color == 0 ? 0 : 6);
    context.drawImage(textures[textureIndex], tileSize*x, tileSize*y, tileSize, tileSize)
}

function drawMovingPiece(piece, x, y){
    let textureIndex = piece.type + (piece.color == 0 ? 0 : 6);
    context.drawImage(textures[textureIndex], piece.x - (tileSize/2), piece.y - (tileSize/2), tileSize, tileSize)
}

function calculateRealPosition(x, y){
    let bound = canvas.getBoundingClientRect();
    let nX = x - bound.left - canvas.clientLeft;
    let nY = y - bound.top - canvas.clientTop;
    return { x: nX, y: nY}
}

var onMouseDown = (func) => {
    canvas.onmousedown = function (e){
        let position = calculateRealPosition(e.clientX, e.clientY)
        func(position.x, position.y) 
    }
}

var onMouseUp = (func) => {
    canvas.onmouseup = function (e){
        let position = calculateRealPosition(e.clientX, e.clientY)
        func(position.x, position.y) 
    }
}

var onMouseClick = (func) => {
    canvas.onmouseclick = function (e){
        let position = calculateRealPosition(e.clientX, e.clientY)
        func(position.x, position.y) 
    }
}

var onMouseMove = (func) => {
    canvas.onmousemove = function (e){
        let position = calculateRealPosition(e.clientX, e.clientY)
        func(position.x, position.y) 
    }
}

export {
    createCanvas,
    drawBoard,
    drawPiece,
    drawMovingPiece,
    onMouseDown,
    onMouseUp,
    onMouseClick,
    onMouseMove,
}