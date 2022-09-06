import Die from './components/Die'
import React from 'react'

// unique string ID generator for JavaScript
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

// after 'npm install react-confetti'
import Confetti from 'react-confetti'


function App() {
  // initial state diceNumbers with (allNewDice())
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  // initial state tenzies represents whether the user has won the game yet or not
  const [tenzies, setTenzies] = React.useState(false)

  // initial state Total Wins
  const [count, setCount] = React.useState(0)

  // initial screen
  const [introScreen, setIntroScreen] = React.useState(true)

  // effect that runs every time the `dice` state array changes
  // checks if all dice are held, and all dice have the same value
  React.useEffect(() => {
    const allDiceHeld = diceNumbers.every(diceNumber => diceNumber.isHeld)
    const firstPositionValue = diceNumbers[0].value
    const allSameValue = diceNumbers.every(diceNumber => diceNumber.value === firstPositionValue)
    if (allDiceHeld && allSameValue) {
      setTenzies(true)
    }
  }, [diceNumbers])

  // effect that runs every time the `tenzies` state change and add 1 point
  React.useEffect(() => {
    tenzies ? setCount(prevCount => prevCount + 1) : count
  }, [tenzies])

  // function to change intro screen
  function changeIntroScreen() {
    setIntroScreen(false)
  }

  // function for generating new dice as object
  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  // it generates and returns ten random numbers as objects(generateNewDice())
  function allNewDice() {
    let randomNumbers = []
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(generateNewDice())
    }
    return randomNumbers
  }

  // function that takes `id` as a parameter
  // to flip the`isHeld` property on the object in the array that was clicked, based on the 'id'prop passed into the function
  function holdDice(id) {
    setDiceNumbers(prevDiceNumbers =>
      prevDiceNumbers.map(diceNumber =>
        diceNumber.id === id ? { ...diceNumber, isHeld: !diceNumber.isHeld } : diceNumber
      ))
  }

  // if tenzies is false ->
  // function for checking if diceNumber.isHeld, else it generates new dice
  // if tenzies is true -> change setTenzies and setDiceNumbers
  function rollDice() {
    if (!tenzies) {
      setDiceNumbers(prevDiceNumbers =>
        prevDiceNumbers.map(diceNumber =>
          diceNumber.isHeld ? diceNumber : generateNewDice()
        ))
    } else {
      setTenzies(false)
      setDiceNumbers(allNewDice())
    }
  }

  // create diceNumbersElements from Die components
  const diceNumbersElements = diceNumbers.map(diceNumber => <Die key={diceNumber.id} id={diceNumber.id} value={diceNumber.value} isHeld={diceNumber.isHeld} holdDice={holdDice} />)

  return (
    <main>
      {/* if introscreen is false -> render game */}
      {!introScreen ?
        <div>
          <h1>Tenzies</h1>
          {tenzies && <Confetti width={499} height={499} />}
          <p className='game-description'>Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
            {diceNumbersElements}
          </div>
          <h3>Total Wins: {count}</h3>
          <button id='my-button' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
        :
        // if introscreen is true render introscreen and button with function for change state
        <div className="intro-screen">
          <button className="play-game" onClick={changeIntroScreen}>Play Game</button>
        </div>}
    </main>
  )
}

export default App
