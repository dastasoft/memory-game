/* eslint-disable no-nested-ternary */
import { Dispatch, SetStateAction, useEffect } from 'react'

type TimerProps = {
  remainingTime: number
  setRemainingTime: Dispatch<SetStateAction<number>>
  onEndAction: () => void
}

const Timer: React.FC<TimerProps> = ({
  remainingTime,
  setRemainingTime,
  onEndAction,
}) => {
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1)
      }
      if (remainingTime === 0) {
        clearInterval(myInterval)
        onEndAction()
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <div>
      Time left:{' '}
      {remainingTime === 0
        ? 0
        : remainingTime < 10
        ? `0${remainingTime}`
        : remainingTime}
      s
    </div>
  )
}

export default Timer
