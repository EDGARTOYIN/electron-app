import Lvl from './Lvl'
import TypeOfTestMessage from './TypeOfTestMessage'
import { useState, useEffect } from 'react'
import { TOTAL_BOXES, COLOR_START, COLOR_END } from '../utilities/constants'
import useCountDown from './useCountDown'

const SPARE_TIME = 2 //segundos

export default function TouchTest() {
  const [colorBox, setColorBox] = useState(Array(TOTAL_BOXES).fill(COLOR_START))
  const [isDone, setIsDone] = useState(false)
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLvlVisible, setIsLvlVisible] = useState(false)

  // // Nuevo: Usa el hook useCountDown
  // const { secondsLeft, start } = useCountDown()

  useEffect(() => {
    setIsDone(colorBox.every((value) => value === COLOR_END))
  }, [colorBox])

  // useEffect(() => {
  //   if (secondsLeft === 0) {
  //     setIsModalOpen(true)
  //   }
  // }, [secondsLeft])

  function onClick(index) {
    const newColors = [...colorBox]
    newColors[index] = COLOR_END
    setColorBox(newColors)
  }

  function handleEnterPressed() {
    // Este método se llama cuando se presiona Enter en TypeOfTestMessage
    setIsLvlVisible(true)
    start(SPARE_TIME) // Inicia el contador con 10 segundos
  }

  return (
    <>
      <TypeOfTestMessage
        typeTest={'Touch Test'}
        message={
          'Cambie de color todas las cajas tocando la pantalla hasta que todas tengan el mismo color'
        }
        onEnterPressed={handleEnterPressed}
      />
      {isLvlVisible && !isDone && (
        <Lvl colorBox={colorBox} onClick={onClick} isModalOpen={isModalOpen} />
      )}
    </>
  )
}
