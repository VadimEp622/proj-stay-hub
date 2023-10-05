import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStay } from '../store/stay.actions'


export default function useLoadStay(stayId) {
    const navigate = useNavigate()

    useEffect(() => {
        handleLoadStay()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleLoadStay() {
        try {
            await loadStay(stayId)
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}