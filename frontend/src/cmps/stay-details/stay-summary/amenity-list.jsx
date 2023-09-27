import { AmenityPreview } from './amenity-preview.jsx'


export function AmenityList({ amenities }) {

    return (
        <section className='amenity-list-container' id='amenities'>
            <h3 className='title fs22 lh26'>What this place offers</h3>
            <section className='amenity-list'>
                {amenities.slice(0, 10).map(amenity =>
                    <AmenityPreview key={amenity} amenity={amenity} />
                )}
            </section>
        </section>
    )
}