/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useDrag } from 'react-dnd'
export default function DragableBox({ name, id, placeHolder }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Box',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <div
      className="flex justify-center text-white items-center w-[9rem] h-[4.2rem]  rounded-lg bg-[#395fab]"
      ref={placeHolder?.length === 1 ? undefined : drag}
      style={{ border: isDragging ? '3px solid pink' : '0px' }}
    >
      {name}
    </div>
  )
}
