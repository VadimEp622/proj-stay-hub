import { useCallback, useEffect, useState } from 'react'


export default function useIsMobile(width = 790) {
    const getIsMobile = useCallback(() => {
        return window.innerWidth < width
    }, [width])

    const [isMobile, setIsMobile] = useState(getIsMobile())

    useEffect(() => {
        const onResize = () => setIsMobile(getIsMobile())

        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [getIsMobile])

    return isMobile
}
