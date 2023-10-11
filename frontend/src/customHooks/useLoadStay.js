import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStay } from '../store/stay.actions'


export default function useLoadStay(stayId) {
    const navigate = useNavigate()

    const handleLoadStay = useCallback(async () => {
        try {
            await loadStay(stayId)
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }, [navigate, stayId])

    useEffect(() => {
        handleLoadStay()
    }, [handleLoadStay])
}