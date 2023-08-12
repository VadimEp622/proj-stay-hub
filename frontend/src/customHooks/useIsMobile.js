import { useEffect, useState, useTransition } from "react"
// TODO: refactor to useTransition if possible
const getIsMobile = () => window.innerWidth < 790

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getIsMobile())
    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile())
        }

        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return isMobile
}