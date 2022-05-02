import { motion, useAnimation } from 'framer-motion'

import useMemoryGame, { GameStates } from '@/hooks/useMemoryGame'
import { Deck } from '@/types'

import Timer from '../Timer'
import Board from './Board'
import styles from './Game.module.css'
import { containerVariants } from './Game.variants'
import GameOver from './GameOver'

type GameProps = {
  selectedDeck: Deck
  backToDifficulty: () => void
  backToDeck: () => void
}

const Game: React.FC<GameProps> = ({
  selectedDeck,
  backToDifficulty,
  backToDeck,
}) => {
  const controls = useAnimation()
  const {
    cardSelectedOne,
    cardSelectedTwo,
    deck,
    gameState,
    handleSelection,
    initGame,
    initialTimeInSeconds,
    isTimerActive,
    matches,
    onAnimationComplete,
    onAnimationStart,
    onTimerEnd,
    remainingTime,
    setRemainingTime,
  } = useMemoryGame(selectedDeck, () => controls.start('visible'))

  if (gameState === GameStates.COMPLETED) {
    return (
      <GameOver
        initGame={initGame}
        backToDifficulty={backToDifficulty}
        backToDeck={backToDeck}
        isWin={matches === deck.length / 2}
        completedTime={initialTimeInSeconds - remainingTime}
        matches={matches}
      />
    )
  }

  return (
    <motion.div
      className={styles.Game}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.Header}>
        <div>Matches: {matches}</div>
        <button onClick={initGame}>Reset</button>
      </div>
      <Board
        deck={deck}
        handleSelection={handleSelection}
        flippedCards={[cardSelectedOne, cardSelectedTwo]}
        disabled={gameState !== GameStates.IDLE}
        controls={controls}
        onAnimationStart={onAnimationStart}
        onAnimationComplete={onAnimationComplete}
      />
      {isTimerActive && (
        <Timer
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          onEndAction={onTimerEnd}
        />
      )}
    </motion.div>
  )
}

export default Game
