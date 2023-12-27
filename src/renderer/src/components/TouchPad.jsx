/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import TypeOfTestMessage from './TypeOfTestMessage'
import { CLICK_AMOUT } from '../utilities/constants'
import ManualRepeat from './ManualRepeat'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragableBox from './DragableBox'
import DropZone from './DropZone'

export default function TouchPad() {
  // const [leftClick, setLeftClick] = useState(0)
  // const [rightClick, setRightClick] = useState(0)
  const [boxList, setBoxList] = useState([
    { id: 1, name: 'Box1' },
    { id: 2, name: 'Box2' },
    { id: 3, name: 'Box3' },
    { id: 4, name: 'Box4' }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [inst, setInst] = useState(true)

  // function handleRigthClick(event) {
  //   event.preventDefault()
  //   if (rightClick < CLICK_AMOUT) setRightClick(rightClick + 1)
  // }

  // function handleLeftClick() {
  //   if (leftClick < CLICK_AMOUT) setLeftClick(leftClick + 1)
  // }

  function updateDropZoneList(box) {
    setBoxList((oldBoxes) => oldBoxes.filter((item) => item.id !== box.id))
  }

  function redoTest() {
    setIsModalOpen(false)
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
          message="Arraste una caja a cada posicion disponible con el TouchPad"
          onEnterPressed={handleEnterPressed}
        />
      ) : !isModalOpen ? (
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-3 grid-rows-3 h-screen p-3">
            <div
              className="col-star-2 row-start-2 grid justify-self-center self-center grid-cols-[8rem_8rem] grid-rows-[3rem_3rem] gap-5
            "
            >
              {boxList.map((item) => {
                return <DragableBox key={item.id} name={item.name} id={item.id}></DragableBox>
              })}
            </div>
            <DropZone
              boxList={boxList}
              updateDropZoneList={(box) => updateDropZoneList(box)}
              pos={1}
            ></DropZone>
            <DropZone
              boxList={boxList}
              updateDropZoneList={(box) => updateDropZoneList(box)}
              pos={2}
            ></DropZone>
            <DropZone
              boxList={boxList}
              updateDropZoneList={(box) => updateDropZoneList(box)}
              pos={3}
            ></DropZone>
            <DropZone
              boxList={boxList}
              updateDropZoneList={(box) => updateDropZoneList(box)}
              pos={4}
            ></DropZone>
          </div>
        </DndProvider>
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
