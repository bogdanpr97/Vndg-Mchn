import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Item.css';

const Item = ({ item = {}, onClick, popoverText }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <div
      className="item"
      onMouseEnter={() => setIsPopoverVisible(true)}
      onMouseLeave={() => setIsPopoverVisible(false)}
      onClick={() => onClick(item)}
    >
      <div>{item.name}</div>
      <div>{item.description}</div>
      <img style={{ width: '100px', height: '100px' }} src={item.image} />
      <div>{item.quantity}</div>
      {isPopoverVisible && <div className="popover">{popoverText}</div>}
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Item
