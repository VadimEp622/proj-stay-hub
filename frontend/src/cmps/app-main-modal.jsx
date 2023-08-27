import { DynamicCmp } from "./_reuseable-cmps/dynamicCmp.jsx"

export function AppMainModal({ modalType }) {

    return (
        <div className="modal-wrapper-container">
            <div className="modal-wrapper">
                <DynamicCmp modalType={modalType} />
            </div>
        </div>
    )
}