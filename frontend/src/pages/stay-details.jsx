import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { stayService } from "../services/stay.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function StayDetails() {
    const [stay, setStay] = useState(null)
    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
    }, [stayId])

    function loadStay() {
        console.log(stayId);
        stayService.getById(stayId)
            .then(setStay)
            .catch((err) => {
                console.log('Had issues in stay details', err)
                showErrorMsg('Cannot load stay')
                navigate('/stay')
            })
    }

    if (!stay) return <div>Loading...</div>
    return <section className="stay-details">
        <section className='details-review'>
            <h1>{stay.name}</h1>
            <section className='info-bar flex space-between align-center'>
                <section className='info flex'>
                    <h4>⭐️5</h4>
                    <h4>1 Review</h4>
                    <h4>{stay.loc.city}, {stay.loc.country}</h4>
                </section>
                <section className='btns flex'>
                    <h4>Share</h4>
                    <h4>Save</h4>
                </section>
            </section>
        </section>
        <section className="img-container">
    {(() => {
      const images = []
      for (let i = 0; i < 5; i++) {
        const url = stay.imgUrls[i]
        images.push(<img key={i} src={url} alt={`Image ${i}`} />)
      }
      return images
    })()}
  </section>

    </section>
}