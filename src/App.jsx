import Die from './components/Die'
import React from 'react'

// unique string ID generator for JavaScript
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'


function App() {

  //initial allNewDice()
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  // it generates and returns ten random numbers
  function allNewDice() {
    let randomNumbers = []

    for (let i = 0; i < 10; i++) {
      const randomNumber = {
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid()
      }
      randomNumbers.push(randomNumber)
    }
    return randomNumbers
  }

  // function that takes `id` as a parameter
  // to pass that function down to each instance of the Die component so when each one is clicked, it logs its own unique ID property
  function holdDice(id) {
    console.log(id)
  }

  // function for generate a new array of numbers and set the `dice` state to that new array
  function rollDice() {
    setDiceNumbers(allNewDice())
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
