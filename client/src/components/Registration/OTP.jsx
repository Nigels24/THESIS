import React from 'react'

const OTP = () => {
  return (
    <div className='otp-card'>
      <h1>OTP Verification</h1>
      <div className='otp-card-inputs'>
        <input type='text' maxLength='1' autoFocus />
      </div>
    </div>
  )
}

export default OTP