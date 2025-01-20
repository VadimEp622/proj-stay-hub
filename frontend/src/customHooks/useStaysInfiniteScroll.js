// Node modules
import { useCallback, useEffect, useRef } from "react"

// Store
import { loadMoreStays, loadWishlistedStayIds } from "../store/staySlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"



export default function useStaysInfiniteScroll(filterBy) {
    const isLoadingMoreStays = useAppSelector(storeState => storeState.stayModule.isLoadingMoreStays)
    const loggedinUser = useAppSelector(storeState => storeState.userModule.user)
    const page = useAppSelector(storeState => storeState.stayModule.page)
    const isFinalPage = useAppSelector(storeState => storeState.stayModule.isFinalPage)
    const dispatch = useAppDispatch()


    const observer = useRef()
    const lastStayElementRef = useCallback(node => {
        if (isLoadingMoreStays) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoadingMoreStays && !isFinalPage) {
                // console.log('Visible')
                dispatch(loadMoreStays({ filterBy, page: page + 1 }))
                if (loggedinUser) dispatch(loadWishlistedStayIds({ filterBy, page: page + 1 }))
            }
        })
        if (node) observer.current.observe(node)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingMoreStays, page, isFinalPage, loggedinUser])


    // Cleanup function
    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [])


    return [isLoadingMoreStays, lastStayElementRef]
}