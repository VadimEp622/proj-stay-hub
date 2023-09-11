// Node modules
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

// Services
import { ARROW_LEFT, STAR } from "../services/svg.service.js"
import { utilService } from "../services/util.service.js"
import { socketService, SOCKET_EMIT_SET_STAYID, SOCKET_EMIT_STAY_RESERVED, SOCKET_EVENT_STAY_RESERVED } from "../services/socket.service.js"

// Store
import { addConfirmedTrip } from "../store/user.actions.js"

// Custom hooks
import useScrollToTop from "../customHooks/useScrollToTop.js"

// Components
import { ButtonMain } from "../cmps/_reuseable-cmps/button-main.jsx"
import SvgHandler from "../cmps/_reuseable-cmps/svg-handler.jsx"
import { Loader } from "../cmps/_reuseable-cmps/loader.jsx"
import { ConfirmationMain } from "../cmps/order-confirmation/confirmation-main.jsx"
import { ConfirmationSidebar } from "../cmps/order-confirmation/confirmation-sidebar.jsx"


// TODO: set redirect when clicking back, using history, instead of new link
// TODO: when logging out, redirect to stay-details


export function OrderConfirmation() {
    useScrollToTop()
    const navigate = useNavigate()
    const location = useLocation()
    const orderObject = useSelector(storeState => storeState.userModule.order)


    // useEffect(() => {
    //     socketService.on(SOCKET_EMIT_SET_STAYID, doSomething)
    //     socketService.emit(SOCKET_EMIT_SET_TOYID, toy._id)
    //     return () => {
    //         socketService.off(SOCKET_EMIT_SET_STAYID, doSomething)
    //     }
    // }, [])
    // function doSomething(something) {
    //     console.log('something', something)
    // }

    useEffect(() => {
        //  if refreshed, or entered URL path directly with /book/ inside, redirect to stay page (stay-details)
        if (Object.keys(orderObject).length === 0) {
            const pathName = location.pathname.split('/')
            const newPathName = pathName.filter(name => name !== 'book').join('/')
            navigate(newPathName)
        }
    }, [])


    function onOrderConfirm(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        handleOrderConfirm()
    }

    async function handleOrderConfirm() {
        try {
            console.log('onOrderConfirm -> orderObject', orderObject)
            await addConfirmedTrip(orderObject)
            socketService.emit(SOCKET_EVENT_STAY_RESERVED, orderObject.seller._id)
            navigate('/trips')
        } catch (error) {
            console.error('Error adding confirmed trip:', error)
        }
    }


    if (Object.keys(orderObject).length === 0) return <Loader />
    const stayId = orderObject.stayDetails.id
    return (
        <section className="order-confirmation-page" >

            <section className="confirmation-header flex align-center">
                <Link className="return-btn" to={`/stay/${stayId}`} title="return">
                    <SvgHandler svgName={ARROW_LEFT} />
                </Link>
                <h2>Confirm and pay</h2>
            </section>

            <section className="confirmation-main-container">
                <ConfirmationMain orderObject={orderObject} />
                <ConfirmationSidebar orderObject={orderObject} />
            </section>

            <section className="confirm-btn">
                <ButtonMain text={'Confirm and pay'} onClickButton={onOrderConfirm} />
            </section>

        </section>
    )
}