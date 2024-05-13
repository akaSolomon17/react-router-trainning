import React from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom';

type FormData = {
    userName: string,
    password: string,
}

function FormYup() {
    const { register, setValue, getValues } = useForm<FormData>()
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);

    const onSubmit = () => {
        console.log('Form submitted')
    }
    window.addEventListener("load", () => {
        const params = new URLSearchParams(document.location.search);
        const userNameParams = params.get("username");
        const passwordParams = params.get("password");

        setValue("userName", userNameParams || "")
        setValue("password", passwordParams || "")
    })
    return (
        <>
            <h1 className='form-yup w-50'>Form & Yup practice
                <div className="form-group">
                    <form onSubmit={onSubmit}>
                        <label className='username-label me-4 mt-5'>Username</label>
                        <input className='w-50 ms-2' {...register("userName")} />
                        <label className='password-label me-5 mt-3'>Password</label>
                        <input className='w-50' {...register("password")} />
                        <button
                            type="button"
                            onClick={() => {
                                setSearchParams(params => {
                                    params.set("username", getValues("userName"))
                                    params.set("password", getValues("password"))
                                    return params;
                                })
                            }}
                        >
                            Submit
                        </button>
                        <button
                            className='ms-5 mt-5'
                            type="button"
                            onClick={() => {
                                setValue("userName", "");
                                setValue("password", "");
                                setSearchParams(params => {
                                    params.delete("username")
                                    params.delete("password")
                                    return params;
                                })
                            }}
                        >
                            Reset
                        </button>
                    </form>
                </div></h1>

        </>
    )
}

export default FormYup