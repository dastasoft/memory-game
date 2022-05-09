import { useState, useCallback, useEffect } from 'react'

import { Card, Deck } from '@/types'

export const GameStates = {
  LOADING: 0,
  ANIMATION: 1,
  IDLE: 2,
  COMPLETED: 3,
} as const

const INITIAL_TIME_IN_SECONDS = 60
const DELAY_TIME = 1000

const checkWinCondition = (deck: Deck) => deck.every((card) => card.matched)

const isSameCard = (cardOne: Card, cardTwo: Card) =>
  cardOne.imageURL === cardTwo.imageURL

const initBoard = (deck: Deck): Deck =>
  [...deck, ...deck]
    .sort(() => Math.random() - 0.5)
    .map((card: any) => ({ ...card, id: Math.random(), matched: false }))

export default function useMemoryGame(
  selectedDeck: Deck,
  startAnimation: Function
) {
  const [gameState, setGameState] = useState<number>(GameStates.LOADING)
  const [deck, setDeck] = useState<Deck>(initBoard(selectedDeck))
  const [cardSelectedOne, setCardSelectedOne] = useState<Card | null>(null)
  const [cardSelectedTwo, setCardSelectedTwo] = useState<Card | null>(null)
  const [matches, setMatches] = useState(0)
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIME_IN_SECONDS)
  const [isTimerActive, setIsTimerActive] = useState(false)

  const initGame = useCallback(() => {
    setDeck(initBoard(selectedDeck))
    setCardSelectedOne(null)
    setCardSelectedTwo(null)
    setMatches(0)
    setRemainingTime(INITIAL_TIME_IN_SECONDS)
    setGameState(GameStates.IDLE)
    startAnimation()
  }, [selectedDeck, startAnimation])

  const completePhase = () => {
    setTimeout(() => {
      setCardSelectedOne(null)
      setCardSelectedTwo(null)
      setGameState(GameStates.IDLE)
    }, DELAY_TIME)
  }

  const completeGame = () => {
    setTimeout(() => setGameState(GameStates.COMPLETED), DELAY_TIME)
  }

  const handleSelection = (card: any) =>
    cardSelectedOne && cardSelectedOne.id !== card.id
      ? setCardSelectedTwo(card)
      : setCardSelectedOne(card)

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

  const onAnimationStart = () => {
    setGameState(GameStates.ANIMATION)
    setIsTimerActive(false)
  }

  const onAnimationComplete = () => {
    setGameState(GameStates.IDLE)
    setIsTimerActive(true)
  }

  const onTimerEnd = () => {
    setGameState(GameStates.COMPLETED)
  }

  useEffect(() => {
    if (gameState === GameStates.IDLE && checkWinCondition(deck)) completeGame()
  }, [deck, gameState])

  useEffect(() => {
    checkSelection()
  }, [checkSelection])

  return {
    cardSelectedOne,
    cardSelectedTwo,
    deck,
    gameState,
    handleSelection,
    initGame,
    INITIAL_TIME_IN_SECONDS,
    isTimerActive,
    matches,
    onAnimationComplete,
    onAnimationStart,
    onTimerEnd,
    remainingTime,
    setRemainingTime,
  }
}
