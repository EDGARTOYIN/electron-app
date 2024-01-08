/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useState } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'

export default function WifiTest({ onTestComplete }) {
  const TARGET = 'TEST-NOTEBOOK_5G'
  const PASS = 'Notebook05@'
  const [isGuideLinesOpen, setIsGuideLinesOpen] = useState(true)
  const [ssid, setSsid] = useState('')
  const [isLoading, setIsLoading] = useState(false) // New loading state
  const [isresponse, setIsresponse] = useState(null) // New loading state
  const [connectionMsg, setConnectionMsg] = useState(null) // New loading state
  const [pingLoading, setPingLoading] = useState(false) // New loading state
  const [pingResponse, setPingResponse] = useState(null) // New loading state

  async function handleTestStart() {
    setIsGuideLinesOpen(false)
    setIsLoading(true) // Set loading state to true before the request
    const ssid = await getWifiSSID()
    setSsid(ssid.response)
    setIsLoading(false) // Set loading state to false after the request
    if (ssid.response === TARGET) {
      // Si la red buscada existe
      setIsresponse(true)
      const connection = await handleConection()
      setConnectionMsg(connection.response)
      if (connection.found) {
        // Si se pudo conectar a la red
        setPingLoading(true)
        const ping = await pingGoogle()
        setPingResponse(ping.response)
        if (ping.response) {
          // Si se pudo hacer ping a google
          onTestComplete(true)
        } else {
          onTestComplete('El test fallo porque no se pudo hacer ping a google')
        }
        setPingLoading(false)
      } else {
        onTestComplete('El test fallo porque no se pudo conectar a la red')
      }
    } else {
      onTestComplete('El test fallo porque no se encontró la red')
    }
  }

  async function handleConection() {
    const response = await fetch(`http://127.0.0.1:8000/wifi/connect-to-wifi/${TARGET}/${PASS}`)
    const data = await response.json()
    return data
  }

  async function getWifiSSID() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/wifi/get-wifiTestNetwork/${TARGET}`)
      const data = await response.json()
      return data
    } catch (error) {
      onTestComplete('El test fallo porque no se esta ejecutando el script de wifi')
    }
  }

  async function pingGoogle() {
    const response = await fetch(`http://127.0.0.1:8000/wifi/ping-google/`)
    const data = await response.json()
    return data
  }

  return (
    <>
      {isGuideLinesOpen ? (
        <TypeOfTestMessage
          typeTest={'Wifi Test'}
          message={
            'Cuando inicie el test, se conectará a una red wifi automáticamente. si no se conecta a la red, el test fallará.'
          }
          onEnterPressed={handleTestStart}
        />
      ) : (
        <div className="min-h-screen grid place-items-center">
          <div className="text-center text-xl">
            <div>
              <p>
                {' '}
                Tratando de iniciar la prueba con la red:{' '}
                <span className="font-semibold">{TARGET}</span>
              </p>
            </div>
            <div>
              Verificando si la red Esta disponible:{' '}
              <span className="font-semibold">{isLoading ? 'Cargando...' : ssid}</span>
            </div>
            <div>
              <p>{isresponse ? 'Iniciando conexión...' : ''}</p>
              <p>{connectionMsg ? <span className="font-semibold">{connectionMsg}</span> : ' '}</p>
              <p>
                {pingLoading ? 'Iniciando ping a google...' : <span>Ping: {pingResponse}</span>}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
