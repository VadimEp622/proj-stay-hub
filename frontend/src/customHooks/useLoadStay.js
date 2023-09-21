// Node modules
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Services
import { stayService } from "../services/stay.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"


export default function useLoadStay(stayId) {
    const navigate = useNavigate()
    const stayHostImgUrlRef = useRef()
    const [stay, setStay] = useState(null)

    useEffect(() => {
        loadStay()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function loadStay() {
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

    const hostImgUrl = stayHostImgUrlRef.current
    return [stay, hostImgUrl]
}