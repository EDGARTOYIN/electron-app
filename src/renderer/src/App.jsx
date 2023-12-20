/* eslint-disable prettier/prettier */
import TouchTest from './components/TouchTest'
import { useEffect, useState } from 'react'
import TestContainer from './components/TestContainer'
import OutputLogTest from './components/OutputLogTest'

// Tests Actuales
const tests = [{ testName: 'Touch Test', TestComponent: TouchTest }]

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
    // <TouchTest
    //   testName="Primer Test"
    //   onTestComplete={(isPassed) => addTestResult('Primer Test', isPassed)}
    // />
  )
}
