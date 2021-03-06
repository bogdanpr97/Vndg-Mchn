import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { SLOTS_WIDTH, SLOTS_HEIGHT } from '../../../contants';
import './PickSlot.css';

const PickSlot = ({ item: { slots }, selectSlot, pickedSlot }) => {

  const renderSquares = () => {
    const squares = [];
    if(!slots) return squares;
    for(let i = 0; i < SLOTS_HEIGHT; i++) {
      for(let j = 0; j < SLOTS_WIDTH; j++) {
        const isItemSelected = pickedSlot.row === i && pickedSlot.column === j;
        const classNameForSelected = isItemSelected ? 'selected' : '';
        if(slots[i][j]) {
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
    <>
      <h2 style={{ textAlign: "center"}}>Pick a slot</h2>
      <div className="picker-container">
        {[...renderSquares()]}
      </div>
    </>
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
