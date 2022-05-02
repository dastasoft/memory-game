import { useState } from 'react'

import { AnimatePresence } from 'framer-motion'
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
  const [difficulty, setDifficulty] = useState(Difficulties.Easy)

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
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
      </AnimatePresence>
    </div>
  )
}

export default Home
