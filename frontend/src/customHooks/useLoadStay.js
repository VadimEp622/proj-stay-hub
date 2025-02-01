// Node modules
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Store
import { loadStay } from '../store/staySlice'
import { useAppDispatch } from '../store/hooks'


export default function useLoadStay(stayId) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLoadStay = useCallback(async () => {
        try {
            await dispatch(loadStay(stayId))
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }, [navigate, dispatch, stayId])

    useEffect(() => {
        handleLoadStay()
    }, [handleLoadStay])
}