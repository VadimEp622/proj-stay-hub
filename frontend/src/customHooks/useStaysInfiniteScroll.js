import { useCallback, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { loadMoreStays } from "../store/stay.actions"



export default function useStaysInfiniteScroll(filterBy) {
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const isLoadingMoreStays = useSelector(storeState => storeState.stayModule.isLoadingMoreStays)
    const page = useSelector(storeState => storeState.stayModule.page)
    const isFinalPage = useSelector(storeState => storeState.stayModule.isFinalPage)


    const observer = useRef()
    const lastStayElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoadingMoreStays && !isFinalPage) {
                console.log('Visible')
                loadMoreStays(filterBy, page + 1)
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