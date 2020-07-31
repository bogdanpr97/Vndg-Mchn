import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../../../actions/item";
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../../../contants';
import PropTypes from "prop-types";


const Main = ({ getItems, items = [] }) => {

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {items.map((item) => (
        <div>
          <div>{item.name}</div>
          <div>{item.description}</div>
          <img style={{ width: '100px', height: '100px' }} src={item.image} />
        </div>
      ))}
    </div>
  );
};

Main.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
});

export default connect(mapStateToProps, { getItems })(Main);
