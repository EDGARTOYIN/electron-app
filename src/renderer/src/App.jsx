/* eslint-disable prettier/prettier */
import TouchTest from './components/TouchTest'
import DeadPixelTest from './components/DeadPixelTest'
import { useEffect, useState } from 'react'
import TestContainer from './components/TestContainer'
import OutputLogTest from './components/OutputLogTest'
import TouchPad from './components/TouchPad'
import AudioTest from './components/AudioTest'
import KeyBoardTest from './components/keyBoardLayouts/KeyBoardTest'
import WebCamTest from './components/WebCamTest'
// Tests Actuales
const tests = [
  // { testName: 'Touch Screen', TestComponent: TouchTest },
  // { testName: 'Pixel Dead', TestComponent: DeadPixelTest },
  // { testName: 'Touch Pad', TestComponent: TouchPad },
  // { testName: 'Audio Test', TestComponent: AudioTest },
  // { testName: 'KeyBoard Test', TestComponent: KeyBoardTest },
  { testName: 'WebCam Test', TestComponent: WebCamTest }
]

export default function App() {
  // Estado para mantener el historial de resultados de los tests
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [testResults, setTestResults] = useState([])

  // Función para agregar un resultado de test al historial
  const addTestResult = (isPassed) => {
    setTestResults([
      ...testResults,
      { testName: tests[currentTestIndex].testName, result: isPassed }
    ])

    // Avanza al siguiente test
    setCurrentTestIndex(currentTestIndex + 1)
  }

  return (
    <>
      {currentTestIndex < tests.length ? (
        <TestContainer
          TestComponent={tests[currentTestIndex].TestComponent}
          onTestComplete={(isPassed) => addTestResult(isPassed)}
        />
      ) : (
        <OutputLogTest testResults={testResults} />
      )}
    </>
  )
}
