import React from 'react'
import PropTypes from 'prop-types'
import './Money.css';

const Money = ({ addMoneyToUser, value, color }) => {
  return (
    <div className={`money-card ${color}`} onClick={() => addMoneyToUser(value)}>
      Add {value}
    </div>
  )
}

Money.propTypes = {

}

export default Money
