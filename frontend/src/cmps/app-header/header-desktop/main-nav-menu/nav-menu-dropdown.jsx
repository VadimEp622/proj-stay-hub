// Node modules
import { Link } from 'react-router-dom'

// Store
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { systemSetAppModal } from '../../../../store/systemSlice'
import { logout } from '../../../../store/userSlice'
import { stayResetWishlistIds } from '../../../../store/staySlice'

// service
import { SET_APP_MODAL_LOGIN, SET_APP_MODAL_SIGNUP } from '../../../../services/resources-strings.service.js'
import { showErrorMsg } from '../../../../services/event-bus.service.js'


export function NavMenuDropdown({ setIsDropdownActive }) {
    const loggedInUser = useAppSelector(storeState => storeState.userModule.user)
    const dispatch = useAppDispatch()


    function onOpenModal(ev, modalType) {
        ev.preventDefault()
        ev.stopPropagation()
        setIsDropdownActive(false)
        dispatch(systemSetAppModal(modalType))
    }

    function onLogout(ev) {
        ev.preventDefault()
        handleLogout()
    }

    async function handleLogout() {
        try {
            await dispatch(logout()).unwrap()
            dispatch(stayResetWishlistIds())
        } catch (err) {
            console.log('Failed logging out', err)
            showErrorMsg('Failed logging out')
        }
    }

    return (
        <section className="dropdown-navbar flex">
            {loggedInUser ? (
                <>
                    {/* <div className="dropdown-option">Messages</div> */}
                    <Link to={`/trips`} className="dropdown-option">
                        <span>Trips</span>
                    </Link>
                    <Link to={`/wishlist`} className="dropdown-option">
                        <span>Wishlist</span>
                    </Link>
                    <div className="dropdown-line"></div>
                    {/* <div className="dropdown-option">Manage listings</div> */}
                    <Link to={`/dashboard`} className="dropdown-option">
                        <span>Dashboard</span>
                    </Link>
                    <div className="dropdown-line"></div>
                    <article className="dropdown-option" onClick={(ev) => onLogout(ev)}>
                        <span>Logout</span>
                    </article>
                </>
            ) : (
                <>
                    <article className="dropdown-option" onClick={(ev) => onOpenModal(ev, SET_APP_MODAL_LOGIN)}>
                        <span>Log in</span>
                    </article>
                    <article className="dropdown-option" onClick={(ev) => onOpenModal(ev, SET_APP_MODAL_SIGNUP)}>
                        <span>Sign up</span>
                    </article>
                    {/* <div className="dropdown-line"></div> */}
                    {/* <Link to={`/dashboard/stay/add`} className="dropdown-option"><span>StayHub your home</span></Link> */}
                </>
            )}
        </section>
    )
}
