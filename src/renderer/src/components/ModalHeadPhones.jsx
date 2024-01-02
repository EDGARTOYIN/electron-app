/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { IconContext } from 'react-icons/lib'
import { FaHeadphonesAlt } from 'react-icons/fa'
import { PiSpeakerSimpleHighFill } from 'react-icons/pi'

export default function RepeatTest() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex backdrop-blur-sm items-center justify-center">
      <div className="rounded-lg bg-white py-6  w-3/5 max-w-[30rem] shadow-lg">
        <div className="flex flex-col items-center">
          <div className="pb-2">
            <IconContext.Provider value={{ size: '43px' }}>
              <FaHeadphonesAlt />
            </IconContext.Provider>
          </div>
          <h1 className="font-semibold text-xl">Prueba de Audiculares</h1>
          <div className="text-center text-[#90949b]">
            <p>No se detectaron auriculares conectados</p>
            <p>Conecte unos audiculares en el puerto para reiniciar la prueba</p>
          </div>
          <div
            className="flex gap-3 mt-5
          "
          ></div>
        </div>
      </div>
    </div>
  )
}
