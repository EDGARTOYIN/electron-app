/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { motion } from 'framer-motion'
export default function Box({ styleBox }) {
  return <motion.div className="shadow-xl p-1" animate={{ backgroundColor: styleBox }}></motion.div>
}
