import SvgHandler from "../../_reuseable-cmps/svg-handler"


export function ValidationError({ content }) {
    return (
        <aside className="aside-required flex align-center">
            <SvgHandler svgName={'exclamation'} />
            <span className="fs12 lh16">{content}</span>
        </aside>
    )
}