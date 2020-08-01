import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AddExisting.css';
import { updateItemQuant } from '../../../actions/item';
import Item from '../../reusables/Item/Item';

const AddExisting = ({ items: { items }, updateItemQuant }) => {

  function handleAddQuantity(item) {
    updateItemQuant({
      itemId: item._id,
      quantity: item.quantity + 1
    });
  }

  return (
    <div className="content-container">
      <div className="container-wrap">
        {items.map((item) => (
         <Item item={item} onClick={handleAddQuantity} popoverText="Add 1 item" />
        ))}
      </div>
    </div>
  )
}

AddExisting.propTypes = {

}

const mapStateToProps = state => ({
  items: state.item,
  updateItemQuant: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, { updateItemQuant })(AddExisting);
