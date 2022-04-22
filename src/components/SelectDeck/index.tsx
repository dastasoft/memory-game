import { DECKS } from '@/utils/Decks'

const SelectDeck = ({
  next,
  setDeck,
}: {
  next: () => void
  setDeck: (deckName: string) => void
}) => {
  const handleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDeck(event.currentTarget.value)
    next()
  }

  return (
    <div>
      <h2>Select Deck</h2>
      <div className="flex-vertical stack">
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
