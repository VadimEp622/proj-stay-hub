import { useEffect, useState } from 'react'

export function useButtonBackgroundStyle(borderRadius = '8px') {
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [backgroundStyle, setBackgroundStyle] = useState({})

    useEffect(() => {
        // Calculate the position as a fraction of the container's size
        const fractionX = positionX / 10
        const fractionY = positionY / 10 // Adjusted for 10 rows

        // Convert the fractions into percentages
        const percentageX = fractionX * 100
        const percentageY = fractionY * 100

        const newBackgroundStyle = {
            backgroundImage: `radial-gradient(
                circle at ${percentageX}% ${percentageY}%,
                rgb(241, 37, 75) 0%,
                rgb(230, 30, 77) 27.5%,
                rgb(227, 28, 95) 40%,
                rgb(215, 4, 102) 57.5%,
                rgb(189, 30, 89) 75%,
                rgb(189, 30, 89) 100%
            )`,
            borderRadius
        }
        setBackgroundStyle(newBackgroundStyle)
    }, [positionX, positionY])

    const handleCellHover = (x, y) => {
        setPositionX(x)
        setPositionY(y)
    }

    return {
        handleCellHover,
        backgroundStyle,
    }
}
