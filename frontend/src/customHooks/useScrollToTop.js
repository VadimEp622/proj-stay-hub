import { useEffect } from "react"

export default function useScrollToTop(){
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }, [])
}