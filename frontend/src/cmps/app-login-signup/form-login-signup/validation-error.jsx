import SvgHandler from "../../svg-handler.jsx"

export function ValidationError({ content }) {
    return (
        <aside className="aside-required flex align-center">
            <SvgHandler svgName={'exclamation'} />
            <span className="fs12 lh16">{content}</span>
        </aside>
    )
}