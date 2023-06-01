import { utilService } from "../services/util.service";

export function StayPreview({ stay }) {
    return (
        <div className="stay-preview" key={stay._id}>
            <img src={stay.imgUrls[0]} alt="stay-image" />
            <div className="preview-info">
                <p>{stay.loc.city}, {stay.loc.country}</p>
                {console.log(stay)}
                <p>{utilService.formatTime(stay.checkIn, stay.checkOut)}</p>
                {console.log(stay)}
                <p>${stay.price.toLocaleString()} night</p>
            </div>
        </div>
    )
}
