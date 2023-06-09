import { useSelector } from "react-redux"

export function MyTrips() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    if (!loggedInUser) {
        showErrorMsg('You must be logged in to view your trips')
        return <Redirect to="/" />
    }

    return (
        <section className="trips-container">
            <h3>Trips</h3>
            <div className="Trips">
                {loggedInUser.orders ? (
                    <p>Please view your trips</p>
                ) : (
                    <>
                        <div className="trips-header">No trips booked..yet!</div>
                        <p>Time to dust off your bags and start planning your next adventure</p>
                        <button>Start searching</button>
                    </>
                )}
            </div>
            <div className="upcoming-reservation">
                <h3>Upcoming reservations</h3>
                <div className="upcoming-reservation">
                    {/* תוסיף פה לפי התמונה של תומי */}
                </div>
                <aside className="explore-things-to-do">
                    <h5>Explore things to do near {user.orders[0].city}</h5>
                    <div className="things-to-do">
                        <div className="things-todo">
                            Just for you
                            {utilService.getRandomIntInclusive(10, 20)} experiences
                        </div>
                        <div className="things-todo">
                            Top-rated
                            {utilService.getRandomIntInclusive(30, 50)} experiences
                        </div>
                        <div className="things-todo">
                            Sports
                            {utilService.getRandomIntInclusive(50, 70)} experiences
                        </div>
                        <div className="things-todo">
                            Tours
                            {utilService.getRandomIntInclusive(100, 200)} experiences
                        </div>
                        <div className="things-todo">
                            Sightseeing
                            {utilService.getRandomIntInclusive(100, 200)} experiences
                        </div>
                        <div className="things-todo">
                            Show more
                            {utilService.getRandomIntInclusive(300, 500)} experiences
                        </div>
                    </div>
                </aside>
            </div>
            <div className="where-you-been">
                <h3>Where you've been</h3>
                <div className="last-trips">

                </div>
            </div>
        </section>
    )
}