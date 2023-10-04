import { useState, useEffect, useRef } from 'react'
import { eventBus, showSuccessMsg } from '../services/event-bus.service.js'
import {
  socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_STAY_RESERVED, SOCKET_EVENT_RESERVATION_REPLY
} from '../services/socket.service.js'


export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

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

    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })

    socketService.on(SOCKET_EVENT_STAY_RESERVED, (loc) => {
      console.log(`New stay reservation about me ----> ${loc.country}, ${loc.city}`)
      showSuccessMsg(`Pending reservation for: ${loc.country}, ${loc.city}`)
    })

    socketService.on(SOCKET_EVENT_RESERVATION_REPLY, (reply) => {
      console.log(`Host replied to your reservation ----> ${reply}`)
      showSuccessMsg(`Your reservation has been ${reply}`)
    })


    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
      socketService.off(SOCKET_EVENT_STAY_RESERVED)
      socketService.off(SOCKET_EVENT_RESERVATION_REPLY)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className='user-msg-container'>
      <section className={`user-msg ${msg.type}`}>
        <span className='fs20 ff-circular-semibold'>{msg.txt}</span>
      </section>
    </section>
  )
}