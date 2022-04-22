import { Dispatch, SetStateAction } from 'react'

/* eslint-disable no-restricted-globals */
export const Difficulties = {
  Easy: 3,
  Normal: 6,
}

const SelectDifficulty = ({
  next,
  setDifficulty,
}: {
  next: () => void
  setDifficulty: Dispatch<SetStateAction<number>>
}) => {
  const handleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDifficulty(Number(event.currentTarget.value))
    next()
  }

  return (
    <div>
      <h2>Select difficulty</h2>
      <div className="flex-vertical stack">
        {Object.entries(Difficulties).map(([key, value]) => (
          <button key={key} onClick={handleSelect} value={value}>
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectDifficulty
