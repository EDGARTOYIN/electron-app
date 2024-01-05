/* eslint-disable prettier/prettier */
import React from 'react'
import { useEffect, useState } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'

export default function WifiTest() {
  const TARGET = 'TEST-NOTEBOOK_5G'
  const [isGuideLinesOpen, setIsGuideLinesOpen] = useState(true)
  const [ssid, setSsid] = useState(null)

  async function handleTestStart() {
    setIsGuideLinesOpen(false)
    const ssid = await getWifiSSID()
    setSsid(ssid.response)
  }

  async function getWifiSSID() {
    const response = await fetch(`http://127.0.0.1:8000/get-wifiTestNetwork/${TARGET}`)
    const data = await response.json()
    return data
  }

  return (
    <>
      {isGuideLinesOpen ? (
        <TypeOfTestMessage
          typeTest={'Wifi Test'}
          message={
            'Cuado inicie el test se conectara a una red wifi en automatico, si no se conecta a ninguna red, el test fallara.'
          }
          onEnterPressed={handleTestStart}
        />
      ) : (
        <div className="min-h-screen bg-blue-300 grid place-items-center">
          <div>Tratando de conectar con la red:{TARGET}</div>
          <div>Respuesta de: {ssid}</div>
        </div>
      )}
    </>
  )
}
