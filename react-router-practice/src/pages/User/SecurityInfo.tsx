import React from 'react'
import { useFormContext } from 'react-hook-form';

const SecurityInfo = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='border rounded-md p-3'>
            <div className="form-floating mb-3">
                <input type="email" placeholder='Enter your Email.' className='form-control w-100' {...register("email")} />
                <label className='floatingInput'>Email *</label>
                <p>{errors.email?.message?.toString()}</p>
                <div id="emailHelpBlock" className="form-text">
                    Example: name@gmail.com
                </div>
            </div>
            <div className="form-floating mb-3">
                <input type="password" placeholder='Enter your password.' className='form-control w-100' {...register("password")} />
                <label className='floatingInput' >Password *</label>
                <p>{errors.password?.message?.toString()}</p>
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>
            <div className="form-floating mb-3">
                <input type="password" placeholder='Confirm your password.' className='form-control w-100' {...register("confirmPassword")} />
                <label className='floatingInput'>Confirm Password *</label>
                <p>{errors.confirmPassword?.message?.toString()}</p>
            </div>
        </div>
    )
}

export default SecurityInfo