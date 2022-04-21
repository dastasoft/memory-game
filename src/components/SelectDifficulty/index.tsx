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
      <div>
        {Object.keys(Difficulties).map((difficulty: string) => (
          <p key={difficulty} onClick={handleSelect}>
            {difficulty}
          </p>
        ))}
      </div>
    </div>
  )
}

export default SelectDifficulty
