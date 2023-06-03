import { Link } from "react-router-dom";
import { StayPreview } from "./stay-preview";

export function StayList({ stays, isLoadingRef }) {
    if (isLoadingRef.current) return <section className="loading">Loading...</section>
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
