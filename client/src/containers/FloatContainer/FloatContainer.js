import React from 'react'

import './FloatContainer.css';

const FloatContainer = ({ children, className }) => {
  return (
    <div className={`float-container ${className}`}>
      {children}
    </div>
  )
}

export default FloatContainer
