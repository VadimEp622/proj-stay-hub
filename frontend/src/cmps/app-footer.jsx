// Node modules
import { useState } from 'react'
import { useSelector } from 'react-redux'

// Services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { TICK_DECLINE } from '../services/svg.service.js'

// Store
import { removeFromCart, checkout } from '../store/stay.actions.js'

// Components
import { UserMsg } from './user-msg.jsx'
import SvgHandler from './svg-handler.jsx'


export function AppFooter( {isStayDetailsPage} ) {
    const [isCartShown, setIsCartShown] = useState(false)
    const cart = useSelector(storeState => storeState.stayModule.cart)
    const count = useSelector(storeState => storeState.userModule.count)
    const cartTotal = cart.reduce((acc, stay) => acc + stay.price, 0)

    async function onCheckout() {
        try {
            const score = await checkout(cartTotal)
            showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
        } catch (err) {
            showErrorMsg('Cannot checkout')
        }
    }

    return (
        <footer className={`app-footer full ${!isStayDetailsPage ? 'main-layout' : 'details-layout'}`}>
            <p className="flex align-center">

                {/* ©{new Date().getFullYear()} StayHub,Inc. · Terms · Sitemap · Privacy · Your Privacy Choices {<svg width="26" height="12" fill="none"><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" fill="#fff"></rect><path d="M14 1h7a5 5 0 010 10H11l3-10z" fill="#06F"></path><path d="M4.5 6.5l1.774 1.774a.25.25 0 00.39-.049L9.5 3.5" stroke="#06F" stroke-linecap="round"></path><path d="M16.5 3.5L19 6m0 0l2.5 2.5M19 6l2.5-2.5M19 6l-2.5 2.5" stroke="#fff" stroke-linecap="round"></path><rect x="0.5" y="0.5" width="25" height="11" rx="5.5" stroke="#06F"></rect></svg>} */}
                © {new Date().getFullYear()} StayHub, Inc. <span>·</span> Terms <span>·</span> Sitemap <span>·</span> Privacy <span>·</span> Your Privacy Choices {<SvgHandler svgName={TICK_DECLINE} />}
            </p>
            {cart.length > 0 &&
                <h5>
                    <span>{cart.length}</span> Products in your Cart
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsCartShown(!isCartShown)
                    }}>
                        ({(isCartShown) ? 'hide' : 'show'})
                    </button>
                </h5>
            }

            {isCartShown && cart.length > 0 && <section className="cart" >
                <h5>Your Cart</h5>
                <ul>
                    {
                        cart.map((stay, idx) => <li key={idx}>
                            <button onClick={() => {
                                removeFromCart(stay._id)
                            }}>x</button>
                            {stay.vendor}
                        </li>)
                    }
                </ul>
                <p>Total: ${cartTotal.toLocaleString()} </p>
                <button onClick={onCheckout}>Checkout</button>
            </section>}
            <UserMsg />
        </footer>
    )
}