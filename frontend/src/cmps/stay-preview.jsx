export function StayPreview({ stay }) {
    return (
        <div className="stay-preview" key={stay._id}>
            <img src={stay.imgUrls[0]} alt="stay-image" />
            <p>{stay.loc.city}, {stay.loc.country}</p>
            <p>{stay.checkIn} - {stay.checkOut}</p>
            <p>${stay.price.toLocaleString()} night</p>
        </div>
    )
}
