import React from 'react'
import { useFormContext } from 'react-hook-form';

const AboutInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className='border rounded-md p-3 mb-3' >
      <div className="form-floating mb-3">
        <input type="text" placeholder='Enter your Full Name.' className='form-control w-100' {...register("fullName")} />
        <label className='floatingInput'>Full Name *</label>
        <p>{errors.fullName?.message?.toString()}</p>
      </div>

      <div className='mb-3'>
        <div className="input-group">
          <span className="input-group-text">+84</span>
          <input type="text" placeholder='Enter your phone number.' className="form-control" aria-label="Phone number (maximum 11 digits)" {...register("phoneNumber")} />
        </div>
        <p>{errors.mobilePhone?.message?.toString()}</p>
        <div id="phoneNumberHelpBlock" className="form-text">
          Example: (+84) 1234 567 89
        </div>
      </div>
      <div className="mb-3">
        <select className='form-select w-100' defaultValue="" {...register("country")}>
          <option disabled value=""> -- Select your Country -- </option>
          <option value="1">Đà Nẵng</option>
          <option value="2">Hà Nội</option>
          <option value="3">Hồ Chí Minh</option>
        </select >
        <p>{errors.country?.message?.toString()}</p>
      </div>
    </div >
  )
}

export default AboutInfo