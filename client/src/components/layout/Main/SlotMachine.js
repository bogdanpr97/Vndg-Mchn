import React from "react";
import PropTypes from "prop-types";
import Item from "../../reusables/Item/Item";
import "./Main.css";

const SlotMachine = ({ slots, handleBuyItem }) => {
  return (
    <div className="grid-container">
      {slots.map((rows) =>
        rows.map((insideItem) =>
          insideItem ? (
            <Item
              item={insideItem}
              onClick={handleBuyItem}
              popoverText="Buy 1 Item"
            />
          ) : (
            <div className="grid-item">Empty Slot</div>
          )
        )
      )}
    </div>
  );
};

SlotMachine.propTypes = {
  handleBuyItem: PropTypes.func.isRequired,
};

export default SlotMachine;
