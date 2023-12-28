/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import ModalHeadPhones from './ModalHeadPhones'
import TypeOfTestMessage from './TypeOfTestMessage'
import useCountDown from './useCountDown'

const SPARE_TIME = 15
export default function AudioTest() {
  const [videoPath, setVideoPath] = useState(null)
  const [outputDevices, setOutputDevices] = useState([])
  const [defaultDevice, setDefaultDevice] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(null)
  const [guideLines, setGuideLines] = useState(true)
  const [deviceTesting, setDeviceTesting] = useState('Headphones')

  const { secondsLeft, start } = useCountDown()

  useEffect(() => {
    const currentScriptPath = new URL(import.meta.url).pathname
    const file = `.${currentScriptPath}/../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4`
    navigator.mediaDevices.addEventListener('devicechange', getOutputAudioDevices)

    getOutputAudioDevices()
    setVideoPath(file)

    // Clean up the event listener when the component is unmounted
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getOutputAudioDevices)
    }
  }, [])

  function getOutputAudioDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      // Handle unsupported case
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput')
          const deviceType = audioOutputDevices.find((type) => type.label.includes('Default'))
          setDefaultDevice([deviceType])
          setOutputDevices(audioOutputDevices)

          // Update modal status
          setIsModalOpen(!deviceType?.label.includes(deviceTesting))
        })
        .catch((err) => {
          setCurrentOutput(`${err.name}: ${err.message}`)
        })
    }
  }

  function handleEnterPressed() {
    // Este método se llama cuando se presiona Enter en TypeOfTestMessage
    setGuideLines(false)
    start(SPARE_TIME) // Inicia el contador con 10 segundos
  }

  return (
    <>
      {guideLines ? (
        <TypeOfTestMessage
          typeTest="Audio Test"
          message={
            'Escuche atentamente el audio con los audiculares, no los desconecte hasta que se le indique'
          }
          onEnterPressed={handleEnterPressed}
        />
      ) : (
        <div className="h-screen grid grid-cols-2 max-w-[70rem] place-items-center mx-auto gap-5">
          {videoPath && (
            <video autoPlay width="600" className="block">
              <source src={`animation:///${videoPath}`} type="video/mp4" />
            </video>
          )}
          <div>
            {defaultDevice.map((item, index) => (
              <h1 className="font-semibold" key={index}>
                {item.label}
              </h1>
            ))}
          </div>
          {isModalOpen ? <ModalHeadPhones title={'Audio Test'} /> : null}
          {secondsLeft}
        </div>
      )}
    </>
  )
}
