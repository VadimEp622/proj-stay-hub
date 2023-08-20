// Node modules
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function useStayGuests() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const initialState = filterBy?.guests?.adults > 0 ?
        filterBy.guests :
        {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0
        }
    const [guests, setGuests] = useState(initialState)

    return [guests, setGuests]
}