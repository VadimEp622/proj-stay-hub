// Node modules
import { useCallback, useEffect, useRef } from "react"

// Store
import { loadMoreStays } from "../store/staySlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"




export default function useStaysInfiniteScroll(filterBy) {
    const isLoading = useAppSelector(storeState => storeState.systemModule.isLoading)
    const isLoadingMoreStays = useAppSelector(storeState => storeState.stayModule.isLoadingMoreStays)
    const page = useAppSelector(storeState => storeState.stayModule.page)
    const isFinalPage = useAppSelector(storeState => storeState.stayModule.isFinalPage)
    const dispatch = useAppDispatch()


    const observer = useRef()
    const lastStayElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoadingMoreStays && !isFinalPage) {
                console.log('Visible')
                dispatch(loadMoreStays(filterBy, page + 1))
            }
        })
        if (node) observer.current.observe(node)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, page, isFinalPage])


    // Cleanup function
    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect()
        }
    }, [])


    return [isLoadingMoreStays, lastStayElementRef]
}