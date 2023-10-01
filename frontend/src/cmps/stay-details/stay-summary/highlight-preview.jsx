import SvgHandler from '../../_reuseable-cmps/svg-handler'

export function HighlightPreview({ highlight }) {

    const { label, title, content } = highlight
    return (
        <section className='highlight-preview flex gap24'>
            <section><SvgHandler svgName={label} /></section>
            <section className='highlight-description'>
                <h3 className='title fs16 lh20'>{title}</h3>
                <p className='content fs14 lh20'>{content}</p>
            </section>
        </section>
    )
}