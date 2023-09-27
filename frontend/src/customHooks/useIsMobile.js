import { useEffect, useState } from 'react'


export default function useIsMobile(width = 790) {
    const [isMobile, setIsMobile] = useState(getIsMobile())

    function getIsMobile() {
        return window.innerWidth < width
    }

    useEffect(() => {
        const onResize = () => setIsMobile(getIsMobile())

        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isMobile
}