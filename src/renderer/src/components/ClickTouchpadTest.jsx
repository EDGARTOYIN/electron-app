/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
export default function ClickTouchpadTest({ left, right, handleClick, handleContextMenu }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-10 items-center ">
        <h1 className="text-xl font-semibold" style={{ userSelect: 'none' }}>
          Presione 5 veces cada boton
        </h1>
        <div className="flex gap-4">
          <motion.div
            className="rounded-b-lg font-semibold text-xl text-white w-[12rem] p-4"
            style={{ backgroundColor: '#395fab', userSelect: 'none' }}
            whileHover={{ scale: 1.1 }}
            onClick={handleClick}
          >
            Click Izq ({left})
          </motion.div>
          <motion.div
            className="rounded-b-lg font-semibold text-xl text-white w-[12rem] p-4"
            style={{ backgroundColor: '#395fab', userSelect: 'none' }}
            whileHover={{ scale: 1.1 }}
            onContextMenu={handleContextMenu}
          >
            Click Derecho ({right})
          </motion.div>
        </div>
      </div>
    </div>
  )
}
