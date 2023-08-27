// Node modules
import { useEffect, useState } from "react"

// Services
import { userService } from "../services/user.service.js"


export default function useLoginSignupCredentials(isSignUp, isQuick) {
    const [initialCredentials, setInitialCredentials] = useState(userService.getEmptyCredentials())

    useEffect(() => {
        if (!isQuick) setInitialCredentials(userService.getEmptyCredentials())
        else {
            setInitialCredentials(isSignUp ? userService.getNewUserCredentials() : userService.getGuestCredentials())
        }
    }, [isQuick, isSignUp])

    return initialCredentials
}