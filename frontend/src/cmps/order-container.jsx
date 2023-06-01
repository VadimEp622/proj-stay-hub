import { STAR } from "../services/svg.service";
import SvgHandler from "./svg_handler";

export function OrderContainer({ stay }) {

    function _createButtonDivContainer() {
        const divElements = []
        for (let i = 0; i < 100; i++) {
            divElements.push(<div class="cell"></div>)
        }
        return divElements
    }

    return (
        <section className="order-container">
            <header><span>${stay.price.toLocaleString()}</span> night
                <p className="review-rate"><SvgHandler svgName={STAR} /><span>{reviewService.getAverageReview(stay)}</span></p>
                <span>{stay.reviews.length} · reviews</span>
            </header>
            <div class="btn-container">
                {_createButtonDivContainer()}
                <div class="content">
                    <button class="action-btn">
                        <span>Reserve</span>
                    </button>
                </div>
            </div>

        </section>
    )
}