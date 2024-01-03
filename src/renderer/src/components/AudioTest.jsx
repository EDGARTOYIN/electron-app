/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import ModalHeadPhones from './ModalHeadPhones'
import TypeOfTestMessage from './TypeOfTestMessage'
import useCountDownAudio from './useCountDownAudio'
import ManualRepeat from './ManualRepeat'

const SPARE_TIME = 15
const CHANCES = 3
const htest =
  'Inicie la prueba con los audífonos conectados, no los desconecte, escuche atentamente el audio'
export default function AudioTest({ onTestComplete }) {
  const [videoPath, setVideoPath] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guideLines, setGuideLines] = useState(true)
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para el indicador de carga
  const [chances, setChances] = useState(CHANCES)
  const [device, setDevice] = useState('headphones') // Nuevo estado para el dispositivo de audio [headphones
  const [message, setMessage] = useState(htest) // Nuevo estado para el mensaje de audio [headphones
  const [next, setNext] = useState(null)
  const [counter, setCounter] = useState(0)
  const [isManualRepeat, setIsManualRepeat] = useState(false) // Nuevo estado para el indicador de carga
  useEffect(() => {
    const currentScriptPath = new URL(import.meta.url).pathname
    const file = `.${currentScriptPath}/../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4`
    setVideoPath(file)
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [])

  useEffect(() => {
    if (counter === 2) {
      stop()
      setIsManualRepeat(true)
    }
  }, [counter])

  useEffect(() => {
    if (chances === 0) {
      onTestComplete(false)
    }
  }, [chances])

  const { secondsLeft, start, stop } = useCountDownAudio(() => {
    StartSpeakersTest() // Esta funcion se ejecuta cuando el timer llega a 0
  })

  const handleDeviceChange = () => {
    resetTest()
  }

  function resetTest() {
    stop()
    setDevice('headphones')
    setGuideLines(true)
    setIsModalOpen(false)
    setChances(chances - 1)
    navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
  }

  function StartSpeakersTest() {
    setDevice('speaker')
    setIsModalOpen(true) // Se necesita aplicar un re render para que el video use correctamente los speakers
    setIsModalOpen(false) // Se necesita aplicar un re render para que el video use correctamente los speakers
    const video = document.querySelector('video')
    video.setSinkId(next)
    start(SPARE_TIME)
    setCounter((prev) => prev + 1)
  }

  const handleContinuarClick = async () => {
    setIsLoading(true) // Iniciar el indicador de carga
    if (await verifyAudioDevice()) {
      setGuideLines(false)
      start(SPARE_TIME)
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    } else {
      setGuideLines(false)
      setIsModalOpen(true)
      setChances(chances - 1) // si no se inicio la prueba, con audifonos, se resta una oportunidad
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    }
    setIsLoading(false) // Detener el indicador de carga
  }

  async function verifyAudioDevice() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter((device) => device.kind === 'audiooutput')
      const devicePresent = audioDevices.some(
        (device_1) =>
          device_1.label.toLowerCase().includes('headphones') && device_1.label.includes('Default')
      )
      const deviceSpeaker = audioDevices.find((device_1) =>
        device_1.label.toLowerCase().includes('speaker')
      )
      setNext(deviceSpeaker.deviceId)
      return devicePresent
    } catch (err) {
      return false
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="font-semibold text-xl min-h-screen grid place-items-center">
          Cargando...no desconecte los audífonos
        </div> // Pantalla de carga
      ) : guideLines ? (
        <TypeOfTestMessage
          typeTest="Audio Test"
          message={message}
          tryAgain={chances}
          onEnterPressed={handleContinuarClick}
        />
      ) : isManualRepeat ? (
        <ManualRepeat
          title="Test de Audio"
          mensaje="El test de audio terminó, ¿Se escuchó el audio correctamente?"
          onNext={() => onTestComplete(false)}
          onPass={() => onTestComplete(true)}
        /> // Pantalla de repetición manual
      ) : isModalOpen ? (
        <ModalHeadPhones onNext={() => onTestComplete(false)} />
      ) : (
        <div className="h-screen grid max-w-[70rem] place-items-center mx-auto gap-5">
          {videoPath && (
            <video autoPlay width="600" className="block">
              <source src={`animation:///${videoPath}`} type="video/mp4" />
            </video>
          )}
          <p>
            Testeando: {device} {secondsLeft}
          </p>
        </div>
      )}
    </>
  )
}
