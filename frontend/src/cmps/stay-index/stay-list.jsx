import { useSelector } from 'react-redux'
import { StayPreview } from './stay-list/stay-preview.jsx'
import { Loader } from '../_reuseable-cmps/loader.jsx'


// TODO: improve stay-list cmp structure + styling

export function StayList({ stays, geoLocation }) {
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    if (isLoading) return <Loader />
    return (
        <section className='stay-list'>
            {stays.length < 1 && <span>No Stays Available</span>}
            {stays.map(stay =>
                <StayPreview key={stay._id} stay={stay} geoLocation={geoLocation} />
            )}
        </section>
    )
}
