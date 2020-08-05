import React from 'react'
import PropTypes from 'prop-types';
import { range } from 'ramda';

const Buttons = ({ onClick, onEnter }) => {

  function renderButtons() {
    const buttons = range(0, 10).map(value => {
      return <div onClick={() => onClick(value)} className="button grid-button">{value}</div>
    });
    return buttons;
  }

  return (
    <div className="buttons-container">
      {renderButtons()}
      <div onClick={onEnter} className="button enter-button">Enter</div>
    </div>
  )
}

Buttons.propTypes = {
  onClick: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
}

export default Buttons;
