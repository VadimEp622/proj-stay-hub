import React from 'react'
import { utilService } from '../../services/util.service.js'
import { useButtonBackgroundStyle } from '../../customHooks/useButtonMainStyle.js'

// TODO: background-image cannot be transitioned (in css) - think of a way to smoothen out background transition when hovering 
export function ButtonMain({ text, onClickButton = (ev) => { } }) {
    const { handleCellHover, backgroundStyle } = useButtonBackgroundStyle()

    return (
        <section className="btn-main-container" onClick={(ev) => onClickButton(ev)}>
            {utilService.createDivsForButtonContainer().map((cell, index) => (
                <div
                    key={index}
                    className="cell"
                    onMouseEnter={() => handleCellHover(index % 10, Math.floor(index / 10))}
                ></div>
            ))}
            <section className="content" style={backgroundStyle}>
                <button className="action-btn">
                    <span className="btn-txt">{text}</span>
                </button>
            </section>
        </section>
    )
}