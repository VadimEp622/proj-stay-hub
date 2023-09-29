export function StayPhotos({ photoList }) {

    return (
        <section className='stay-photos-container'>
            {photoList.slice(0, 5).map((url, index) =>
                <section className='photo-preview' key={index}>
                    <img src={url} alt={index} />
                    <div className='overlay'></div>
                </section>
            )}
        </section>
    )
}