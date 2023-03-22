

async function imageDataToImage(imageData, width, heigth){
    return new Promise((resolve, reject) => {
        let canvas = document.createElement("canvas")
        let context = canvas.getContext("2d", {alpha: true})

        canvas.width = width
        canvas.height = heigth
        context.putImageData(imageData, 0, 0)

        var image = new Image()

        image.onload = () => {
            resolve(image)
        }

        image.onerror = reject
        image.src = canvas.toDataURL()
    })
}

export async function loadTextureMap(url, xRow, yRow){
    const canvas = document.createElement('canvas')
    return new Promise((resolve, reject) => {
        const textureMap = new Image();

        textureMap.onload = async () => {
            canvas.width = textureMap.width;
            canvas.height = textureMap.height;
            const context = canvas.getContext('2d', {alpha: true})
            context.drawImage(textureMap, 0, 0);
            
            var spriteWidth = textureMap.width / xRow
            var spriteHeight = textureMap.height / yRow
            var sprites = []
            for (let j = 0; j < yRow; j++) {
                for (let i = 0; i < xRow; i++) {
                    var startX = spriteWidth * i
                    var startY = spriteHeight * j

                    var imageData = context.getImageData(startX, startY, spriteWidth, spriteHeight)
                    var image = await imageDataToImage(imageData, spriteWidth, spriteHeight)
                    sprites.push(image)
                }
            }

            canvas.remove()
            resolve(sprites)
        };
        textureMap.onerror = reject
        textureMap.src = url
    })  
}