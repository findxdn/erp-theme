/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'

// eslint-disable-next-line react/function-component-definition
const IcDropDown = (props: { onClick: any; }) => {
  const { onClick } = props;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 6H22" stroke="#010101" strokeLinecap="round" />
        <path d="M6 10H22" stroke="#010101" strokeLinecap="round" />
        <path d="M10 14L22 14" stroke="#010101" strokeLinecap="round" />
        <path d="M14 18L22 18" stroke="#010101" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default IcDropDown
