const Intro = ({ next }: { next: () => void }) => {
  return (
    <div className="flex-vertical">
      <h1>Memory Game</h1>
      <button onClick={next}>Play</button>
    </div>
  )
}

export default Intro
