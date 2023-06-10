import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, signup } from '../store/user.actions'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { utilService } from '../services/util.service'
import { Link, Navigate } from 'react-router-dom';
import { stayService } from '../services/stay.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import SvgHandler from '../cmps/svg-handler'
import { addStay, setModal } from '../store/stay.actions'
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
    name: Yup.string()
        .min(6, 'Stay title must have at least 6 characters')
        .required('Stay title is required'),
    country: Yup.string()
        .min(3, 'Country name must have at least 3 characters')
        .required('Country name is required'),
    city: Yup.string()
        .min(3, 'City name must have at least 3 characters')
        .required('City name is required'),
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
    console.log(stayToAdd);

    // if (!loggedInUser) {
    //     showErrorMsg('You must be logged in to enter this page')
    //     return <Navigate to="/" />
    // }

    function onUploaded(url) {
        console.log(stayToAdd.imgUrls);
        console.log('url:', url);
        setStayToAdd({ ...stayToAdd, imgUrls: [...stayToAdd.imgUrls, url] })
      }
    

      async function onSubmit(values) {
        try {
          if (!values.name || !values.city || !values.country) return
      
          const updatedStayToAdd = {
            ...values,
            loc: {
              country: values.country,
              city: values.city,
            },
            imgUrls: stayToAdd.imgUrls, // Include existing imgUrls in updatedStayToAdd
          };
      
          // console.log(stayToAdd);
          await addStay(updatedStayToAdd)
          return <Link to="/" />
        } catch (err) {
          console.error(`Cannot save stay: `, err)
          throw err
        }
      }


    return (
        <section className="add-stay" >
            <section className="main-add-stay">
                <section className='img-upload-container'>
                    <ImgUploader onUploaded={onUploaded}/>
                    <ImgUploader onUploaded={onUploaded}/>
                    <ImgUploader onUploaded={onUploaded}/>
                    <ImgUploader onUploaded={onUploaded}/>
                    <ImgUploader onUploaded={onUploaded}/>
                </section>
                <Formik
                    initialValues={stayToAdd}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="add-stay-form flex">
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
                                name="name"
                                className="login-input"
                                placeholder="Stay title"
                                required
                            />
                            <Field
                                type="text"
                                name="country"
                                className="login-input"
                                placeholder="Country name"
                                required
                            />
                            <Field
                                type="text"
                                name="city"
                                className="login-input"
                                placeholder="City name"
                                required
                            />
                            <Field
                                type="text"
                                name="street"
                                className="login-input"
                                placeholder="Street name"
                                required
                            />
                            <Field
                                type="text"
                                name="description"
                                className="login-input"
                                placeholder="Description"
                                required
                            />
                            <Field
                                type="number"
                                name="capacity"
                                className="login-input"
                                placeholder="Allowed people capacity"
                                required
                                min={0}
                                max={16}
                            />
                            <Field
                                type="number"
                                name="bedrooms"
                                className="login-input"
                                placeholder="Number of bedrooms"
                                required
                                min={0}
                            />
                            <Field
                                type="number"
                                name="price"
                                className="login-input"
                                placeholder="Price per night"
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
                            <RenderErrorMessage fieldName="name" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="country" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="city" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="street" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="description" errors={errors} touched={touched} />
                            <RenderErrorMessage fieldName="capacity" errors={errors} touched={touched} />

                            <section className="add-stay-button-wrapper">
                                <div className="add-stay-button-container" >
                                    {utilService.createDivsForButtonContainer()}
                                    <div className="content">
                                        <button className="action-btn" type="submit">
                                            <span className="btn-txt">Add</span>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </Form>
                    )}
                </Formik>
            </section>
        </section >
    )
}

