import Die from './components/Die'
import React from 'react'



function App() {

  //initial allNewDice()
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())

  // it generates and returns ten random numbers
  function allNewDice() {
    let randomNumbers = []

    for (let i = 0; i < 10; i++) {
      const randomNumber = Math.floor(Math.random() * 6 + 1)
      randomNumbers.push(randomNumber)
    }
    return randomNumbers
  }


  // function for generate a new array of numbers and set the `dice` state to that new array
  function rollDice() {
    setDiceNumbers(allNewDice())
  }

  
  // create diceNumbersElements from Die components
  const diceNumbersElements = diceNumbers.map(diceNumber => <Die value={diceNumber} />)

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
