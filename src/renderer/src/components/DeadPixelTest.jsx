/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import ManualRepeat from './ManualRepeat'
import TypeOfTestMessage from './TypeOfTestMessage'
const COLORS = ['#ff0000', '#0000ff', '#01ff00', '#ffff00', '#ff00ff', '#01ffff']
export default function DeadPixelTest({ onTestComplete }) {
  const [currentColor, setCurrentColor] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (currentColor === COLORS.length) {
      setIsModalOpen(true)
    }
  }, [currentColor])

  function handlePress() {
    setCurrentColor(currentColor + 1)
  }

  function redoTest() {
    setIsModalOpen(false)
    setCurrentColor(0)
  }

  function handlep() {
    setIsOpen(true)
  }

  return (
    <>
      {!isOpen ? (
        <TypeOfTestMessage
          typeTest={'Pixel Test'}
          onEnterPressed={handlep}
          message={
            'Revise cuidadosamente los pixeles, presione con el mouse o pantalla para ver el siguiente color'
          }
        />
      ) : !isModalOpen ? (
        <div
          className="w-screen h-screen"
          style={{ backgroundColor: COLORS[currentColor] }}
          onClick={handlePress}
        ></div>
      ) : (
        <ManualRepeat
          mensaje={'Se han probado todos los colores'}
          onRepeat={() => redoTest()}
          onNext={() => onTestComplete(false)}
          onPass={() => onTestComplete(true)}
        />
      )}
    </>
  )
}
