import React, { useEffect } from 'react'

import './index.scss'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import { LuPlusSquare } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

// Upload image
// validate: size < 150kb, name <= 10 char ✅

// cặp input(text & replaceText): Cho 1 button "+" để thêm 1 hoặc nhiều cặp input. usefieldArray
// text: bất kì value
// replaceText: validate 1 số nguyên > 1 & < 1000 if not validate number || ""


// useFormContext: setup component để thực hành cho useFormContext
// defaultValues & values
// dùng when thay cho test
// getValues & watch khác gì

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regexPassword = /[a-zA-Z]/,
    regexPhoneNumber = /[1-9]\d{8}/

type Inputs = {
    fullName: string,
    email: string,
    mobilePhone: string,
    country: string,
    password: string,
    confirmPassword: string,
    image: FileList,
    dynamicInputs: IDynamicInputs[]
}

interface IDynamicInputs {
    text: string,
    textReplace?: string | number
}

const emptyDynamicInputs: IDynamicInputs = {
    text: '',
    textReplace: '',
}
const schema = yup
    .object()
    .shape({
        fullName: yup
            .string()
            .required("Full Name is required!"),

        email: yup
            .string()
            .required("Email is required!")
            .matches(regexEmail, "Email is not valid!"),

        mobilePhone: yup
            .string()
            .required("Phone number is required!")
            .matches(regexPhoneNumber, "Phone number is not valid!"),

        country: yup
            .string()
            .required("Please select a Country!"),

        password: yup
            .string()
            .required("Password is required!")
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(regexPassword, 'Password can only contain Latin letters.'),

        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), undefined], "Confirm password not match!")
            .required("Confirm password is required!"),

        image: yup
            .mixed<FileList>()
            .test("isValidFileName", "File name must be less than 10 characters", function (value) { // Validate name file
                if (value && value[0]) {
                    const fileNameWithoutExtension = value[0].name.split('.').slice(0, -1).join('.')
                    return fileNameWithoutExtension.length <= 10;
                }
                else return this.createError({ message: "Please upload your image first!" })
            })
            .test("isValidFileSize", "Image only accepts files under 150KB", value => { //Validate size image file
                return value && value[0] && value[0].size <= 150000;
            }),

        dynamicInputs: yup
            .array()
            .of(yup
                .object()
                .shape({
                    text: yup
                        .string()
                        .required("Text field is required!"),
                    textReplace: yup
                        .mixed<string | number>()
                        .test(function (value) { // bài tập làm = when
                            if (!value || value === "") {
                                return this.createError({ message: "Text Replace field is required!" })
                            }
                            else {
                                const textReplaceInput = Number(value)
                                const isNumber = !isNaN(textReplaceInput)
                                if (!isNumber) {
                                    return this.createError({ message: "Text Replace must be a number!" })
                                } else {
                                    if (textReplaceInput < 1 || textReplaceInput > 1000) {
                                        return this.createError({ message: "Please enter a valid number!" })
                                    }
                                }
                            }
                            return true
                        })
                })
            )

    }).required();

function Register() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        // getValues,
        setFocus } = useForm<Inputs>({
            defaultValues: {
                dynamicInputs: [emptyDynamicInputs]
            },
            mode: "onSubmit",
            resolver: yupResolver(schema)

        })

    const { fields, prepend, remove } = useFieldArray({
        control,
        name: "dynamicInputs"
    });

    const submitHandler = (data: Inputs) => {
        console.log({ data });

        reset();
    }

    useEffect(() => {
        setFocus("fullName")
    }, [])

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
                    <div className="form-floating mb-3">
                        <input type="email" placeholder='Enter your Email.' className='form-control w-100'  {...register("email")} />
                        <label className='floatingInput'>Email *</label>
                        <p>{errors.email?.message}</p>
                        <div id="emailHelpBlock" className="form-text">
                            Example: name@gmail.com
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text">+84</span>
                            <input type="text" placeholder='Enter your phone number.' className="form-control" aria-label="Phone number (maximum 11 digits)" {...register("mobilePhone")} />
                        </div>
                        <p>{errors.mobilePhone?.message}</p>
                        <div id="emailHelpBlock" className="form-text">
                            Example: (+84) 1234 567 89
                        </div>
                    </div>

                    {/* Select Country */}
                    <div className="mb-3">
                        <select className='form-select w-100' {...register("country")} defaultValue="">
                            <option disabled value=""> -- Select your Country -- </option>
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
                        <input type="file" accept=".jpg, .png, .jpeg, .gif|image/*" className="form-control"
                            id="inputGroupFile" aria-describedby="inputGroupFileAddon" aria-label="Upload" {...register("image")} />
                        <p>{errors.image?.message}</p>
                    </div>
                    <button
                        type='button'
                        onClick={() => prepend(emptyDynamicInputs)}
                        className='add-input-btn rounded mb-3 w-100'
                    >
                        <LuPlusSquare />
                    </button>
                    {/* Dynamic input & validate */}
                    {fields.map((field, index) => (
                        <div key={field.id} className="couple-input mb-3 ">
                            <div className='d-flex flex-rows align-items-center'>
                                <div className="form-floating w-50">
                                    <input key={field.id} type="text" className="form-control" id="floatingInput" placeholder="ext" {...register(`dynamicInputs.${index}.text` as const)} />
                                    <label htmlFor="floatingInput">Text</label>
                                    <p>{errors.dynamicInputs?.[index]?.text?.message}</p>
                                </div>
                                <div className="form-floating w-75 ms-3  ">
                                    <input key={field.id} type="text" className="form-control" id="floatingPassword" placeholder="Text Replace" {...register(`dynamicInputs.${index}.textReplace` as const)} />
                                    <label htmlFor="floatingPassword">Text Replace</label>
                                    <p>{errors.dynamicInputs?.[index]?.textReplace?.message}</p>
                                </div>
                                <div>
                                    <button
                                        title='Remove input'
                                        className='delete-input-btn ms-3'
                                        onClick={() => remove(index)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Submit */}
                    <button
                        className='w-100 mt-1'
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