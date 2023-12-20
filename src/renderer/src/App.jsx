/* eslint-disable prettier/prettier */
import TouchTest from './components/TouchTest'
import { useEffect, useState } from 'react'
export default function App() {
  // Estado para mantener el historial de resultados de los tests
  const [testResults, setTestResults] = useState([])

  // Función para agregar un resultado de test al historial
  const addTestResult = (testName, isPassed) => {
    setTestResults([...testResults, { testName, isPassed }])
  }

  useEffect(() => {
    console.log(testResults)
  }, [testResults])

  return (
    <TouchTest
      testName="Primer Test"
      onTestComplete={(isPassed) => addTestResult('Primer Test', isPassed)}
    />
  )
}
