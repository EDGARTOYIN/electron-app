/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useDrop } from 'react-dnd'
import DragableBox from './DragableBox'
export default function DropZone({ listaDrop, boxList, updateDropZoneList, pos }) {
  const addBoxToList = (id) => {
    const UnitBox = boxList.find((item) => item.id === id)
    updateDropZoneList(UnitBox)
  }

  const boxPos = {
    1: 'row-start-1 col-start-2 justify-self-center',
    2: 'row-start-2 col-start-1 self-center',
    3: 'row-start-2 col-start-3 self-center justify-self-end',
    4: 'row-start-3 col-start-2 self-end justify-self-center'
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Box',
    drop: (item) => addBoxToList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))
  return (
    <div
      className={`border border-dashed flex justify-center ${boxPos[pos]} items-center rounded-lg relative bg-green-400 w-[160px] h-[75px] py-1`}
      ref={drop}
    >
      {listaDrop.length > 0 ? (
        listaDrop.map((item, index) => {
          return <DragableBox key={index} name={item.name} id={item.id}></DragableBox>
        })
      ) : (
        <p className="text-white">Drop Here</p>
      )}
    </div>
  )
}
