/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { IconContext } from 'react-icons/lib'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { PiSpeakerSimpleHighFill } from 'react-icons/pi'

export default function RepeatTest({ onNext }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex backdrop-blur-sm items-center justify-center">
      <div className="rounded-lg bg-white py-6  w-4/5 max-w-[36rem] shadow-lg">
        <div className="flex flex-col items-center gap-1">
          <div className="pb-2">
            <IconContext.Provider value={{ size: '43px' }}>
              <FaHeadphonesAlt />
            </IconContext.Provider>
          </div>
          <h1 className="font-semibold text-xl">Prueba de Audiculares</h1>
          <div className="text-center text-[#90949b]">
            <p>No se detectaron auriculares conectados</p>
            <p>Conecte unos audiculares en el puerto para reiniciar la prueba</p>
            <p>Si despues de conectar los audifonos no se quito el modal presione el boton:</p>
          </div>
          <div>
            <button
              className="font-semibold border rounded-sm hover:bg-slate-100 border-[#90949b] py-1 px-10 mt-2"
              onClick={onNext}
            >
              No paso el test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
