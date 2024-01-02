/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import ModalHeadPhones from './ModalHeadPhones'
import TypeOfTestMessage from './TypeOfTestMessage'
import useCountDown from './useCountDown'

const SPARE_TIME = 15
export default function AudioTest() {
  const [videoPath, setVideoPath] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guideLines, setGuideLines] = useState(true)
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para el indicador de carga
  const [chances, setChances] = useState(3)

  const { secondsLeft, start, stop } = useCountDown(() => {
    console.log('Countdown finished!')
  })

  useEffect(() => {
    const currentScriptPath = new URL(import.meta.url).pathname
    const file = `.${currentScriptPath}/../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4`
    setVideoPath(file)
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [])

  const handleDeviceChange = () => {
    resetTest()
  }

  function resetTest() {
    stop()
    setGuideLines(true)
    setIsModalOpen(false)
    setChances((prev) => prev - 1)
    navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
  }

  function StartSpeakersTest() {
    setGuideLines(true)
    setIsModalOpen(false)
  }

  useEffect(() => {
    console.log(secondsLeft)
  }, [secondsLeft])

  const handleContinuarClick = async () => {
    setIsLoading(true) // Iniciar el indicador de carga
    if (await verifyAudioDevice()) {
      setGuideLines(false)
      start(SPARE_TIME)
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    } else {
      setGuideLines(false)
      setIsModalOpen(true)
      navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    }
    setIsLoading(false) // Detener el indicador de carga
  }

  async function verifyAudioDevice() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter((device) => device.kind === 'audiooutput')
      const headphonePresent = audioDevices.some(
        (device_1) =>
          device_1.label.toLowerCase().includes('headphones') && device_1.label.includes('Default')
      )
      console.log('headphonePresent', headphonePresent)
      return headphonePresent
    } catch (err) {
      return false
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="font-semibold text-xl min-h-screen grid place-items-center">
          Cargando...
        </div> // Pantalla de carga
      ) : guideLines ? (
        <TypeOfTestMessage
          typeTest="Audio Test"
          message={
            'Escuche atentamente el audio con los audiculares, no los desconecte hasta que se le indique'
          }
          tryAgain={chances}
          onEnterPressed={handleContinuarClick}
        />
      ) : isModalOpen ? (
        <ModalHeadPhones title={'No puede iniciar la prueba sin Audífonos'} />
      ) : (
        <div className="h-screen grid max-w-[70rem] place-items-center mx-auto gap-5">
          {videoPath && (
            <video autoPlay width="600" className="block">
              <source src={`animation:///${videoPath}`} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </>
  )
}
