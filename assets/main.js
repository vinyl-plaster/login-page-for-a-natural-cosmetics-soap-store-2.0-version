document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('cnv')
    const ctx = canvas.getContext('2d')

    const LAYOUT_WIDTH = 1728
    const LAYOUT_HEIGHT = 1117

    canvas.width = screen.width
    canvas.height = screen.height

    console.log(canvas.width, canvas.height)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'white'

    const baseWidth = n => LAYOUT_WIDTH / n
    const baseHeight = n => LAYOUT_HEIGHT / n
    
    const currentX = p => screen.width / p
    const currentY = p => screen.height / p

    const layoutS = LAYOUT_WIDTH * LAYOUT_HEIGHT
    const currentScreenS = screen.width * screen.height
    const currentPageAreaDifference = layoutS / currentScreenS

    const drawRect = (x, y, w, r) => {
        ctx.beginPath()

        ctx.moveTo(x + r, y)
        ctx.lineTo(x + w - r, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + r)

        ctx.lineTo(x + w, y + w - r)
        ctx.quadraticCurveTo(x + w, y + w, x + w - r, y + w)

        ctx.lineTo(x + r, y + w)
        ctx.quadraticCurveTo(x, y + w, x, y + w - r)

        ctx.lineTo(x, y + r)
        ctx.quadraticCurveTo(x, y, x + r, y)

        ctx.closePath()
        ctx.fill()
    }

    const data = [
        // The Left side
        { x: 30, y: 32, w: 382, r: 30 },
        { x: 160, y: 808, w: 232, r: 30 },
        { x: 30, y: 442, w: 100, r: 30 },
        { x: 359, y: 509, w: 65, r: 30 },
        { x: 496, y: 960, w: 80, r: 30 },
        { x: 120, y: 661, w: 70, r: 30 },
        { x: 462, y: 32, w: 100, r: 30 },

        // The right side
        {x: 1351, y: 748, w: 332, r: 30},
        {x: 1191, y: 924, w: 80, r: 30},
        {x: 1434, y: 32, w: 166, r: 30},
        {x: 1597, y: 283, w: 86, r: 30},
        {x: 1283, y: 198, w: 76, r: 30},
        {x: 1369, y: 486, w: 129, r: 30},
    ]

    data.forEach(({x, y, w, r}) => drawRect(
        currentX(baseWidth(x)), 
        currentY(baseHeight(y)), 
        w / currentPageAreaDifference, 
        r / currentPageAreaDifference
    ))

    const overlay = document.getElementById('overlay')
    const dataUrl = canvas.toDataURL('image/png')

    overlay.style.webkitMaskImage = `url(${dataUrl})`
    overlay.style.maskImage = `url(${dataUrl})`
})