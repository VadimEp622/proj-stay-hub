import React from 'react'
import { utilService } from '../../services/util.service.js'
import { useButtonBackgroundStyle } from '../../customHooks/useButtonMainStyle.js'

// TODO: background-image cannot be transitioned (in css) - think of a way to smoothen out background transition when hovering 
export function ButtonMain({
    text = '',
    content = null,
    onClickButton = (ev) => { },
    isForm = false,
    borderRadius = '8px'
}) {
    const { handleCellHover, backgroundStyle } = useButtonBackgroundStyle(borderRadius)

// TODO: attempt to make the component accept children, and render them here

    return (
        <section className="btn-main-container">
            <button className="btn-main" type={isForm ? 'submit' : 'button'} onClick={(ev) => onClickButton(ev)} style={backgroundStyle}>
                {
                    content
                        ? <article className="content">{content}</article>
                        : <span className="text">{text}</span>
                }
                <section className="cell-container">
                    {utilService.createDivsForButtonContainer().map((cell, index) => (
                        <div
                            key={index}
                            className="cell"
                            onMouseEnter={() => handleCellHover(index % 10, Math.floor(index / 10))}
                        ></div>
                    ))}
                </section>
            </button>
        </section>
    )
}