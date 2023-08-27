import { Formik, Form } from 'formik'
import * as Yup from 'yup'


import { RegistrationInput } from './form-login-signup/registration-input.jsx'
import { ValidationError } from './form-login-signup/validation-error.jsx'
import { ButtonMain } from '../_reuseable-cmps/button-main.jsx'



const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, 'Username must have at least 6 characters')
        .required('Username is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Password must contain at least one letter, one number, and one special character and at least 8 characters long'
        )
        .required('Password is required')
})


export function FormLoginSignup({ isSignUp, onSubmit }) {

    const credentials = { username: '', password: '', fullname: '' }
    return (
        <Formik
            initialValues={credentials}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, values }) => (
                <Form className='form-login-signup'>

                    <section className="inputs">
                        {
                            isSignUp &&
                            <RegistrationInput inputType={'text'} inputName={'fullname'} inputValue={values.fullname} />
                        }
                        <RegistrationInput inputType={'text'} inputName={'username'} inputValue={values.username} />
                        <RegistrationInput inputType={'password'} inputName={'password'} inputValue={values.password} />
                    </section>

                    <section className="errors">
                        {
                            errors.username && touched.username
                                ? <ValidationError content={errors.username} /> : null
                        }
                        {
                            errors.password && touched.password
                                ? <ValidationError content={errors.password} /> : null
                        }
                    </section>

                    <section className='btn-login-signup'>
                        {/* <ButtonMain text={`${isSignUp ? 'Register' : 'Continue'}`} isForm={true} /> */}
                        <ButtonMain
                            text={`${isSignUp ? 'Register' : 'Continue'}`}
                            isForm={true}
                        />
                    </section>

                </Form>
            )}
        </Formik>
    )
}