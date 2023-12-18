/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import Box from './Box'

export default function Lvl({ colorBox, onClick, lvl }) {
  const LvlVariants = {
    1: 'grid-cols-3',
    2: 'grid-cols-6'
  }
  return (
    <div className={`grid ${LvlVariants[lvl]} gap-5 h-screen`}>
      <>
        {colorBox.map((color, index) => (
          <Box styleBox={color} key={index} clickBox={() => onClick(index)} />
        ))}
      </>
    </div>
  )
}
