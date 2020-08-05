import React from 'react'
import PropTypes from 'prop-types'

const Display = ({ value, current }) => {
  const firstClass = current === 'first' ? "underline" : "";
  const secondClass = current === 'second' ? "underline" : "";
  
  return (
    <div className="display">
      <span className={firstClass}>{ value.first }</span> 
      - 
      <span className={secondClass}>{ value.second }</span>
    </div>
  )
}

Display.propTypes = {
  value: PropTypes.object.isRequired,
}

export default Display
