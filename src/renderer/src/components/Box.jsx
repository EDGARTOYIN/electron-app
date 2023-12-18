/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { motion } from 'framer-motion'
export default function Box({ styleBox, clickBox }) {
  return (
    <motion.div
      className="shadow-xl p-1"
      initial={{ opacity: 0, scale: 0.5 }} // Animación inicial para la aparición
      animate={{ backgroundColor: styleBox, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }} // Duración de la transición
      onClick={clickBox}
    ></motion.div>
  )
}
