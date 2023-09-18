// Components
import { CostAndReviewScore } from "./order-sidebar/cost-and-review-score.jsx"
import { DatesAndGuests } from "./order-sidebar/dates-and-guests.jsx"
import { Pricing } from "./order-sidebar/pricing.jsx"
import { SpecialInfo } from "./order-sidebar/special-info.jsx"
import { ButtonMain } from "../../_reuseable-cmps/button-main.jsx"



// TODO: after finishing building and organizing this cmp,
//   start removing redundant stuff from the Order Object (need to follow path to back-end, and the get from the front-end)


export function OrderSidebar({
    stay,
    checkIn, checkOut,
    guests, setGuests,
    orderDetails,
    onCheckAvailabilityClick, onReserveClick,
}) {


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
                    />
                    {(checkIn && checkOut)
                        ? <ButtonMain
                            text={'Reserve'}
                            onClickButton={(ev) => onReserveClick(ev)}
                        />
                        : <ButtonMain
                            text={'Check availability'}
                            onClickButton={(ev) => onCheckAvailabilityClick(ev)}
                        />
                    }
                </section>

                {checkIn && checkOut &&
                    <>
                        <article className="assurance flex column align-center">
                            <span className="fs14 lh18">You won't be charged yet</span>
                        </article>
                        <Pricing orderDetails={orderDetails} />
                    </>
                }

            </section>

            <SpecialInfo stay={stay} />

        </section>
    )
}