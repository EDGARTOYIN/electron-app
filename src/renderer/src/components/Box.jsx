/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { motion } from 'framer-motion'

export default function Box({ styleBox }) {
  return <motion.div style={{ backgroundColor: styleBox }}></motion.div>
}
