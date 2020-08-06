import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({ item = {}, onClick, popoverText, className = "", }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <div
      className={`${className} item`}
      onMouseEnter={() => setIsPopoverVisible(true)}
      onMouseLeave={() => setIsPopoverVisible(false)}
      onClick={() => onClick(item)}
    >
       <div>
        <span style={{ color: "white" }}>{item.slot.row}</span>-
        <span style={{ color: "white" }}>{item.slot.column}</span>
      </div>
      <div>
        <span>{item.name}</span> -
        <span className="money-value">{item.price}$</span>
      </div>
      <img style={{ width: '70px', height: '70px' }} src={item.image} alt="item"/>
      <div>Left: {item.quantity}</div>
      {isPopoverVisible && <div className="popover">{popoverText}</div>}
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Item
