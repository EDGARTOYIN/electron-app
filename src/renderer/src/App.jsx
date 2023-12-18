import Lvl from './components/Lvl'
import { useState } from 'react'
export default function App() {
  let starter_Boxes = 9
  const [colorBox, setColorBox] = useState(Array(starter_Boxes).fill('#FF8080'))
  const isDone = colorBox.every((value) => value === '#FFDBA4')

  if (isDone) {
    return <div>Yay</div>
  }
  function onClick(index) {
    // Creamos una copia del array de colores
    const newColors = [...colorBox]
    // Cambiamos el color de la box específica
    newColors[index] = '#FFDBA4'
    // Actualizamos el estado con el nuevo array de colores
    setColorBox(newColors)
  }

  return <Lvl colorBox={colorBox} onClick={onClick} />
}
