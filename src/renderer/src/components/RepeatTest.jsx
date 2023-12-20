/* eslint-disable prettier/prettier */
import React from 'react'

export default function RepeatTest() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div className="rounded-sm bg-white py-8 px-10 text-xl text-center grid gap-2">
        <h1>Test Fallido</h1>
        <div className="text-lg">
          <p>Se ha acabo el tiempo dado</p>
          <p>¿Desea repetir el test de nuevo?</p>
        </div>
      </div>
    </div>
  )
}
