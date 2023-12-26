/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { IconContext } from 'react-icons/lib'
import { PiWarning } from 'react-icons/pi'

export default function RepeatTest({ title, mensaje, onRepeat, onNext, onPass }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex backdrop-blur-sm items-center justify-center">
      <div className="rounded-lg bg-white py-6  w-3/5 max-w-[30rem] shadow-lg">
        <div className="flex flex-col items-center">
          <div className="pb-2">
            <IconContext.Provider value={{ size: '43px' }}>
              <PiWarning />
            </IconContext.Provider>
          </div>
          <h1 className="font-semibold text-xl">{title}</h1>
          <div className="text-center text-[#90949b]">
            <p>{mensaje}</p>
            <p>¿Desea repetir el test de nuevo?</p>
          </div>
          <div
            className="flex gap-3 mt-5
          "
          >
            <button
              className="bg-[#4f46e5] py-1 px-10 font-semibold
             text-white rounded-sm hover:bg-blue-500"
              onClick={onRepeat}
            >
              Repetir Test
            </button>
            <button
              className="font-semibold border rounded-sm hover:bg-slate-100 border-[#90949b] py-1 px-10"
              onClick={onNext}
            >
              No paso el test
            </button>
          </div>
          <button
            onClick={onPass}
            className="font-semibold rounded-sm mt-2 py-1 px-10 bg-green-500 hover:bg-green-400 text-white"
          >
            Paso el test
          </button>
        </div>
      </div>
    </div>
  )
}
