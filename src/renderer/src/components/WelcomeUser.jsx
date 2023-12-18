/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { motion } from 'framer-motion'
const WelcomeUser = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      className="text-2xl h-screen text-center grid place-content-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>Bienvenido al Test</div>
      <p>Por favor, siga las instrucciones.</p>
    </motion.div>
  )
}

export default WelcomeUser
