export function StayPhotos({ stay }) {

    return (
        <section className="stay-photos-container">
            {stay.imgUrls.slice(0, 5).map((url, index) => (
                <div className="img" key={index}>
                    <img src={url} alt={`${index}`} className="fade-image" />
                    <div className="overlay"></div>
                </div>
            ))}
        </section>
    )
}