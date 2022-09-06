import Die from './components/Die'
import React from 'react'

// unique string ID generator for JavaScript
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'


function App() {
  // initial state diceNumbers with (allNewDice())
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  // initial state tenzies represents whether the user has won the game yet or not
  const [tenzies, setTenzies] = React.useState(false)

  // effect that runs every time the `dice` state array changes
  // checks if all dice are held, and all dice have the same value
  React.useEffect(() => {
    const allDiceHeld = diceNumbers.every(diceNumber => diceNumber.isHeld)
    const firstPositionValue = diceNumbers[0].value
    const allSameValue = diceNumbers.every(diceNumber => diceNumber.value === firstPositionValue)
    if (allDiceHeld && allSameValue) {
      console.log('You won')
    }
  }, [diceNumbers])

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

  // function for checking if diceNumber.isHeld, else it generates new dice
  function rollDice() {
    setDiceNumbers(prevDiceNumbers =>
      prevDiceNumbers.map(diceNumber =>
        diceNumber.isHeld ? diceNumber : generateNewDice()
      ))
  }

  // create diceNumbersElements from Die components
  const diceNumbersElements = diceNumbers.map(diceNumber => <Die key={diceNumber.id} id={diceNumber.id} value={diceNumber.value} isHeld={diceNumber.isHeld} holdDice={holdDice} />)

  return (
    <main>
      <div className='dice-container'>
        {diceNumbersElements}
      </div>
      <button id='my-button' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
