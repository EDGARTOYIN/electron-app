/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'

export default function AudioTest() {
  const [videoPath, setVideoPath] = useState(null)
  const [outputDevices, setOutputDevices] = useState([])
  const [currentOutput, setCurrentOutput] = useState(null)

  function getOutputAudioDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log('enumerateDevices() not supported.')
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          // Filter audio output devices
          const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput')
          // Update the state with the list of output devices
          setOutputDevices(audioOutputDevices)

          if (audioOutputDevices.length > 0) {
            setCurrentOutput(audioOutputDevices[0].deviceId) // Colocamos el primer dispositivo como el output principal
          } else {
            setCurrentOutput('No primary audio output device found.')
          }
        })
        .catch((err) => {
          setCurrentOutput(`${err.name}: ${err.message}`)
        })
    }
  }

  useEffect(() => {
    // Obtener la ruta relativa del archivo usando import.meta.url
    const currentScriptPath = new URL(import.meta.url).pathname
    const file = `.${currentScriptPath}/../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4`
    getOutputAudioDevices()

    // Actualizar el estado con la ruta del video
    setVideoPath(file)
  }, [currentOutput, outputDevices])

  // Function to handle changes in the selected output device
  const handleOutputChange = (deviceId) => {
    setCurrentOutput(deviceId)
    const videoElement = document.querySelector('video')
    videoElement
      .setSinkId(deviceId)
      .then(() => {
        console.log(`Audio output set to device: ${deviceId}`)
      })
      .catch((error) => {
        console.error(`Error setting audio output: ${error}`)
      })
  }

  return (
    <div className="h-screen grid grid-cols-2 max-w-[70rem] place-items-center mx-auto gap-5">
      {videoPath && (
        <video autoPlay width="600" className="block">
          <source src={`animation:///${videoPath}`} type="video/mp4" />
        </video>
      )}
      <div>
        <p>Available Output Devices:</p>
        <select onChange={(e) => handleOutputChange(e.target.value)} value={currentOutput}>
          {outputDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
