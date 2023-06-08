import { useEffect, useRef } from 'react'

export const useClickOutside = (onClickOutside) => {
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (ev) => {
            if (ref.current && !ref.current.contains(ev.target)) {
                onClickOutside(ev)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [onClickOutside])

    return ref
}
