/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import Lvl from './Lvl'
import TypeOfTestMessage from './TypeOfTestMessage'
import { useState, useEffect } from 'react'
import { TOTAL_BOXES, COLOR_START, COLOR_END } from '../utilities/constants'
import useCountDown from './useCountDown'

const SPARE_TIME = 30 //segundos

export default function TouchTest({ testName, onTestComplete }) {
  const [colorBox, setColorBox] = useState(Array(TOTAL_BOXES).fill(COLOR_START))
  const [isDone, setIsDone] = useState(false)
  const [isLvlVisible, setIsLvlVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Nuevo: Usa el hook useCountDown
  const { secondsLeft, start } = useCountDown()

  useEffect(() => {
    setIsDone(colorBox.every((value) => value === COLOR_END))
    if (isDone) {
      onTestComplete(isDone)
    }
  }, [colorBox])

  useEffect(() => {
    if (secondsLeft === 0 && isLvlVisible) {
      // Muestra el modal cuando el contador llega a cero y eL nivel se ve y El nivel no ha sido terminado
      setIsModalOpen(true)
    }
  }, [secondsLeft, isLvlVisible])

  function onClick(index) {
    const newColors = [...colorBox]
    newColors[index] = COLOR_END
    setColorBox(newColors)
  }

  function handleRepeatTest() {
    // Reiniciar la prueba
    setIsDone(false)
    setIsLvlVisible(false)
    setColorBox(Array(TOTAL_BOXES).fill(COLOR_START))
    setIsModalOpen(false)
  }

  function handleFailed() {
    onTestComplete(isDone)
  }

  function handleEnterPressed() {
    // Este método se llama cuando se presiona Enter en TypeOfTestMessage
    setIsLvlVisible(true)
    start(SPARE_TIME) // Inicia el contador con 10 segundos
  }

  return (
    <>
      {!isLvlVisible ? (
        <TypeOfTestMessage
          typeTest="Test de Touch"
          message="Cambie de color todas las cajas tocando la pantalla hasta que todas tengan el mismo color"
          onEnterPressed={handleEnterPressed}
        />
      ) : (
        <Lvl
          colorBox={colorBox}
          onClick={onClick}
          isModalOpen={isModalOpen}
          onRepeat={() => handleRepeatTest()}
          onFailed={() => handleFailed()}
        />
      )}
    </>
  )
}
