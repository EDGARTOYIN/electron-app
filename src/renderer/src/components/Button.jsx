/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'

export default function Button({ type, message, handleClick }) {
  const buttonStyles = {
    primary: 'font-semibold rounded-sm py-1 px-10 bg-green-500 hover:bg-green-400 text-white',
    secondary: 'font-semibold border rounded-sm hover:bg-slate-100 border-[#90949b] py-1 px-10'
    // Add more styles as needed
  }

  return (
    <button onClick={handleClick} className={buttonStyles[type]}>
      {message}
    </button>
  )
}
