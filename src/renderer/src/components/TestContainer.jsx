/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
export default function TestContainer({ TestComponent, onTestComplete }) {
  return (
    <>
      <TestComponent onTestComplete={onTestComplete} />
    </>
  )
}
