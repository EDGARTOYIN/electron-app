/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

export default function ButtonKey({ label, code, disabled, handleKeyDown }) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === code) {
        setPressed(true)
      }
    }

    const handleKeyUp = (event) => {
      if (event.code === 'PrintScreen' && label === 'PrintScreen') {
        setPressed(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (pressed) {
      handleKeyDown()
    }
  }, [pressed])

  return (
    <button
      style={{ backgroundColor: !pressed ? (disabled ? 'gray' : '') : 'red' }}
      className={`border w-full rounded-sm flex items-center justify-center bg-teal-500`}
    >
      {label}
    </button>
  )
}
