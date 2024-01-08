/* eslint-disable prettier/prettier */
import { useState } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'

export default function BlueToothTest() {
  const DEVICE_NAME = 'ROG HARPE A'
  const [isGuideLinesOpen, setIsGuideLinesOpen] = useState(true)
  // const [devices, setDevices] = useState([])
  // const [loading, setLoading] = useState(false)

  async function conectDevice() {
    const response = await fetch(`http://127.0.0.1:8000/bluetooth/connect-to-device/${DEVICE_NAME}`)
    // const data = await response.json()
    return data
  }

  // async function fetchDevices() {
  //   const response = await fetch(`http://127.0.0.1:8000/bluetooth/connect-to-device/${DEVICE_NAME}`)
  //   const data = await response.json()
  //   return data.response
  // }

  async function handleStart() {
    setIsGuideLinesOpen()
    const ola = await conectDevice()
  }

  return (
    <>
      {isGuideLinesOpen ? (
        <TypeOfTestMessage
          typeTest={'Bluetooth Test'}
          message={'Antes de presionar listo coloque el dispositivo a conectar en modo paring'}
          onEnterPressed={handleStart}
        />
      ) : (
        <h1>hola</h1>
      )}
    </>
  )
}
