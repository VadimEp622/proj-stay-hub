// Node modules
import { useEffect, useState } from "react"

// Store
import { useAppSelector } from "../store/hooks"

// Services
import { stayService } from "../services/stay.service"


export function useHeaderFilterBy() {
    const storeFilterBy = useAppSelector(storeState => storeState.stayModule.filterBy)
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        // when store filterBy get initialized with empty object, or when store filterBy gets reset to empty object,
        // also reset header filterBy state by giving it's object's keys their initial values 
        // if (Object.keys(storeFilterBy).length === 0) setFilterBy(stayService.getEmptyFilterBy())
        // console.log('hi from useHeaderFilterBy - storeFilterBy', storeFilterBy)
        if (!storeFilterBy) setFilterBy(stayService.getEmptyFilterBy())
    }, [storeFilterBy])



    return [filterBy, setFilterBy]
}