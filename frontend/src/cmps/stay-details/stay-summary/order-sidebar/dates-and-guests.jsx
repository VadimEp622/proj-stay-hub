import { userService } from '../../../../services/user.service.js'

export function DatesAndGuests({ checkIn, checkOut, guests, setGuests }) {

    function onDatesClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        // console.log('checkIn', checkIn)
        // console.log('checkOut', checkOut)
        // handleDateChange(Date.parse('8/23/2023'), Date.parse('8/26/2023'))
    }

    function onGuestsClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        // setGuests(prevGuests => ({
        //     ...prevGuests,
        //     // adults: 4
        // }))
    }

    const guestsString = userService.buildGuestsString(guests)
    return (
        <section className='dates-and-guests' title='Change here not implemented yet'>
            <section className='dates-container' onClick={(ev) => onDatesClick(ev)}>

                <div className='dates-container-border'></div>
                <section className='dates flex'>

                    <article className='check-in full'>
                        <span className='fs10 lh12 ff-circular-bold uppercase'>check-in</span>
                        <span className={`fs14 lh18${checkIn ? '' : ' empty'}`}>{checkIn ? checkIn : 'Add date'}</span>
                    </article>

                    <article className='check-out full'>
                        <span className='fs10 lh12 ff-circular-bold uppercase'>checkout</span>
                        <span className={`fs14 lh18${checkOut ? '' : ' empty'}`}>{checkOut ? checkOut : 'Add date'}</span>
                    </article>
                </section>

            </section>
            <section className='guests-container' onClick={(ev) => onGuestsClick(ev)}>

                <div className='guests-container-border'></div>
                <section className='guests'>

                    <article className='guest-block full'>
                        <span className='fs10 lh12 ff-circular-bold uppercase'>guests</span>
                        <span className='fs14 lh18'>{guestsString}</span>
                    </article>

                </section>

            </section>
        </section>
    )
}