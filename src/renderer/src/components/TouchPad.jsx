/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'
import { CLICK_AMOUT } from '../utilities/constants'
import ManualRepeat from './ManualRepeat'
export default function TouchPad() {
  const [leftClick, setLeftClick] = useState(0)
  const [rightClick, setRightClick] = useState(0)
  const [middleClick, setMiddleClick] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inst, setInst] = useState(true)

  useEffect(() => {
    let suma = rightClick + leftClick + middleClick
    if (suma === 105) setIsModalOpen(true)
  }, [leftClick, rightClick, middleClick])

  function handleMiddleClick() {
    if (middleClick < CLICK_AMOUT) setMiddleClick(middleClick + 1)
  }

  function handleRigthClick(event) {
    event.preventDefault()
    if (rightClick < CLICK_AMOUT) setRightClick(rightClick + 1)
  }

  function handleLeftClick() {
    if (leftClick < CLICK_AMOUT) setLeftClick(leftClick + 1)
  }

  function redoTest() {
    setIsModalOpen(false)
    setMiddleClick(0)
    setRightClick(0)
    setLeftClick(0)
  }

  function handleEnterPressed() {
    setInst(false)
  }

  return (
    <>
      {inst ? (
        <TypeOfTestMessage
          typeTest="Test de TouchPad"
          message="Presione los botones correspondientes hasta la cantidad maxima y verifique funcionan adecuadamente"
          onEnterPressed={handleEnterPressed}
        />
      ) : !isModalOpen ? (
        <div className="grid place-items-center h-screen">
          <div className="grid grid-cols-[200px_200px] gap-5">
            <div
              onClick={handleMiddleClick}
              className="bg-gray-200 col-span-2 p-32 text-center rounded-t-xl"
              style={{ userSelect: 'none' }}
            >
              Click ({middleClick})
            </div>
            <div
              onClick={handleLeftClick}
              className="bg-gray-200 p-5 text-center rounded-b-xl"
              style={{ userSelect: 'none' }}
            >
              Click ({leftClick})
            </div>
            <div
              onContextMenu={handleRigthClick}
              className="bg-gray-200 p-5 text-center rounded-b-xl"
              style={{ userSelect: 'none' }}
            >
              Click ({rightClick})
            </div>
          </div>
        </div>
      ) : (
        <ManualRepeat
          mensaje={'Se ha presionado cada boton'}
          onRepeat={() => redoTest()}
          onNext={() => onTestComplete(false)}
          onPass={() => onTestComplete(true)}
        />
      )}
    </>
  )
}
