const express = require('express');
const { getItems, addItem, updateQuantity, deleteItem } = require('../controllers/items');

const router = express.Router();

router
  .route('/')
  .get(getItems)
  .post(addItem)
  

router
  .route('/:id')
  .put(updateQuantity)
  .delete(deleteItem);

module.exports = router;