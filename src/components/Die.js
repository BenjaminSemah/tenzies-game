import React from 'react'

export default function Die(props) {
  const diceStyles = {
    backgroundColor: props.isHeld ? 'green' : 'white'
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
