/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
export default function OutputLogTest({ testResults }) {
  return (
    <div>
      {testResults.map((test, index) => {
        return (
          <h1 key={index} className="m-4 text-xl">
            <span className="font-semibold">{test.testName}</span>:
            <span className="pl-2">{String(test.result)}</span>
          </h1>
        )
      })}
    </div>
  )
}
