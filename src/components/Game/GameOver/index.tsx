import ListedButton from '@/components/ListedButton'

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
        <div>
          <ListedButton onClick={initGame}>Try again</ListedButton>
        </div>
        <div>
          <ListedButton onClick={backToDifficulty}>
            Change Difficulty
          </ListedButton>
        </div>
        <div>
          <ListedButton onClick={backToDeck}>Change Deck</ListedButton>
        </div>
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
