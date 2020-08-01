import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getItems, updateItemQuant } from "../../../actions/item";
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../../../contants';
import PropTypes from "prop-types";
import Item from '../../reusables/Item/Item';

const Main = ({ getItems, updateItemQuant, items = [] }) => {

  useEffect(() => {
    getItems();
  }, []);

  function handleAddQuantity(item) {
    updateItemQuant({
      itemId: item._id,
      quantity: item.quantity - 1
    });
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {items.map((item) => (
        <Item item={item} onClick={handleAddQuantity} popoverText="Buy 1 Item"/>
      ))}
    </div>
  );
};

Main.propTypes = {
  getItems: PropTypes.func.isRequired,
  updateItemQuant: PropTypes.func.isRequired,
  items: PropTypes.array,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
});

export default connect(mapStateToProps, { getItems, updateItemQuant })(Main);
