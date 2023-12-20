/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
export default function OutputLogTest({ testResults }) {
  return (
    <div>
      {testResults.map((test, index) => {
        return (
          <h1 key={index}>
            {test.testName} de prueba resultado:{String(test.result)}
          </h1>
        )
      })}
    </div>
  )
}
