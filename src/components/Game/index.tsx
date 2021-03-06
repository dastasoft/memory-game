import { motion, useAnimation } from 'framer-motion'

import useMemoryGame, { GameStates } from '@/hooks/useMemoryGame'
import { Deck } from '@/types'

import Timer from '../Timer'
import Board from './Board'
import styles from './Game.module.css'
import { containerVariants, resetVariants } from './Game.variants'
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
  const resetButton = useAnimation()
  const {
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
  } = useMemoryGame(selectedDeck, () => controls.start('visible'))

  if (gameState === GameStates.COMPLETED) {
    return (
      <GameOver
        initGame={initGame}
        backToDifficulty={backToDifficulty}
        backToDeck={backToDeck}
        isWin={matches === deck.length / 2}
        completedTime={INITIAL_TIME_IN_SECONDS - remainingTime}
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
    >
      <div className={styles.Header}>
        <div>Matches: {matches}</div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={initGame}
          className={styles.Reset}
          onHoverStart={() => resetButton.start('hover')}
        >
          <motion.path
            animate={resetButton}
            variants={resetVariants}
            d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z"
          />
        </motion.svg>
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
