const Intro = ({ next }) => {
  return (
    <div className="flex-vertical">
      <h1>Memory Game</h1>
      <button onClick={next}>Play</button>
      <button>Sounds</button>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        Read Tech Article
      </a>
    </div>
  )
}

export default Intro
