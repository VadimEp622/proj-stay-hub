import { Field } from "formik"

export function RegistrationInput({ inputType = 'text', inputName, inputValue }) {

    return (
        <label tabIndex={1} htmlFor={inputName} className={inputName}>
            <article className='input-container'>
                <span className={`${inputValue ? 'has-value' : ''}`}>Fullname</span>
                <Field type={inputType} id={inputName} name={inputName} />
            </article>
        </label>
    )
}