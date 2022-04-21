import { Card } from '@/types'

const DB_CARDS: Card[] = [
  { imageURL: '/images/dragon-ball/freezer.png' },
  { imageURL: '/images/dragon-ball/gohan.png' },
  { imageURL: '/images/dragon-ball/goku-black.png' },
  { imageURL: '/images/dragon-ball/goku.png' },
  { imageURL: '/images/dragon-ball/jiren.png' },
  { imageURL: '/images/dragon-ball/vegeta.png' },
]

export const DECKS = {
  'Dragon Ball': DB_CARDS,
}

const SelectDeck = ({ next, setDeck }) => {
  const handleSelect = (e) => {
    setDeck(e.target.value)
    next()
  }
  return (
    <div>
      <h2>Select theme</h2>
      {Object.keys(DECKS).map((theme: string) => (
        <p key={theme} onClick={handleSelect}>
          {theme}
        </p>
      ))}
    </div>
  )
}

export default SelectDeck
