import React from 'react'

export default function Die(props) {
  const diceStyles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white'
  }

  return (
    <>
      <div
        className='single--die'
        style={diceStyles}
        onClick={props.handleHoldDie}
      >
      {props.value}
      </div>
    </>
  )
}
