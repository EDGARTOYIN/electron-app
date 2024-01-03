/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'

export default function ButtonKey({ label }) {
  return (
    <div className="bg-teal-500 border px-7 py-3 max-w-[2rem] rounded-sm flex items-center justify-center">
      {label}
    </div>
  )
}
