/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import Box from './Box'

export default function Lvl({ colorBox, onClick }) {
  // Establecer el valor de la variable CSS
  document.documentElement.style.setProperty('--num-columns', 16)

  const handleTouch = (e) => {
    const touches = e.changedTouches
    if (touches && touches.length > 0) {
      const touchX = touches[0].clientX
      const touchY = touches[0].clientY

      // Obtener el elemento en el que se encuentra el toque
      const element = document.elementFromPoint(touchX, touchY)

      // Obtener el índice del elemento si es una caja
      const index = Array.from(e.currentTarget.children).indexOf(element)

      if (index !== -1) {
        onClick(index)
      }
    }
  }

  return (
    <div
      className={`grid-container h-screen`}
      onTouchMove={(e) => handleTouch(e)}
      onTouchStart={(e) => handleTouch(e)}
    >
      <>
        {colorBox.map((color, index) => (
          <Box styleBox={color} key={index} />
        ))}
      </>
    </div>
  )
}
