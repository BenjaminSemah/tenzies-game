import React, { useState } from 'react'
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

  const [dice, setDice] = useState(allNewDice())

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      isHeld={die.isHeld}
      className='single--die'
      value={die.value}
    />
  ))

  return (
    <>
      <div className='dark--background'>
        <div className='white--square'>
          <div className='dice--container'>
            { diceElements }
          </div>
        </div>
      </div>
    </>
  )
}
