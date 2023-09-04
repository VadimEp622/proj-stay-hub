// Node modules
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Services
import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"


export default function useLoadStay(stayId) {
    const [stay, setStay] = useState(null)
    const navigate = useNavigate()
    const stayHostImgUrlRef = useRef()

    useEffect(() => {
        const loadStay = async () => {
            try {
                const fetchedStay = await stayService.getById(stayId)
                stayHostImgUrlRef.current = fetchedStay.host.isInDB ? fetchedStay.host.pictureUrl : userService.randomHostImg()
                setStay(fetchedStay)
            } catch (err) {
                console.log('could not load stay from id', err)
                showErrorMsg('Cannot load stay')
                navigate('/')
            }
        }

        loadStay()
    }, [navigate, stayId])

    const hostImgUrl = stayHostImgUrlRef.current
    return [stay, hostImgUrl]
}