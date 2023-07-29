import { useSelector } from "react-redux"
import { StayPreview } from "./stay-list/stay-preview.jsx"
import { Loader } from "../reuseableCmp/loader.jsx"

export function StayList({ stays }) {
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    if (isLoading) return <section className="loading"><Loader /></section>
    return (
        <ul className="stays-list">
            {stays.length < 1 && <span>No Stays Available</span>}
            {stays.map(stay => (
                <li key={stay._id}>
                    <StayPreview stay={stay} />
                </li>
            ))}
        </ul>
    )
}
