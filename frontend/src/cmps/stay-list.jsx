import { Link } from "react-router-dom";
import { StayPreview } from "./stay-preview";

export function StayList({ stays }) {
    return (
        <ul className="stays-list">
            {stays.map(stay => (
                <li key={stay._id}>
                    <Link to={`/${stay._id}`}>
                        <StayPreview stay={stay} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}
