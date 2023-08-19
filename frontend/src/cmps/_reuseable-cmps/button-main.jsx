import { useEffect, useState } from 'react'
import { utilService } from '../../services/util.service.js'

export function ButtonMain({ text, onClickButton = (ev) => { } }) {
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0) // Updated initial value
    const [backgroundStyle, setBackgroundStyle] = useState({})

    useEffect(() => {
        console.log('(x,y)', `(${positionX}, ${positionY})`)

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
        }
        setBackgroundStyle(newBackgroundStyle)
    }, [positionX, positionY])

    const handleCellHover = (x, y) => {
        setPositionX(x)
        setPositionY(y)
    }

    return (
        <section className="btn-main-container">
            {utilService.createDivsForButtonContainer().map((cell, index) => (
                <div
                    key={index}
                    className="cell"
                    onMouseEnter={() => handleCellHover(index % 10, Math.floor(index / 10))}
                ></div>
            ))}
            <section className="content" style={backgroundStyle}>
                <button className="action-btn" type="submit">
                    <span className="btn-txt">{text}</span>
                </button>
            </section>
        </section>
    )
}