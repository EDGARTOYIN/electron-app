/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { useDrag } from 'react-dnd'
export default function DragableBox({ name, id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Box',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <div
      className="flex justify-center items-center rounded-lg bg-indigo-500"
      ref={drag}
      style={{ border: isDragging ? '2px solid pink' : '0px' }}
    >
      {name}
    </div>
  )
}
