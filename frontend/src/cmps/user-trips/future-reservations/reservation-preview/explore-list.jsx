import { EYE } from "../../../../services/svg.service.js"
import SvgHandler from "../../../_reuseable-cmps/svg-handler.jsx"
import { ExplorePreview } from "./explore-list/explore-preview.jsx"

export function ExploreList({ explore, trip }) {

    console.log('explore', explore)
    console.log('trip', trip)
    // const exploreObj = trip.content.thingsToDo
    // const exploreList = Object.keys(exploreObj).map((key) => ({ [key]: exploreObj[key] }))
    // console.log('exploreList', exploreList)

    return (
        <section className="explore-things-to-do">

            <h5 className="explore-title fs14">Explore things to do near {trip.content.stayDetails.loc.city}</h5>

            <section className="things-to-do">
                {/* {exploreList.map(exploreItem => {
                    console.log('exploreItem', exploreItem)
                    console.log('...exploreItem', ...exploreItem)

                    return <ExplorePreview />
                })} */}

                <section className="to-do">
                    <img src={explore.justForYou[Math.floor(Math.random() * explore.sightseeing.length)]} alt="to-do" />
                    <article className="todo-info">
                        <h4>Just for you</h4>
                        <span>{trip.content.thingsToDo['Just-for-you']} experiences</span>
                    </article>
                </section>

                <section className="to-do">
                    <img src={explore.topRated[Math.floor(Math.random() * explore.sightseeing.length)]} alt="top rated" />
                    <article className="todo-info">
                        <h4>Top-rated</h4>
                        <span>{trip.content.thingsToDo['Top-rated']} experiences</span>
                    </article>
                </section>

                <section className="to-do">
                    <img src={explore.sports[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sports" />
                    <article className="todo-info">
                        <h4>Sports</h4>
                        <span>{trip.content.thingsToDo['Sports']} experiences</span>
                    </article>
                </section>

                <section className="to-do">
                    <img src={explore.tours[Math.floor(Math.random() * explore.sightseeing.length)]} alt="tours" />
                    <article className="todo-info">
                        <h4>Tours</h4>
                        <span>{trip.content.thingsToDo['Tours']} experiences</span>
                    </article>
                </section>

                <section className="to-do">
                    <img src={explore.sightseeing[Math.floor(Math.random() * explore.sightseeing.length)]} alt="sightseeing" />
                    <article className="todo-info">
                        <h4>Sightseeing</h4>
                        <span>{trip.content.thingsToDo['Sightseeing']} experiences</span>
                    </article>
                </section>

                <section className="to-do">
                    <article className="show-more">
                        <SvgHandler svgName={EYE} />
                    </article>
                    <article className="todo-info">
                        <h4>Show more</h4>
                        <span>{trip.content.thingsToDo['more']} experiences</span>
                    </article>
                </section>

            </section>

        </section>
    )
}