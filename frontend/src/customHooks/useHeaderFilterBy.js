// Node modules
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// Services
import { stayService } from "../services/stay.service.js"


export function useHeaderFilterBy() {
    const storeFilterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        // when store filterBy get initialized with empty object, or when store filterBy gets reset to empty object,
        // also reset header filterBy state by giving it's object's keys their initial values 
        if (Object.keys(storeFilterBy).length === 0) setFilterBy(stayService.getEmptyFilterBy())
    }, [storeFilterBy])

    return [filterBy, setFilterBy]
}