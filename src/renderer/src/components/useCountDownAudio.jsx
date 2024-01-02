/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
export default function useCountDown(callback) {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const timeout = setTimeout(() => {
      if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1)
    }, 1000)

    if (secondsLeft === 0) {
      callback()
      return
    }

    return () => clearTimeout(timeout)
  }, [secondsLeft, isActive])

  function start(seconds) {
    setSecondsLeft(seconds)
    setIsActive(true)
  }

  function stop() {
    setIsActive(false)
  }

  return { secondsLeft, start, stop }
}
