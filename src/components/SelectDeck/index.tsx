import { DECKS } from '@/utils/Decks'

const SelectDeck = ({ next, setDeck }) => {
  const handleSelect = (e) => {
    setDeck(e.target.value)
    next()
  }
  return (
    <div>
      <h2>Select Deck</h2>
      <div className="flex-vertical">
        {Object.keys(DECKS).map((theme: string) => (
          <button key={theme} onClick={handleSelect} value={theme}>
            {theme}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectDeck
