import { useEffect, useState } from 'react'
export default function useCountDown() {
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return

    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1)
    }, 1000)

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
