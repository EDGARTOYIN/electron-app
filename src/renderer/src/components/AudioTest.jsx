import { useState, useEffect } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'
import VideoPlay from './VideoPlay'
import ModalHeadPhones from './ModalHeadPhones'
import { getFilePath } from '../utilities/utilityFunctions'
import useCountDown from './useCountDown'
import AudioTestContent from './AudioTestContent'
const SPARE_TIME = 15

export default function AudioTest() {
  const [videoPath, setVideoPath] = useState(null)
  const [isGuideVisible, setIsGuideVisible] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [mainOutput, setMainOutput] = useState(null)
  const [device, setDevice] = useState('Headphones')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { secondsLeft, start, stop } = useCountDown()

  useEffect(() => {
    const file = getFilePath(
      '../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4'
    )
    getOutputAudioDevices()
    setVideoPath(file)

    function handleDeviceChange() {
      getOutputAudioDevices()
    }

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [])

  // The first timer for the headphones test
  useEffect(() => {
    if (secondsLeft === 0 && !isGuideVisible) {
      setDevice('Speakers')
    }
    console.log(secondsLeft)
  }, [secondsLeft])

  async function getOutputAudioDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput')
      const deviceType = audioOutputDevices.find((type) => type.label.includes('Default'))
      setMainOutput(deviceType.label)
      if (!deviceType.label.includes(device)) {
        setIsModalVisible(true)
      }
    } catch (err) {
      setMainOutput(`${err.name}: ${err.message}`)
    }
  }

  function modalToRender() {
    // CHECK IF THE CURRENT DEFAULT DEVICE IS THE SAME AS THE TESTING DEVICE, IF NOT SHOW A MODAL.
    if (shouldStop) {
      return <ModalHeadPhones title="Prueba de Audio" />
    } else {
      return (
        <AudioTestContent
          videoPath={videoPath}
          handleVideoLoaded={handleVideoLoaded}
          handleVideoError={handleVideoError}
          isLoading={isLoading}
          isError={isError}
          mainOutput={mainOutput}
          device={device}
        />
      )
    }
  }

  function handleEnterPressed() {
    setIsGuideVisible(false)
    start(SPARE_TIME)
  }

  function handleVideoLoaded() {
    setLoading(false)
  }

  function handleVideoError() {
    setLoading(false)
    setError(true)
  }

  return (
    <>
      {isGuideVisible ? (
        <TypeOfTestMessage
          typeTest="Audio Test"
          message={
            'Escuche atentamente el audio con los audiculares, no los desconecte hasta que se le indique'
          }
          onEnterPressed={handleEnterPressed}
        />
      ) : (
        modalToRender()
      )}
    </>
  )
}
