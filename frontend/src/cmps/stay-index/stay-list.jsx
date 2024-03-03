// Store
import { useAppSelector } from '../../store/hooks'

// Custom hooks
import useIsMobile from '../../customHooks/useIsMobile.js'

// Components
import { StayPreview } from './stay-list/stay-preview.jsx'
import { Loader } from '../_reuseable-cmps/loader.jsx'


// TODO: improve stay-list cmp structure + styling

export function StayList({ stays, geoLocation, lastStayElementRef = null }) {
    const isLoading = useAppSelector(storeState => storeState.systemModule.isLoading)
    const isMobile = useIsMobile()
    if (isLoading) return <Loader />
    return (
        <section className='stay-list'>
            {stays.length < 1 && <span>No Stays Available</span>}
            {stays.map((stay, index) =>
                <StayPreview key={stay._id} stay={stay} geoLocation={geoLocation} isMobile={isMobile}
                    lastStayElementRef={(lastStayElementRef && stays.length === index + 1) ? lastStayElementRef : null}
                />
            )}
        </section>
    )
}
