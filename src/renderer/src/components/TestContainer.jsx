/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
export default function TestContainer({ TestComponent, onTestComplete }) {
  // la prop testComponent es un Componente
  return (
    <>
      <TestComponent onTestComplete={onTestComplete} />
    </>
  )
}
