import { useState, useEffect } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'
import { getFilePath } from '../utilities/utilityFunctions'
import useCountDown from './useCountDown'
import ModalHeadPhones from './ModalHeadPhones'
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
    // Set up event listener for device changes

    const file = getFilePath(
      '../../preload/The Weeknd - Save Your Tears (Official Music Video).mp4'
    )
    setVideoPath(file)

    getDefaultOutAudio()
    navigator.mediaDevices.ondevicechange = getDefaultOutAudio
    return () => {
      navigator.mediaDevices.ondevicechange = null
    }
  }, [])

  async function getDefaultOutAudio() {
    const output = await getOutputAudioDevices()
    setMainOutput(output)
  }

  // The first timer for the headphones test
  useEffect(() => {
    if (secondsLeft === 0 && !isGuideVisible) {
      setDevice('Speakers')
    }
    console.log(secondsLeft)
  }, [secondsLeft])

  useEffect(() => {
    if (mainOutput) {
      console.log(mainOutput)
      console.log(device)
      if (!mainOutput.includes(device)) {
        setIsModalVisible(true)
      } else {
        setIsModalVisible(false)
        setIsGuideVisible(true)
      }
    }
  }, [mainOutput, device])

  async function getOutputAudioDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput')
      const deviceType = audioOutputDevices.find((type) => type.label.includes('Default'))
      return deviceType.label
    } catch (err) {
      return `${err.name}: ${err.message}`
    }
  }

  function modalToRender() {
    if (isModalVisible) {
      return <ModalHeadPhones title={'pontelos'} />
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
