import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Die from './components/Die';
import './App.css'

export default function App() {
  const allNewDice = () => {
    const allDice = [];

    for (let i = 0; i < 10; i++) {
      allDice.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      )
    }
    return allDice;
  }

  const rollDice = () => {
    setDice(prevDice => (
      prevDice.map(die => (
        die.isHeld === false ?
        { ...die, value: Math.ceil(Math.random() * 6)} :
        die
      ))
    ))
  }

  const holdDice = (id) => {
    setDice(prevDice => (
      prevDice.map(die => (
        die.id === id ?
        { ...die, isHeld: !die.isHeld} :
        die
      ))
    ))
  }

  const setNewGame = () => {
    setDice(allNewDice())
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const firstValue = dice[0].value
    if (
      dice.every(die => die.isHeld === true) &&
      dice.every(die => die.value === firstValue)
      ) {
      setTenzies(true)
      console.log("Drop Confetti")
    }
  }, [dice])

  console.log(tenzies)
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      isHeld={die.isHeld}
      className='single--die'
      value={die.value}
      handleHoldDie={() => holdDice(die.id)}
    />
  ))

  return (
    <>
      <div className='dark--background'>
        <div className='white--square'>
          <div className='dice--container'>
            { diceElements }
          </div>
          <button
            type='button'
            onClick={tenzies === true ? setNewGame : rollDice}
          >
            {tenzies === true ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </>
  )
}
