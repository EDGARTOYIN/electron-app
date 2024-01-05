/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react'
import Button from './Button'
import TypeOfTestMessage from './TypeOfTestMessage'

export default function WebCamTest({ onTestComplete }) {
  const [isGuideLinesOpen, setIsGuideLinesOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [stream, setStream] = useState(null)

  const videoRef = useRef(null)

  function startCamera() {
    setIsLoading(true)
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        setStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setIsLoading(false)
        }
      })
      .catch(function () {
        onTestComplete(false)
        setIsLoading(false)
      })
  }

  function handleClickPass() {
    onTestComplete(true)
  }

  function handleClickFail() {
    onTestComplete(false)
  }

  function handleGuideLines() {
    setIsGuideLinesOpen(false)
    startCamera()
  }

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return (
    <>
      {isGuideLinesOpen ? (
        <TypeOfTestMessage
          typeTest={'Camara Test'}
          message={'Se inicializara la camara encuanto presine el boton'}
          onEnterPressed={handleGuideLines}
        />
      ) : (
        <div className="min-h-screen grid place-items-center">
          <div className="flex flex-col items-center ">
            <video
              className={`w-3/4 h-2/4 block ${isLoading ? 'hidden' : ''}`}
              ref={videoRef}
              autoPlay
              playsInline
            ></video>
            {isLoading && <p>Cargando...</p>}
            <div className="flex gap-3 mt-8">
              <Button
                type="primary"
                message={'Paso el test'}
                handleClick={() => handleClickPass()}
              />
              <Button
                type="secondary"
                message={'No paso el test'}
                handleClick={() => handleClickFail()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
