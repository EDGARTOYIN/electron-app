/* eslint-disable prettier/prettier */
import Lvl from './components/Lvl'
import WelcomeUser from './components/WelcomeUser'
import TypeOfTestMessage from './components/TypeOfTestMessage'
import { useState, useEffect } from 'react'
export default function App() {
  const TOTAL_BOXES = 256
  const COLOR_START = '#395fab'
  const COLOR_END = '#44ae52'
  const [colorBox, setColorBox] = useState(Array(TOTAL_BOXES).fill(COLOR_START))
  const [showWelcome, setShowWelcome] = useState(true)
  const [showInstructions, setShowInstructions] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const transitionTimer = setTimeout(
      () => {
        if (showWelcome) {
          setShowWelcome(false)
          setShowInstructions(true)
        } else if (showInstructions) {
          setShowInstructions(false)
        }
      },
      showWelcome ? 3000 : showInstructions ? 4000 : 0
    )

    return () => clearTimeout(transitionTimer)
  }, [showWelcome, showInstructions])

  useEffect(() => {
    setIsDone(colorBox.every((value) => value === COLOR_END))
  }, [colorBox])

  function onClick(index) {
    // Creamos una copia del array de colores
    const newColors = [...colorBox]
    // Cambiamos el color de la box específica
    newColors[index] = '#44ae52'
    // Actualizamos el estado con el nuevo array de colores
    setColorBox(newColors)
  }

  return (
    <>
      {showWelcome && <WelcomeUser />}{' '}
      {showInstructions && (
        <TypeOfTestMessage
          typeTest={'Touch Test'}
          message={'Porfavor cambie de color todas las cajas usando el Touch Screen'}
        />
      )}
      {!showWelcome && !showInstructions && !isDone && (
        <Lvl colorBox={colorBox} onClick={onClick} />
      )}
    </>
  )
}
