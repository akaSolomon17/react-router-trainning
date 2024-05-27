import React from 'react'
import AboutInfo from './AboutInfo'
import SecurityInfo from './SecurityInfo'
import { FormProvider, useForm } from 'react-hook-form';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type Inputs = {
    fullName: string,
    email: string,
    mobilePhone: string,
    country: string,
    password: string,
    confirmPassword: string,
}

// REGEX
const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regexPassword = /[a-zA-Z]/,
    regexPhoneNumber = /[1-9]\d{8}/;

//Validate schema
const schema: yup.ObjectSchema<Inputs> =
    yup
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

            country: yup.string().required("Please select a Country!"),

            password: yup
                .string()
                .required("Password is required!")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(regexPassword, "Password can must contain at least 1 letters."),

            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password"), undefined], "Confirm password not match!")
                .required("Confirm password is required!"),
        });

const UserInfo = () => {
    const methods = useForm<Inputs>({
        defaultValues: {
            fullName: "",
            email: "",
            mobilePhone: "",
            country: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const onSubmitForm = (data: Inputs) => {
        console.log(data);
    };

    return (
        <div className="register-form  w-75 mt-3 mb-3 d-flex flex-column justify-content-center align-items-center">
            <FormProvider {...methods}>
                <form
                    className='form-group d-flex flex-column w-50 mt-4'
                    onSubmit={methods.handleSubmit(onSubmitForm)}
                >
                    <AboutInfo />
                    <SecurityInfo />
                    <button className='rounded mt-3' type="submit">Submit</button>
                </form>
            </FormProvider>
        </div>
    )
}

export default UserInfo