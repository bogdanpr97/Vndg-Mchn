import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getItems, updateItemQuant, deleteItem } from "../../../actions/item";
import { changeMoney } from '../../../actions/auth';
import PropTypes from "prop-types";
import SlotMachine from "./SlotMachine";
import Spinner from "../Spinner";
import MachineSide from "./MachineSide";

const Main = ({ changeMoney, getItems, updateItemQuant, deleteItem, items = [], slots = [], loading, user }) => {

  useEffect(() => {
    getItems();
  }, []);

  // value can be negative
  function changeUserMoney(value) {
    const newValue = user.totalMoney + value;
    changeMoney({ userId: user._id, value: newValue });
  }

  function handleBuyItem(item) {
    changeUserMoney(-item.price);
    if (item.quantity - 1 <= 0) {
      deleteItem({
        itemId: item._id,
      });
    } else {
      updateItemQuant({
        itemId: item._id,
        quantity: item.quantity - 1
      });
    }
  }

  if(loading) return <Spinner />;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        height: "100%"
      }}
    >
      <SlotMachine slots={slots} handleBuyItem={handleBuyItem} />
      <MachineSide changeUserMoney={changeUserMoney} />
    </div>
  );
};

Main.propTypes = {
  getItems: PropTypes.func.isRequired,
  updateItemQuant: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  changeMoney: PropTypes.func.isRequired,
  items: PropTypes.array,
  slots: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
  loading: state.item.loading,
  slots: state.item.slots,
  user: state.auth.user,
});

export default connect(mapStateToProps, { changeMoney, getItems, updateItemQuant, deleteItem })(Main);
