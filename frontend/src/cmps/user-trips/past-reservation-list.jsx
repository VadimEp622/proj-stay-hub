import { PastReservationPreview } from "./past-reservations/past-reservation-preview.jsx"

// TODO: make demo data come from util/order service

export function PastReservationList({ getPastTrips }) {

    const pastTrips = getPastTrips()
    const pastTripsDemoData = [
        {
            content: {
                seller: {
                    fullname: 'Denzel'
                },
                checkIn: '12/7/2022',
                checkOut: '12/11/2022',
                stayDetails: {
                    image: 'https://a0.muscache.com/im/pictures/bcb75add-a00d-466b-ba7d-ef2fe8d8e7e6.jpg?im_w=1200',
                    loc: {
                        address: 'Amsterdam'
                    }
                }
            }
        },
        {
            content: {
                seller: {
                    fullname: 'Hrvoje'
                },
                checkIn: '7/19/2020',
                checkOut: '7/24/2020',
                stayDetails: {
                    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-621355059288164481/original/1e01176e-da92-456e-b663-b8887483b87b.jpeg?im_w=1200',
                    loc: {
                        address: 'Zadarska županija, Croatia'
                    }
                }
            }
        },
        {
            content: {
                seller: {
                    fullname: 'Γεώργιος'
                },
                checkIn: '8/3/2017',
                checkOut: '8/12/2017',
                stayDetails: {
                    image: 'https://a0.muscache.com/im/pictures/95435d63-6c09-43de-a28f-f13158c32356.jpg?im_w=1200',
                    loc: {
                        address: 'Kampos, Greece'
                    }
                }
            }
        }
    ]

    return (
        <section className="past-reservation-list">
            {pastTrips.length > 0
                ? pastTrips.map(trip =>
                    <PastReservationPreview key={trip._id} trip={trip} />
                )
                : pastTripsDemoData.map((trip, index) =>
                    <PastReservationPreview key={index} trip={trip} />
                )
            }
        </section>
    )
}