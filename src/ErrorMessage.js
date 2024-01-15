import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <p className='error'> ⛔ {message} </p>
  )
}

export default ErrorMessage