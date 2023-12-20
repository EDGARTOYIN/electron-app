/* eslint-disable prettier/prettier */

const colors = ['red', 'green', 'blue']
export default function DeadPixelTest() {
  const [currentColor, setCurrentColor] = useState(0)

  function handlePress(e) {
    if (e.type === 'enter') {
      setCurrentColor(currentColor + 1)
    }
  }

  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundColor: colors[currentColor] }}
      onKeyDown={handlePress()}
    ></div>
  )
}
