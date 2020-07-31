import React from 'react';
import AddExisting from '../AddExisting/AddExisting';
import AddNew from '../AddNew/AddNew';
import './AddItem.css';

const AddItem = () => {
  return (
    <div className="row-container">
      <AddExisting />
      <AddNew />
    </div>
    );
};

export default AddItem;