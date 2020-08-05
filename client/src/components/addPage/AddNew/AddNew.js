import React, { useState, useEffect } from 'react'
import FloatContainer from '../../../containers/FloatContainer/FloatContainer'
import useInput from '../../hooks/useInput/useInput';
import { postItem, getItems } from '../../../actions/item';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PickSlot from '../../reusables/PickSlot/PickSlot';
import './AddNew.css';
import { isEmpty } from 'ramda';
import { setAlert } from '../../../actions/alert';

const AddNew = ({ postItem, getItems, setAlert }) => {
  const { value: name, onChange: nameOnChange, reset: nameReset } = useInput('');
  const { value: description, onChange: descriptionOnChange, reset: descReset } = useInput('');
  const { value: price, onChange: priceOnChange, reset: priceReset } = useInput('');
  const [pickedSlot, setPickedSlot] = useState({});
  const [file, setFile] = useState('');

  function reset() {
    nameReset();
    descReset();
    priceReset();
    setPickedSlot({});
    setFile(null);
  }

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

    if (isEmpty(pickedSlot)) {
      setAlert("Please pick a slot", 'danger');
    } else {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("slotRow", pickedSlot.row);
      formData.append("slotColumn", pickedSlot.column);
      formData.append("price", price);

      postItem(formData).then(() => reset());
    }
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
              required
            />
          </label>
          <label className="form-group">
            Description:
            <input  
              autoComplete="new-password" 
              type="text" value={description} 
              onChange={descriptionOnChange} 
              required
            />
          </label>
          <label className="form-group">
            Price:
            <input 
              autoComplete="new-password" 
              type="number" value={price}
               onChange={priceOnChange} 
               required
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
                required
              />
          </label>
          <PickSlot selectSlot={onSlotChange} pickedSlot={pickedSlot}/>
          <input className="send-input" type="submit" value="Submit" />
        </form>
      </FloatContainer>
    </div>
  )
}

AddNew.propTypes = {
  postItem: PropTypes.func,
  setAlert: PropTypes.func,
  items: PropTypes.array,
  getItems: PropTypes.func.isRequired
}


export default connect(null, { postItem, getItems, setAlert })(AddNew);
