import { useCallback, useEffect, useState } from 'react'

import { motion, useAnimation } from 'framer-motion'

import { Card as TCard, Deck } from '@/types'

import Card from '../Card'
import { Difficulties } from '../SelectDifficulty'
import Timer from '../Timer'
import styles from './Game.module.css'

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  exit: {
    x: '-100vh',
    transition: { ease: 'easeInOut' },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
    x: `-${Math.floor(Math.random() * (500 - 100 + 1) + 100)}vw`,
    y: `-${Math.floor(Math.random() * (500 - 100 + 1) + 100)}vw`,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
}

enum GameStates {
  LOADING,
  ANIMATION,
  IDLE,
  COMPLETED,
}

const checkWinCondition = (deck: Deck) => deck.every((card) => card.matched)
const isSameCard = (cardOne: TCard, cardTwo: TCard) =>
  cardOne.imageURL === cardTwo.imageURL

type Props = {
  selectedDeck: Deck
  backToDifficulty: () => void
  backToDeck: () => void
}

const initialTimeInSeconds = 500

export default function Game({
  selectedDeck,
  backToDifficulty,
  backToDeck,
}: Props) {
  const [gameState, setGameState] = useState(GameStates.LOADING)
  const [deck, setDeck] = useState<Deck>(
    [...selectedDeck, ...selectedDeck]
      .sort(() => Math.random() - 0.5)
      .map((card: any) => ({ ...card, id: Math.random(), matched: false }))
  )
  const [cardSelectedOne, setCardSelectedOne] = useState<TCard | null>(null)
  const [cardSelectedTwo, setCardSelectedTwo] = useState<TCard | null>(null)
  const [matches, setMatches] = useState(0)
  const [remainingTime, setRemainingTime] = useState(initialTimeInSeconds)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const controls = useAnimation()

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
    controls.start('visible')
  }, [controls, initDeck])

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
    controls.start('visible')
  }, [controls])

  const EndScreenButtons = () => {
    return (
      <div className="flex-vertical stack">
        <button onClick={initGame}>Try again</button>
        <button onClick={backToDifficulty}>Change Difficulty</button>
        <button onClick={backToDeck}>Change Deck</button>
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
        <h3>{matches} accomplished</h3>
        <EndScreenButtons />
      </div>
    )
  }

  return (
    <motion.div
      className={styles.Game}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      exit="exit"
      onAnimationStart={() => {
        setGameState(GameStates.ANIMATION)
        setIsTimerActive(false)
      }}
      onAnimationComplete={() => {
        setGameState(GameStates.IDLE)
        setIsTimerActive(true)
      }}
    >
      <div className={styles.Header}>
        <div>Matches: {matches}</div>
        <button onClick={initGame}>Reset</button>
      </div>
      <div
        className={
          styles[
            deck.length / 2 === Difficulties.Normal
              ? 'card-grid'
              : 'small-card-grid'
          ]
        }
      >
        {deck.map((card) => (
          <motion.div key={card.id} variants={childVariants}>
            <Card
              card={card}
              handleSelection={handleSelection}
              flipped={Boolean(
                card === cardSelectedOne ||
                  card === cardSelectedTwo ||
                  card.matched
              )}
              disabled={gameState !== GameStates.IDLE}
            />
          </motion.div>
        ))}
      </div>
      {isTimerActive && (
        <Timer
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          onEndAction={() => setGameState(GameStates.COMPLETED)}
        />
      )}
    </motion.div>
  )
}
