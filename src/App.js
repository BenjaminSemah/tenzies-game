import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
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
    setTenzies(false)
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollsCount, setRollsCount] = useState(0)

  const countNumberOfRolls = () => {
    setRollsCount(prevCount => prevCount + 1)
  }

  const handleBtnClick = () => {
    // tenzies === true ? setNewGame() : rollDice()
    if (tenzies === true) {
      setNewGame()
    } else {
      rollDice()
    }
    countNumberOfRolls()
  }

  useEffect(() => {
    const firstValue = dice[0].value
    if (
      dice.every(die => die.isHeld === true) &&
      dice.every(die => die.value === firstValue)
      ) {
      setTenzies(true)
    }
  }, [dice])

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
        {tenzies && <Confetti />}
        <div className='white--square'>
          <div className='tenzies--text'>
            <h1 className='tenzies--title'>Tenzies</h1>
            <p className='tenzies--desc'>
              Roll until all dice are the same.
              Click each die to freeze it at its
              current value between rolls.
            </p>
          </div>
          <div className='dice--container'>
            { diceElements }
          </div>
          <button
            className='game--btn'
            type='button'
            onClick={handleBtnClick}
          >
            {tenzies === false ? "Roll" : "New Game"}
          </button>
        </div>
      </div>
      <p className='rolls--tracker'>
        Number of Rolls:
        <span className='rolls--num'> {rollsCount} </span>
      </p>
    </>
  )
}
