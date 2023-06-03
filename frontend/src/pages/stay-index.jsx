import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToCart } from '../store/stay.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { Link } from 'react-router-dom'
import { UpperFilter } from '../cmps/upper-filter.jsx'
import { StayList } from '../cmps/stay-list.jsx'
import { DatePicker } from '../cmps/date-picker.jsx'
import { FilterModal } from '../cmps/filter.jsx'

export function StayIndex() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const isLoadingRef = useRef(true)
    useEffect(() => {
        isLoadingRef.current = true
        loadStays()
            .then(isLoadingRef.current = false)
    }, [filterBy])


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

    function openFilterModal() {
        setIsFilterModalOpen(true)
    }

    return (
        <section className="stay-index">
            <button className="filter-opener" onClick={openFilterModal}>
                <div className="filter-button-content">
                    Filters
                </div>
            </button>
            {isFilterModalOpen && (<FilterModal stays={stays}
                setIsFilterModalOpen={setIsFilterModalOpen} />)}
            <UpperFilter />
            <StayList stays={stays} isLoadingRef={isLoadingRef} />
            {/* below for aesthetic proposes - when there's no views to display */}
            {/* {stays.length > 0 && <DatePicker />} */}
            {false && <DatePicker />}
        </section >
    )
}