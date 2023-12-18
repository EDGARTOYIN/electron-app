/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import Box from './Box'

export default function Lvl({ colorBox, onClick }) {
  return (
    <div className="grid grid-cols-3 gap-5 h-screen">
      <>
        {colorBox.map((color, index) => (
          <Box styleBox={color} key={index} clickBox={() => onClick(index)} />
        ))}
      </>
    </div>
  )
}
