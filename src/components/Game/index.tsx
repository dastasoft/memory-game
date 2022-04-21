import { useCallback, useEffect, useState } from 'react'

import { Card as TCard, Deck } from '@/types'

import Card from '../Card'
import Timer from '../Timer'
import styles from './Game.module.css'

enum GameStates {
  LOADING,
  IDLE,
  COMPLETED,
}

const checkWinCondition = (deck: Deck) => deck.every((card) => card.matched)
const isSameCard = (cardOne: TCard, cardTwo: TCard) =>
  cardOne.imageURL === cardTwo.imageURL

type Props = {
  selectedDeck: Deck
}

const initialTimeInSeconds = 10

export default function Game({ selectedDeck }: Props) {
  const [gameState, setGameState] = useState(GameStates.LOADING)
  const [deck, setDeck] = useState<Deck>([])
  const [cardSelectedOne, setCardSelectedOne] = useState<TCard | null>(null)
  const [cardSelectedTwo, setCardSelectedTwo] = useState<TCard | null>(null)
  const [matches, setMatches] = useState(0)
  const [remainingTime, setRemainingTime] = useState(initialTimeInSeconds)

  const initDeck = useCallback(() => {
    return [...selectedDeck, ...selectedDeck]
      .sort(() => Math.random() - 0.5)
      .map((card: any) => ({ ...card, id: Math.random(), matched: false }))
  }, [selectedDeck])

  const initGame = useCallback(() => {
    setDeck(initDeck())
    setCardSelectedOne(null)
    setCardSelectedTwo(null)
    setMatches(0)
    setRemainingTime(initialTimeInSeconds)
    setGameState(GameStates.IDLE)
  }, [initDeck])

  const completePhase = () => {
    setTimeout(() => {
      setCardSelectedOne(null)
      setCardSelectedTwo(null)
      setGameState(GameStates.IDLE)
    }, 1000)
  }

  const handleSelection = (card: any) =>
    cardSelectedOne ? setCardSelectedTwo(card) : setCardSelectedOne(card)

  const checkSelection = useCallback(() => {
    if (cardSelectedOne && cardSelectedTwo) {
      setGameState(GameStates.LOADING)
      if (isSameCard(cardSelectedOne, cardSelectedTwo)) {
        setMatches((prevValue) => prevValue + 1)
        setDeck((prevCards) =>
          prevCards.map((card) =>
            isSameCard(card, cardSelectedOne)
              ? { ...card, matched: true }
              : card
          )
        )
      }

      completePhase()
    }
  }, [cardSelectedOne, cardSelectedTwo])

  useEffect(() => {
    if (gameState === GameStates.IDLE && checkWinCondition(deck))
      setTimeout(() => setGameState(GameStates.COMPLETED), 1000)
  }, [deck, gameState])

  useEffect(() => {
    checkSelection()
  }, [checkSelection])

  useEffect(() => {
    initGame()
  }, [initGame])

  const EndScreenButtons = () => {
    return (
      <div className="flex-vertical">
        <button onClick={initGame}>Try again</button>
        <button>Change Difficulty</button>
        <button>Change Deck</button>
      </div>
    )
  }

  if (gameState === GameStates.COMPLETED) {
    if (matches === deck.length / 2) {
      return (
        <div>
          <h2>Completed in {initialTimeInSeconds - remainingTime}s</h2>
          <EndScreenButtons />
        </div>
      )
    }

    return (
      <div>
        <h2>Time out!</h2>
        <p>{matches} accomplished</p>
        <EndScreenButtons />
      </div>
    )
  }

  return (
    <div className={styles.App}>
      <div>
        <div>Matches: {matches}</div>
        <button>Sound Icon</button>
        <button onClick={initGame}>Reset</button>
      </div>
      <div className={styles['card-grid']}>
        {deck.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleSelection={handleSelection}
            flipped={Boolean(
              card === cardSelectedOne ||
                card === cardSelectedTwo ||
                card.matched
            )}
            disabled={gameState !== GameStates.IDLE}
          />
        ))}
      </div>
      <Timer
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onEndAction={() => setGameState(GameStates.COMPLETED)}
      />
    </div>
  )
}
