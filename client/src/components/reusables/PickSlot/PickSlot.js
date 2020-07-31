import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../../../contants';
import './PickSlot.css';

const PickSlot = ({ item: { slots }, selectSlot, pickedSlot }) => {
  const [select, changeSelected] = useState({});

  const renderSquares = () => {
    const squares = [];
    if(!slots) return squares;
    for(let i = 0; i < SLOTS_WIDTH; i++) {
      for(let j = 0; j < SLOTS_HEIGHT; j++) {
        const isItemSelected = pickedSlot.row === i && pickedSlot.column === j;
        const classNameForSelected = isItemSelected ? 'selected' : '';
        if(slots[i][j] === 1) {
          squares.push(<div className={`slot slot-used ${classNameForSelected}`}>{i}-{j}</div>);
        } else {
          squares.push(<div 
            className={`slot slot-free ${classNameForSelected}`} 
            onClick={() => selectSlot(i, j)} >
              {i} - {j}
            </div>);
        }
      }
    }
    return squares;
  };

  return (
    <div className="picker-container">
      {[...renderSquares()]}
    </div>
  )
}

PickSlot.propTypes = {
  item: PropTypes.object.isRequired,
  selectSlot: PropTypes.func.isRequired,
  pickedSlot: PropTypes.object.isRequired,
}

const mapStateToProps = store => ({
  item: store.item  
});

export default connect(mapStateToProps)(PickSlot);
