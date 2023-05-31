import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToCart } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.vendor = prompt('Vendor?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddToCart(stay) {
        console.log(`Adding ${stay.vendor} to Cart`)
        addToCart(stay)
        showSuccessMsg('Added to Cart')
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
    }

    return (
        <div>
            <h3>Stays App</h3>
            <main>
                <button onClick={onAddStay}>Add Stay </button>
                <ul className="stays-list">
                    {stays.map(stay =>
                        <li className="stay-preview" key={stay._id}>
                            <h4>{stay.vendor}</h4>
                            <p>Price: <span>${stay.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{stay.owner && stay.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
                                <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
                            </div>

                            <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
                            <button className="buy" onClick={() => { onAddToCart(stay) }}>Add to cart</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}