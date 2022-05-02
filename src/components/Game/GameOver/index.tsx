type GameOverProps = {
  initGame: () => void
  backToDifficulty: () => void
  backToDeck: () => void
  isWin: boolean
  completedTime: number
  matches: number
}

const GameOver: React.FC<GameOverProps> = ({
  initGame,
  backToDifficulty,
  backToDeck,
  isWin,
  completedTime,
  matches,
}) => {
  const Buttons = () => {
    return (
      <div className="flex-vertical stack">
        <button onClick={initGame}>Try again</button>
        <button onClick={backToDifficulty}>Change Difficulty</button>
        <button onClick={backToDeck}>Change Deck</button>
      </div>
    )
  }

  return (
    <div>
      {isWin ? (
        <h2>Completed in {completedTime}s</h2>
      ) : (
        <>
          <h2>Time out!</h2>
          <h3>{matches} accomplished</h3>
        </>
      )}

      <Buttons />
    </div>
  )
}

export default GameOver
