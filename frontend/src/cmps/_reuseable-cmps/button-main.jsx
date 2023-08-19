import React from 'react'
import { utilService } from '../../services/util.service.js'
import { useButtonBackgroundStyle } from '../../customHooks/useButtonMainStyle.js'


export function ButtonMain({ text, onClickButton = (ev) => { } }) {
    const { handleCellHover, backgroundStyle } = useButtonBackgroundStyle()

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