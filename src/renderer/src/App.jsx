/* eslint-disable prettier/prettier */
import Lvl from './components/Lvl'
import { useState } from 'react'
export default function App() {
  let starter_Boxes = 256
  let lvl_choose = 3
  const [colorBox, setColorBox] = useState(Array(starter_Boxes).fill('#395fab'))
  const isDone = colorBox.every((value) => value === '#44ae52')

  if (isDone) {
    return <div>Yay</div>
  }

  function onClick(index) {
    // Creamos una copia del array de colores
    const newColors = [...colorBox]
    // Cambiamos el color de la box específica
    newColors[index] = '#44ae52'
    // Actualizamos el estado con el nuevo array de colores
    setColorBox(newColors)
  }

  return <Lvl colorBox={colorBox} onClick={onClick} lvl={lvl_choose} />
}
