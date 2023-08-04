import { utilService } from "../../services/util.service.js"

export function AirbnbButton({ text, onClickButton = (ev) => { } }) {
    return (
        <div className="btn-container" onClick={(ev) => onClickButton(ev)}>
            {utilService.createDivsForButtonContainer()}
            <div className="content">
                <button className="action-btn" type="submit">
                    <span className="btn-txt">{text}</span>
                </button>
            </div>
        </div>
    )
}