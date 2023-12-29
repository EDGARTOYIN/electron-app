/* eslint-disable prettier/prettier */
import TouchTest from './components/TouchTest'
import DeadPixelTest from './components/DeadPixelTest'
import { useEffect, useState } from 'react'
import TestContainer from './components/TestContainer'
import OutputLogTest from './components/OutputLogTest'
import TouchPad from './components/TouchPad'
import AudioTest from './components/AudioTest'

// Tests Actuales
const tests = [
  { testName: 'Pantalla Tactil', TestComponent: TouchTest },
  { testName: 'Pixeles Muertos', TestComponent: DeadPixelTest },
  { testName: 'Pad Tactil', TestComponent: TouchPad },
  { testName: 'Sonido', TestComponent: AudioTest }
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

  useEffect(() => {
    console.log(testResults)
  }, [testResults])

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
