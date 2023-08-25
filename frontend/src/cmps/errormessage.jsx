import React from 'react'
import SvgHandler from './_reuseable-cmps/svg-handler'


export function RenderErrorMessage({ fieldName, errors, touched }) {
    if (errors[fieldName] && touched[fieldName]) {
        return (
            <aside className="aside-required">
                <div className="aside-required-modal">
                    <div className="exclamation"><SvgHandler svgName={'exclamation'} /></div>
                    <div className="aside-required-modal-text">{errors[fieldName]}</div>
                </div>
            </aside>
        )
    }
    return null
}
