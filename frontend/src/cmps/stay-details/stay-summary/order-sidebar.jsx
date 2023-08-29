// Node modules
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// Services
import { utilService } from "../../../services/util.service.js"

// Store
import { setOrder } from "../../../store/user.actions.js"

// Custom Hooks
import useStayDates from "../../../customHooks/useStayDates.js"
import useStayGuests from "../../../customHooks/useStayGuests.js"
import useStayDetails from "../../../customHooks/useStayDetails.js"

// Components
import { CostAndReviewScore } from "./order-sidebar/cost-and-review-score.jsx"
import { DatesAndGuests } from "./order-sidebar/dates-and-guests.jsx"
import { Pricing } from "./order-sidebar/pricing.jsx"
import { SpecialInfo } from "./order-sidebar/special-info.jsx"
import { ButtonMain } from "../../_reuseable-cmps/button-main.jsx"
import { SET_APP_MODAL_LOGIN } from "../../../store/system.reducer.js"
import { setAppModal } from "../../../store/system.action.js"



// TODO: organize this cmp.
// TODO: seriously consider if rewriting the return() part of the cmp + scss from scratch is needed or not
// TODO: check the date modal cmp, if it's working as intended after making it reusable, or if more work is needed on it


// TODO: after finishing building and organizing this cmp,
//   start removing redundant stuff from the Order Object (need to follow path to back-end, and the get from the front-end)


export function OrderSidebar({ stay, randomDate, hostImgUrl }) {
    // ============================== Custom Hooks ==============================
    const [checkIn, checkOut, handleDateChange] = useStayDates()
    const [guests, setGuests] = useStayGuests()
    const [orderDetails] = useStayDetails(stay, checkIn, checkOut, guests)
    // ==========================================================================
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()



    function onReserveClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (!loggedInUser) {
            setAppModal(SET_APP_MODAL_LOGIN)
        }
        else {
            const order = createOrder(orderDetails)
            console.log('order', order)
            setOrder(order)
            navigate(`/stay/book/${stay._id}`)
        }
    }

    function createOrder({ guestCount, price, nightsCount, serviceFee, cleaningFee }) {
        return {
            buyer: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname,
                img: loggedInUser.imgUrl,
                joined: loggedInUser.joined ? loggedInUser.joined : utilService.getRandomMonthAndYear()
            },
            seller: {
                _id: stay.host._id,
                fullname: stay.host.fullname,
                img: hostImgUrl,
                joined: utilService.getRandomMonthAndYear()
            },
            checkIn,
            checkOut,
            nightsCount,
            guestCount,
            nightsPrice: nightsCount * stay.price,
            orderPrice: {
                price,
                serviceFee,
                cleaningFee,
                total: (price * nightsCount) + serviceFee + cleaningFee
            },
            stayDetails: {
                id: stay._id,
                image: stay.imgUrls[0],
                loc: stay.loc,
                summary: stay.summary,
                type: stay.type,
                rate: stay.reviews.rate,
                reviewsCount: stay.reviews.length
            },
            thingsToDo: {
                "Just-for-you": utilService.getRandomIntInclusive(10, 20),
                "Top-rated": utilService.getRandomIntInclusive(30, 50),
                "Sports": utilService.getRandomIntInclusive(30, 60),
                "Tours": utilService.getRandomIntInclusive(50, 120),
                "Sightseeing": utilService.getRandomIntInclusive(50, 120),
                "more": utilService.getRandomIntInclusive(300, 500),
            },
            status: "Pending",
            _id: utilService.makeId()
        }
    }


    return (
        <section className="order-sidebar">
            <section className="order-block">

                <section className="order">
                    <CostAndReviewScore stay={stay} orderDetails={orderDetails} />
                    <DatesAndGuests
                        checkIn={checkIn}
                        checkOut={checkOut}
                        guests={guests}
                        setGuests={setGuests}
                        handleDateChange={handleDateChange}
                    />
                    <ButtonMain
                        text={'Reserve'}
                        onClickButton={(ev) => onReserveClick(ev)}
                    />
                </section>

                <article className="assurance flex column align-center">
                    <span className="fs14 lh18">You won't be charged yet</span>
                </article>

                <Pricing orderDetails={orderDetails} />

            </section>

            <SpecialInfo stay={stay} />

        </section>
    )
}