/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'
import { CLICK_AMOUT } from '../utilities/constants'
import ClickTouchpadTest from './ClickTouchpadTest'
import DragDrop from './DragDrop'
import useCountDown from './useCountDown'
import RepeatTest from './RepeatTest'
const TOTAL_CLICKS = 10
const SPARE_TIME = 15 //segundos

export default function TouchPad({ onTestComplete }) {
  const [leftClick, setLeftClick] = useState(0)
  const [rightClick, setRightClick] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inst, setInst] = useState(true)
  const [isLvl1Done, setIsLvl1Done] = useState(false)

  const { secondsLeft, start } = useCountDown()

  useEffect(() => {
    if (secondsLeft === 0 && !inst) {
      // Muestra el modal cuando el contador llega a cero
      setIsModalOpen(true)
    }
  }, [secondsLeft, inst, isLvl1Done])

  useEffect(() => {
    // Verificar si la suma de leftClick y rightClick es igual a TOTAL_CLICKS
    if (leftClick + rightClick === TOTAL_CLICKS) {
      setIsLvl1Done(true)
      start(SPARE_TIME)
    }
  }, [leftClick, rightClick])

  function handleRigthClick(event) {
    event.preventDefault()
    if (rightClick < CLICK_AMOUT) setRightClick(rightClick + 1)
  }

  function handleLeftClick() {
    if (leftClick < CLICK_AMOUT) setLeftClick(leftClick + 1)
  }

  function redoTest() {
    setIsModalOpen(false)
    setIsLvl1Done(false)
    setInst(true)
    setRightClick(0)
    setLeftClick(0)
  }

  function handleEnterPressed() {
    start(SPARE_TIME)
    setInst(false)
  }

  function endTest() {
    onTestComplete(true)
  }

  return (
    <>
      {inst ? ( // si las instrucciones estan activas
        <TypeOfTestMessage
          typeTest="Test de TouchPad"
          message="Se hara una prueba de clicks y una prueba de tomar y soltar"
          onEnterPressed={handleEnterPressed}
        />
      ) : !isModalOpen ? ( // si el modal es falso muestra el nivel
        <>
          {!isLvl1Done ? ( // si el nivel ha terminado
            <ClickTouchpadTest
              left={leftClick}
              right={rightClick}
              handleClick={() => handleLeftClick()}
              handleContextMenu={(e) => handleRigthClick(e)}
            />
          ) : (
            // muestra el siguiente
            <DragDrop handleEndTest={() => endTest()} />
          )}
        </>
      ) : (
        // muestra el modal
        <RepeatTest
          mensaje={'Se acabo el tiempo'}
          onRepeat={() => redoTest()}
          onNext={() => onTestComplete(false)}
        />
      )}
    </>
  )
}
