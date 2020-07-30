import React from 'react'

import './FloatContainer.css';

const FloatContainer = (props) => {
  return (
    <div className="float-container">
      {props.children}
    </div>
  )
}

export default FloatContainer
