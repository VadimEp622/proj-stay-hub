import { utilService } from "../../services/util.service";

export function AirbnbButton({ text, onClickButton = () => { } }) {
    return (
        <div className="btn-container" onClick={() => onClickButton()}>
            {utilService.createDivsForButtonContainer()}
            <div className="content">
                <button className="action-btn" >
                    <span>{text}</span>
                </button>
            </div>
        </div>
    )
}