/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
// import { motion } from 'framer-motion'
import { useState } from 'react'
export default function TypeOfTestMessage({ typeTest, message, onEnterPressed }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsVisible(false)
      if (onEnterPressed) {
        onEnterPressed()
      }
    }
  }

  return (
    isVisible && (
      <div
        className="text-2xl h-screen gap-2 text-center grid place-content-center"
        onKeyDown={handleKeyDown}
        tabIndex="0" // Hace que el div sea focable
      >
        <h1 className="text-5xl text-teal-400">{typeTest}</h1>
        <p>{message}</p>
        <p>
          Presione <span className=" border-b-2 border-green-400">Enter</span> cuando este listo.
        </p>
      </div>
    )
  )
}
