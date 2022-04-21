/* eslint-disable no-restricted-globals */
export enum Difficulties {
  Easy = 2,
  Normal = 4,
  Hard = 6,
}
const SelectDifficulty = ({ next, setDifficulty }) => {
  const handleSelect = (e) => {
    setDifficulty(e.target.value)
    next()
  }

  return (
    <div>
      <h2>Select difficulty</h2>
      <div className="flex-vertical">
        {Object.entries(Difficulties)
          .filter(([_key, value]) => isNaN(value))
          .map(([key, value]) => (
            <button key={key} onClick={handleSelect} value={key}>
              {value}
            </button>
          ))}
      </div>
    </div>
  )
}

export default SelectDifficulty
