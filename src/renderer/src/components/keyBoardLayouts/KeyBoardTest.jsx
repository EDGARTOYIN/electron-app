/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import ButtonKey from './buttonKey'
export default function KeyBoardTest() {
  useEffect(() => {
    // Función para manejar el evento keydown
    window.addEventListener(
      'keyup',
      (event) => {
        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`)
        console.log(event.type)
      },
      true
    )
  }, [])

  // 15 cols
  // 6 rows

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="grid gap-2 grid-rows-6">
        <div className="grid grid-cols-[repeat(15,1fr)] gap-2 grid-rows-[10px]">
          <ButtonKey label="ESC" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
          <ButtonKey label="F1" />
        </div>
      </div>
    </div>
  )
}
