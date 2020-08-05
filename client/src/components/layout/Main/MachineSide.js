import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Money from '../../reusables/Money/Money'
import Buttons from './Buttons'
import { connect } from 'react-redux';
import { changeMoney } from '../../../actions/auth';
import { deleteItem, updateItemQuant } from '../../../actions/item';
import { setAlert } from '../../../actions/alert';

import Display from './Display';

const MachineSide = ({
  setAlert,
  deleteItem,
  updateItemQuant,
  changeUserMoney,
  user,
  slots }) => {
  const [display, setDisplay] = useState({ first: 0, second: 0 });
  const [displayInput, setDisplayInput] = useState('first');


  

  function handleBuyItem() {
    const item = slots[display.first][display.second];
    if (!item) {
      setAlert('No item in the slots', 'danger');
    } else {
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
  
  }

  function toggleDisplayInput() {
    displayInput === 'first'
      ? setDisplayInput('second')
      : setDisplayInput('first');
  }

  function handleButtonClick(value) {
    toggleDisplayInput();
    setDisplay({
      ...display,
      [displayInput]: value,
    })
  }

  return (
    <div className="machine-container">
      <Fragment>
        <Display value={display} current={displayInput} />
        <Buttons onClick={handleButtonClick} onEnter={handleBuyItem} />
      </Fragment>
      <div className="money-container">
        <Money color="green" value={100} addMoneyToUser={changeUserMoney} />
        <Money color="purple" value={200} addMoneyToUser={changeUserMoney} />
        <Money color="yellow" value={300} addMoneyToUser={changeUserMoney} />
      </div>
    </div>
  )
}

MachineSide.propTypes = {
  changeMoney: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateItemQuant: PropTypes.func.isRequired,
  slots: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  slots: state.item.slots
})


export default connect(mapStateToProps, { setAlert, changeMoney, deleteItem, updateItemQuant })(MachineSide);
