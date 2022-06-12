import React from 'react'

export default function Die(props) {
  return (
    <>
      <div
        className='single--die'
      >
      {props.value}
      </div>
    </>
  )
}
