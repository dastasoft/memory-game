import { DECKS } from '@/utils/Decks'

import Button from '../ListedButton'

type Props = {
  next: () => void
  setDeck: (deckName: string) => void
}

const SelectDeck: React.FC<Props> = ({ next, setDeck }) => {
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
          <div key={theme}>
            <Button onClick={handleSelect} value={theme}>
              {theme}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectDeck
