/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
export default function TypeOfTestMessage({ typeTest, message }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }
  return (
    <motion.div
      className="text-2xl h-screen gap-2 text-center grid place-content-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-5xl text-teal-400">{typeTest}</h1>
      <p>{message}</p>
    </motion.div>
  )
}
