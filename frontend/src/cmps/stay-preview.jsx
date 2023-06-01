import { reviewService } from "../services/review.service";
import { utilService } from "../services/util.service";

export function StayPreview({ stay }) {


    return (
        <div className="stay-preview" key={stay._id}>
            <img src={stay.imgUrls[0]} alt="stay-image" />
            <div className="preview-info">
                <p>{stay.loc.city}, {stay.loc.country}</p>
                <p>{reviewService.getAverageReview(stay)}</p>
                <p>{utilService.getFormattedTimeRange(stay.checkIn, stay.checkOut)}</p>
                <p>${stay.price.toLocaleString()} night</p>
            </div>
        </div>
    )
}
