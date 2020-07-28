const Item = require("../models/Item");

// @desc Get all items
// @route GET /api/v1/items
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc Add Item
// @route POST /api/v1/items
exports.addItem = async (req, res, next) => {
  try {
    const { name, image, description, price, quantity = 1 } = req.body;
    
    const item = await Item.findOne({ name });
    
    // if item already in db
    if(item) {
      return res.status(303).send("Item with that name already in vending machine");
    }

    const newItem = new Item({
      name,
      image,
      description,
      price,
      quantity,
    });

    await newItem.save();
    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc Edit Item
// @route PUT /api/v1/items/:id
exports.updateQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  try {
    const item = await Item.findById(req.params.id);
    
    if(!item) {
      return res.status(404).send("Item not found");
    }

    item.quantity = quantity;

    await item.save();
    res.json(item);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}


// @desc Delete Item - called only when the quantity is 0
// @route DELETE api/v1/items/:id
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if(!item) {
      return res.status(404).send("No Item found");
    }

    await item.remove();

    return res.status(200).send(`Item removed: ${item.name}`);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

