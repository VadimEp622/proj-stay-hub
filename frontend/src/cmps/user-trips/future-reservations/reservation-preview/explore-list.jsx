import { ExplorePreview } from "./explore-list/explore-preview.jsx"

export function ExploreList({ trip }) {

    return (
        <section className="explore-things-to-do">
            <h5 className="explore-title fs14">Explore things to do near {trip.content.stayDetails.loc.city}</h5>
            <section className="things-to-do">
                {trip.content.explore.map(exploreItem =>
                    <ExplorePreview key={exploreItem.label} exploreItem={exploreItem} />
                )}
            </section>
        </section>
    )
}