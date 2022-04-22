import { useState } from 'react'

import type { NextPage } from 'next'

import Game from '@/components/Game'
import Intro from '@/components/Intro'
import SelectDeck from '@/components/SelectDeck'
import SelectDifficulty, { Difficulties } from '@/components/SelectDifficulty'
import { Deck } from '@/types'
import { DECKS } from '@/utils/Decks'

enum UIStates {
  IntroScreen,
  DifficultyScreen,
  DeckScreen,
  GameScreen,
}

const Home: NextPage = () => {
  const [UIState, setUIState] = useState(UIStates.IntroScreen)
  const [deck, setDeck] = useState<Deck>(DECKS['Dragon Ball'])
  const [difficulty, setDifficulty] = useState(Difficulties.Normal)

  switch (UIState) {
    case UIStates.IntroScreen:
      return <Intro next={() => setUIState(UIStates.DifficultyScreen)} />
    case UIStates.DifficultyScreen:
      return (
        <SelectDifficulty
          next={() => setUIState(UIStates.DeckScreen)}
          setDifficulty={setDifficulty}
        />
      )
    case UIStates.DeckScreen:
      return (
        <SelectDeck
          next={() => setUIState(UIStates.GameScreen)}
          setDeck={(deckName: string) => setDeck(DECKS[deckName])}
        />
      )
    case UIStates.GameScreen:
      return (
        <Game
          selectedDeck={deck.slice(0, difficulty)}
          backToDifficulty={() => setUIState(UIStates.DifficultyScreen)}
          backToDeck={() => setUIState(UIStates.DeckScreen)}
        />
      )
    default:
      return <Intro next={() => setUIState(UIStates.DifficultyScreen)} />
  }
}

export default Home
