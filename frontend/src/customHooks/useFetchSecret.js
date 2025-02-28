import { useEffect, useRef, useState } from 'react'
import { secretService } from '../services/secret.service'
import { showErrorMsg } from '../services/event-bus.service'


export default function useFetchSecret() {
    const [secret, setSecret] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const isRequestedOnceOnCmpLoadRef = useRef(false)

    useEffect(() => {
        if (!isRequestedOnceOnCmpLoadRef.current) {
            handleFetchSecret()
        }
    }, [isRequestedOnceOnCmpLoadRef])

    async function handleFetchSecret() {
        try {
            isRequestedOnceOnCmpLoadRef.current = true
            const fetchedSecret = await secretService.getApiKeyGoogleMap()
            setSecret(() => fetchedSecret)
        } catch (error) {
            console.log('error', error)
            showErrorMsg('Failed Loading Map')
        } finally {
            setIsLoading(false)
        }
    }

    return [isLoading, secret.secret]
}