import { Dispatch, SetStateAction } from 'react'

import Button from '../ListedButton'

export const Difficulties = {
  Easy: 3,
  Normal: 6,
}

type SelectDifficultyProps = {
  next: () => void
  setDifficulty: Dispatch<SetStateAction<number>>
}

const SelectDifficulty: React.FC<SelectDifficultyProps> = ({
  next,
  setDifficulty,
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
          <div key={key}>
            <Button onClick={handleSelect} value={value.toString()}>
              {key}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectDifficulty
