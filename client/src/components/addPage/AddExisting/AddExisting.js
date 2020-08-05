import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AddExisting.css';
import { updateItemQuant } from '../../../actions/item';
import Item from '../../reusables/Item/Item';
import Spinner from '../../layout/Spinner';

const AddExisting = ({slots = [] , updateItemQuant, loading }) => {
  function handleAddQuantity(item) {
    updateItemQuant({
      itemId: item._id,
      quantity: item.quantity + 1
    });
  }
  return (
    <div className="content-container">
      <div className="container-wrap">
      {loading ? <Spinner /> : slots.map((rows) =>
        rows.map((insideItem) =>
          insideItem ? (
            <Item
              className="grid-item"
              item={insideItem}
              onClick={handleAddQuantity}
              popoverText="Add 1 Item"
            />
          ) : (
            null
          )
        )
      )}
      </div>
    </div>
  )
}

AddExisting.propTypes = {

}

const mapStateToProps = state => ({
  slots: state.item.slots,
  loading: state.item.loading,
  updateItemQuant: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, { updateItemQuant })(AddExisting);
