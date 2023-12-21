/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

export default function SystemDisk() {
  const [diskInfo, setDiskInfo] = useState(null)
  const [message, setMessage] = useState([])
  const [error, setError] = useState(null)
  const fetchDiskInfo = () => {
    window.api.diskInfo
      .getDiskInfo()
      .then((data) => {
        setDiskInfo(data)
      })
      .catch((error) => {
        console.error('Error obteniendo información del disco:', error)
      })
  }

  const sendFileToDrives = () => {
    window.api.diskInfo
      .sendFileToDrives()
      .then((response) => {
        setMessage([...message, response])
      })
      .catch((error) => {
        setError(error)
      })
  }

  useEffect(() => {
    fetchDiskInfo()
  }, [message, error])

  return (
    <div className="h-screen grid place-content-center text-center">
      <h2>System Disk Information</h2>
      {diskInfo ? (
        <>
          <button onClick={sendFileToDrives}>Enviar Archivos a Unidades</button>
          <ul>
            {diskInfo.map((disk, index) => (
              <li key={index}>
                <br />
                <strong>Letter</strong> {disk._mounted}
                <br />
                <strong>Device:</strong> {disk._filesystem}
                <br />
                <strong>Total Space:</strong> {disk._blocks}
                <br />
                <strong>Used Space:</strong> {disk._used}
                <br />
                <strong>Available Space:</strong> {disk._available}
              </li>
            ))}
            <p>Respuesta: {message}</p>
          </ul>
        </>
      ) : (
        <p>Loading disk information...</p>
      )}
    </div>
  )
}
