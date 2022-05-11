import { useState } from 'react'

import type { NextPage } from 'next'

import Game from '@/components/Game'
import Intro from '@/components/Intro'
import SelectDeck from '@/components/SelectDeck'
import SelectDifficulty, { Difficulties } from '@/components/SelectDifficulty'
import { Deck } from '@/types'
import { DECKS } from '@/utils/Decks'

const UIStates = {
  IntroScreen: 0,
  DifficultyScreen: 1,
  DeckScreen: 2,
  GameScreen: 3,
} as const

const Home: NextPage = () => {
  const [UIState, setUIState] = useState<number>(UIStates.IntroScreen)
  const [deck, setDeck] = useState<Deck>(DECKS['Dragon Ball'])
  const [difficulty, setDifficulty] = useState(Difficulties.Normal)

  return (
    <div>
      {UIState === UIStates.IntroScreen && (
        <Intro next={() => setUIState(UIStates.DifficultyScreen)} />
      )}
      {UIState === UIStates.DifficultyScreen && (
        <SelectDifficulty
          next={() => setUIState(UIStates.DeckScreen)}
          setDifficulty={setDifficulty}
        />
      )}
      {UIState === UIStates.DeckScreen && (
        <SelectDeck
          next={() => setUIState(UIStates.GameScreen)}
          setDeck={(deckName: string) => setDeck(DECKS[deckName])}
        />
      )}
      {UIState === UIStates.GameScreen && (
        <Game
          selectedDeck={deck.slice(0, difficulty)}
          backToDifficulty={() => setUIState(UIStates.DifficultyScreen)}
          backToDeck={() => setUIState(UIStates.DeckScreen)}
        />
      )}
    </div>
  )
}

export default Home
