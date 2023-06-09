import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, signup } from '../store/user.actions'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { utilService } from '../services/util.service'
import { Navigate } from 'react-router-dom';
import { stayService } from '../services/stay.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import SvgHandler from '../cmps/svg-handler'
import { setModal } from '../store/stay.actions'
import Select from 'react-select'
import { RenderErrorMessage } from '../cmps/errormessage'
import { ImgUploader } from '../cmps/reuseableCmp/img-uploader'

function handleChange(ev) {
    const field = ev.target.name;
    const { value } = ev.target;
    // setCredentials({ ...credentials, [field]: value });
}

// function onUploaded(imgUrl) {
//     setCredentials({ ...credentials, imgUrl })
// }


const validationSchema = Yup.object().shape({
    stayTitle: Yup.string()
        .min(6, 'Stay title must have at least 6 characters')
        .required('Stay title is required'),
    city: Yup.string()
        .min(3, 'City name must have at least 3 characters')
        .required('City name is required'),
    country: Yup.string()
        .min(3, 'Country name must have at least 3 characters')
        .required('Country name is required'),
    street: Yup.string()
        .min(3, 'Street name must have at least 3 characters')
        .required('Street name is required'),
    description: Yup.string()
        .min(10, 'Description must have at least 10 characters')
        .required('Description is required'),
    capacity: Yup.number()
        .required('Capacity is required')
        .positive('Capacity must be a positive number'),
    bedrooms: Yup.number()
        .required('Number of bedrooms is required')
        .positive('Number of bedrooms must be a positive number'),
    amenities: Yup.array().required('Please select at least one amenity'),
    labels: Yup.array().required('Please select at least one label'),
})


const SliderField = ({ field, form, ...props }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    const handleSliderChange = (newValue) => {
        setFieldValue(name, newValue);
    };

    return (
        <Slider
            {...props}
            value={value}
            onChange={handleSliderChange}
        />
    )
}

const amenitiesOptions = [
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'parking', label: 'Parking' },
    { value: 'pool', label: 'Swimming Pool' },
]

const labelOptions = [
    { value: 'Cabins', label: 'Cabins' },
    { value: 'Rooms', label: 'Rooms' },
    { value: 'Design', label: 'Design' },
    { value: 'Islands', label: 'Islands' },
    { value: 'Countryside', label: 'Countryside' },
    { value: 'Lakefront', label: 'Lakefront' },
    { value: 'Beachfront', label: 'Beachfront' },
    { value: 'Mansions', label: 'Mansions' },
    { value: 'Arctic', label: 'Arctic' },
]

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderColor: 'gray',
    }),
}


const MultiSelectField = ({ field, form: { setFieldValue }, options }) => {
    const handleSelectChange = (selectedOptions) => {
        setFieldValue(field.name, selectedOptions);
    };

    return (
        <Select
            {...field}
            options={options}
            isMulti
            onChange={handleSelectChange}
            onBlur={() => field.onBlur(field.name)}
        />
    )
}



export function AddStay() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [stayToAdd, setStayToAdd] = useState(stayService.getEmptyStay())

    // if (!loggedInUser) {
    //     showErrorMsg('You must be logged in to enter this page')
    //     return <Navigate to="/" />
    // }

    async function onSubmit(values) {
        if (!values.name || !values.city || !values.country) return
        // const uploadedImages = [];
        // for (const file of values.images) {
        //     const secureUrl = await uploadImage(file);
        //     uploadedImages.push(secureUrl);
        // }
        // console.log("Uploaded Images:", uploadedImages);

        setStayToAdd(values)
    }


    return (
        <section className="add-stay" >
            <section className="main-add-stay">
                <section className='img-upload-container'>
                    <ImgUploader />
                    <ImgUploader />
                    <ImgUploader />
                    <ImgUploader />
                    <ImgUploader />
                </section>
                <Formik
                    initialValues={stayToAdd}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="login-form flex justify-center align-center">
                            {/* <Field
                                type="file"
                                name="images"
                                multiple
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    const imagesArray = Array.from(files).map((file) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                            id: uuidv4(),
                                        })
                                    )
                                    setFieldValue("images", imagesArray);
                                }}
                            /> */}
                            <Field
                                type="text"
                                name="staytitle"
                                className="login-input"
                                placeholder="Add a title for your stay"
                                required
                            />
                            <Field
                                type="text"
                                name="city"
                                className="login-input"
                                placeholder="Please enter the city name"
                                required
                            />
                            <Field
                                type="text"
                                name="country"
                                className="login-input"
                                placeholder="Please enter the country name"
                                required
                            />
                            <Field
                                type="text"
                                name="street"
                                className="login-input"
                                placeholder="Please enter the street name"
                                required
                            />
                            <Field
                                type="number"
                                name="capacity"
                                className="login-input"
                                placeholder="Please enter the capacity of people allowed to stay at this stay"
                                required
                                min={0}
                                max={16}
                            />
                            <Field
                                type="number"
                                name="bedrooms"
                                className="login-input"
                                placeholder="Please enter the number of bedrooms"
                                required
                                min={0}
                            />
                            <Field
                                type="number"
                                name="price"
                                className="login-input"
                                placeholder="Please enter the price per night"
                                required
                                component={SliderField}
                                min={25}
                                max={1000}
                            />
                            <Field
                                name="labels"
                                component={({ field, form }) => (
                                    <Select
                                        options={labelOptions}
                                        isMulti
                                        value={field.value}
                                        onChange={(selectedOptions) => form.setFieldValue(field.name, selectedOptions)}
                                        onBlur={field.onBlur}
                                        styles={customStyles}
                                    />
                                )}
                            />
                            <div className="form-group">
                                <label htmlFor="amenities">Amenities:</label>
                                <Field name="amenities" component={MultiSelectField} options={amenitiesOptions} />
                            </div>
                            <RenderErrorMessage fieldName="stayTitle" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="city" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="country" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="street" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="capacity" errors={errors} touched={touched} />

                            {/* <section className="add-stay-button-wrapper" onClick={onSubmit}>
                                <div className="add-stay-button-container" onClick={onSubmit}>
                                    {utilService.createDivsForButtonContainer()}
                                    <div className="content">
                                        <button className="action-btn" type="submit">
                                            <span className="btn-txt">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </section> */}
                        </Form>
                    )}
                </Formik>
            </section>
        </section >
    )
}

