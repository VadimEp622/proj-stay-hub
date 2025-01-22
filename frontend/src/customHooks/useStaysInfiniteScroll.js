// Node modules
import { useCallback, useEffect, useRef } from "react"

// Store
import { loadMoreStays, loadWishlistedStayIds } from "../store/staySlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"



export default function useStaysInfiniteScroll(filterBy) {
    const reqStatusLoadStays = useAppSelector(storeState => storeState.stayModule.reqStatusLoadStays)
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const page = useAppSelector(storeState => storeState.stayModule.page)
    const isFinalPage = useAppSelector(storeState => storeState.stayModule.isFinalPage)
    const dispatch = useAppDispatch()
    const observer = useRef()


    const lastStayElementRef = useCallback(node => {
        if (reqStatusLoadStays === "pending") return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && reqStatusLoadStays !== "pending" && !isFinalPage) {
                // console.log('Visible')
                dispatch(loadMoreStays({ filterBy, page: page + 1 }))
                if (loggedinUser) dispatch(loadWishlistedStayIds({ filterBy, page: page + 1 }))
            }
        })
        if (node) observer.current.observe(node)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reqStatusLoadStays, page, isFinalPage, loggedinUser])


    // Cleanup function
    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [])


    return [reqStatusLoadStays, lastStayElementRef]
}