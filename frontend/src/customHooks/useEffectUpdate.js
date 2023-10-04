import { useEffect, useRef } from 'react'


export default function useEffectUpdate(callback, dependencies = []) {
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) isFirstRender.current = false
        else callback()
    }, dependencies)
}