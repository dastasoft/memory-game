import { useCallback, useEffect, useState } from 'react'

import { Card as TCard, Deck } from '@/types'

import Card from '../Card'
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

export default function Game({ selectedDeck }: Props) {
  const [gameState, setGameState] = useState(GameStates.LOADING)
  const [deck, setDeck] = useState<Deck>([])
  const [cardSelectedOne, setCardSelectedOne] = useState<TCard | null>(null)
  const [cardSelectedTwo, setCardSelectedTwo] = useState<TCard | null>(null)
  const [turns, setTurns] = useState(0)

  const initDeck = useCallback(() => {
    return [...selectedDeck, ...selectedDeck]
      .sort(() => Math.random() - 0.5)
      .map((card: any) => ({ ...card, id: Math.random(), matched: false }))
  }, [selectedDeck])

  const initGame = useCallback(() => {
    setDeck(initDeck())
    setCardSelectedOne(null)
    setCardSelectedTwo(null)
    setTurns(0)
    setGameState(GameStates.IDLE)
  }, [initDeck])

  const completePhase = () => {
    setTimeout(() => {
      setCardSelectedOne(null)
      setCardSelectedTwo(null)
      setTurns((prevTurns: number) => prevTurns + 1)
      setGameState(GameStates.IDLE)
    }, 1000)
  }

  const handleSelection = (card: any) =>
    cardSelectedOne ? setCardSelectedTwo(card) : setCardSelectedOne(card)

  const checkSelection = useCallback(() => {
    if (cardSelectedOne && cardSelectedTwo) {
      setGameState(GameStates.LOADING)
      if (isSameCard(cardSelectedOne, cardSelectedTwo)) {
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

  if (gameState === GameStates.COMPLETED) {
    return <div>Completed</div>
  }

  return (
    <div className={styles.App}>
      <button onClick={initGame}>Reset</button>
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
      <p>Turns: {turns}</p>
    </div>
  )
}
