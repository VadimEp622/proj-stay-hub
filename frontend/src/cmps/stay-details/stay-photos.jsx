export function StayPhotos({ photos, isMobile }) {

    const photoList = isMobile ? photos.slice(0, 1) : photos.slice(0, 5)
    return (
        <section className={`${isMobile ? '' : 'details-layout'}`}>
            <section className='stay-photos-container'>
                {photoList.map((url, index) =>
                    <section className='photo-preview' key={index}>
                        <img src={url} alt={index} />
                        <div className='overlay'></div>
                    </section>
                )}
            </section>
        </section>
    )
}