const express = require('express');
const { getItems, addItem, updateQuantity, deleteItem } = require('../controllers/items');

const router = express.Router();

router
  .route('/')
  .get(getItems)
  .post(addItem)
  .put(updateQuantity);

router
  .route('/:id')
  .delete(deleteItem)

module.exports = router;