import { eventBus, showSuccessMsg } from "../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_STAY_RESERVED, SOCKET_EVENT_RESERVATION_REPLY } from "../services/socket.service.js"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service.js"
import { login } from "../store/user.actions.js"

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()


  // async function updateUserInStore() {
  //   try {
  //     const user = await loadUser(userService.getLoggedinUser())
  //     store.dispatch({
  //       type: SET_USER,
  //       user
  //     })
  //   } catch (err) {

  //   }
  // }


  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3500)
    })

    // socketService.on('notification-msg',(msg)=>{
    //   console.log('New Reservation is waiting for your approval', msg)
    //   showSuccessMsg('New Reservation is waiting for your approval')
    // })

    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    socketService.on(SOCKET_EVENT_STAY_RESERVED, (loc) => {
      console.log(`New stay reservation about me ----> ${loc.country}, ${loc.city}`)
      showSuccessMsg(`Pending reservation for: ${loc.country}, ${loc.city}`)

  //     // setTimeout(() => {
  //     //   updateUserInStore()
  //     // })

  //   // }, 3000)
  })

  socketService.on(SOCKET_EVENT_RESERVATION_REPLY, (reply) => {
    console.log(`Host replied to your reservation ----> ${reply}`)
    showSuccessMsg(`Your reservation has been ${reply}`)
    // const loggedinUser = userService.getLoggedinUser()
    // setTimeout(() => {
    //   if (loggedinUser) {
    //     login(loggedinUser)
    //   }
    // }, 3000)
  })


  return () => {
    unsubscribe()
    socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
    socketService.off(SOCKET_EVENT_STAY_RESERVED)
    socketService.off(SOCKET_EVENT_RESERVATION_REPLY)
    // socketService.off('notification-msg')
  }
}, [])

function closeMsg() {
  setMsg(null)
}

  if (!msg) return <span></span>
  return (
  <section className="user-msg-container">
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>x</button>
      {msg.txt}
    </section>
  </section>
  )
}