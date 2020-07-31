import React, { useState, useEffect } from 'react'
import FloatContainer from '../../../containers/FloatContainer/FloatContainer'
import useInput from '../../hooks/useInput/useInput';
import { postItem, getItems } from '../../../actions/item';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PickSlot from '../../reusables/PickSlot/PickSlot';

const AddNew = ({ postItem, getItems }) => {
  const { value: name, onChange: nameOnChange } = useInput('');
  const { value: description, onChange: descriptionOnChange } = useInput('');
  const { value: price, onChange: priceOnChange } = useInput('');
  const [pickedSlot, setPickedSlot] = useState({ row: null, column: null });
  const [file, setFile] = useState('');

  function onFileChangeHandler(e) {
    setFile(e.target.files[0]);
  }

  function onSlotChange(row, column) {
    setPickedSlot({ row, column });
  }

  useEffect(() => {
    getItems();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('slotRow', pickedSlot.row);
    formData.append('slotColumn', pickedSlot.column);
    formData.append('price', price);

    postItem(formData);
  }

  return (
    <div className="content-container">
      <FloatContainer className="w-60">
        <h1>Add New Item</h1>
        <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label className="form-group ">
            Name:
            <input 
              autoComplete="new-password" 
              type="text" 
              value={name} 
              onChange={nameOnChange} 
            />
          </label>
          <label className="form-group">
            Description:
            <input  
              autoComplete="new-password" 
              type="text" value={description} 
              onChange={descriptionOnChange} 
            />
          </label>
          <label className="form-group">
            Price:
            <input 
              autoComplete="new-password" 
              type="number" value={price}
               onChange={priceOnChange} 
            />
          </label>
          <label className="form-group">
            Photo:
            <input
                type="file"
                name="file"
                onChange={onFileChangeHandler}
                id="input-files"
                className="form-control-file border"
              />
          </label>
          <PickSlot selectSlot={onSlotChange} pickedSlot={pickedSlot}/>
          <input type="submit" value="Submit" />
        </form>
      </FloatContainer>
    </div>
  )
}

AddNew.propTypes = {
  postItem: PropTypes.func,
  items: PropTypes.array,
  getItems: PropTypes.func.isRequired
}


export default connect(null, { postItem, getItems })(AddNew);
