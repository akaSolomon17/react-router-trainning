import React from 'react'

import './index.scss'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

// Upload image
// validate: size<150kb, name <= 10 char, dimension [width, height] valid trong các giá trị sau [180, 180], [300, 300], [1200, 628]

// cặp input(text & replaceText): Cho 1 button "+" để thêm 1 hoặc nhiều cặp input, mỗi input validate sao cho cả 2 dc để trống, nhưng nếu 1 trong hai có giá trị
// thì phải required phần còn lại.

const regexImage = /([^\\s]+(\\.(jpe?g|png|jpg|gif|bmp|JPG|JPEG|PNG|GIF))$)/,
    regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password = /[a-zA-Z]/

type Inputs = {
    fullName: string,
    email: string,
    mobilePhone: string,
    country: string,
    password: string,
    confirmPassword: string,
    image: string
}

const schema = yup
    .object()
    .shape({
        fullName: yup.string()
            .required("Full Name is required!"),

        email: yup.string()
            .matches(regexEmail, "Email is not valid!")
            .required("Email is required!"),

        mobilePhone: yup.string()
            .matches(/^\\([0-9]{3})\\?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/, "Phone number is not valid!")
            .required("Phone number is required!"),

        country: yup.string()
            .required("Please select a Country!"),

        password: yup.string()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(password, 'Password can only contain Latin letters.')
            .required("Password is required!"),

        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), undefined])
            .required("Confirm password is required!"),
        image: yup.string().matches(regexImage, "Please upload a valid file!").required("Your image is required, please upload!")
    })



function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })
    console.log(errors.email);

    const submitHandler = (data: unknown) => {
        console.log({ data });

        reset();
    }

    return (
        <>
            <div className="register-form  w-75 mt-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                <img
                    alt=""
                    src="/src/assets/react.svg"
                    width="60"
                    height="60"
                    className="mb-2"
                />{' '}
                <h5>Register Form</h5>
                <form className='form-group d-flex flex-column w-50 mt-4' onSubmit={handleSubmit(submitHandler)}>
                    {/* Full Name */}
                    <div className="form-floating mb-3">
                        <input type="text" placeholder='Enter your Full Name.' className='form-control w-100'  {...register("fullName")} />
                        <label className='floatingInput'>Full Name *</label>
                        <p>{errors.fullName?.message}</p>
                    </div>
                    {/* Email */}
                    <div className="form-floating mb-3" form-floating>
                        <input type="email" placeholder='Enter your Email.' className='form-control w-100'  {...register("email")} />
                        <label className='floatingInput'>Email *</label>
                        <div id="emailHelpBlock" className="form-text">
                            Example: name@gmail.com
                        </div>
                        <p>{errors.email?.message}</p>
                    </div>

                    {/* Phone Number */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text">+84</span>
                            <input type="text" placeholder='Enter your phone number.' className="form-control" aria-label="Phone number (maximum 11 digits)" {...register("mobilePhone")} />
                        </div>
                        <div id="emailHelpBlock" className="form-text">
                            Example: (+84) 1234 567 89
                        </div>
                        <p>{errors.mobilePhone?.message}</p>
                    </div>

                    {/* Select Country */}
                    <div className="mb-3">
                        <select {...register("country")} className='form-select w-100'>
                            <option disabled selected value=""> -- Select your Country -- </option>
                            <option value="1">Đà Nẵng</option>
                            <option value="2">Hà Nội</option>
                            <option value="3">Hồ Chí Minh</option>
                        </select >
                        <p>{errors.country?.message}</p>
                    </div>

                    {/* Password */}
                    <div className="form-floating mb-3">
                        <input type="password" placeholder='Enter your password.' className='form-control w-100' {...register("password")} />
                        <label className='floatingInput' >Password *</label>
                        <p>{errors.password?.message}</p>
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-floating mb-3">
                        <input type="password" placeholder='Confirm your password.' className='form-control w-100'{...register("confirmPassword")} />
                        <label className='floatingInput'>Confirm Password *</label>
                        <p>{errors.confirmPassword?.message}</p>

                    </div>

                    {/* Upload image */}
                    <div className="input-group-file mt-2 mb-4">
                        <input type="file" accept=".jpg, .png, .jpeg, .gif|image/*" className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                    </div>


                    {/* Submit */}
                    <button
                        className='align-self-center w-100 mt-1'
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}

export default Register