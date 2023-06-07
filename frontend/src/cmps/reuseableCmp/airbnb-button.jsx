import { utilService } from "../../services/util.service";

export function AirbnbButton({ text, onClickButton = () => { } }) {
    return (
        <div className="btn-container" onClick={() => onClickButton()}>
            {utilService.createDivsForButtonContainer()}
            <div className="content">
                <button className="action-btn" >
                    <span className="btn-txt">{text}</span>
                </button>
            </div>
        </div>
    )
}