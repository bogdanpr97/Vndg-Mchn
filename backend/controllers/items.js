const Item = require("../models/Item");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

// try busboy
const storage = multer.diskStorage({
  destination: "./public/",
  filename: function(req, file, cb) {
     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("image");

exports.addItem = (req, res) => {
  upload(req, res, async () => {
    //  console.log("Request ---", req.body);
    //  console.log("Request file ---", req.file);//Here you get file.
     const { name, description, price, quantity = 1, slotRow, slotColumn } = req.body;
     try {
      const image = { 
        data: fs.readFileSync(path.join(__dirname + '/../public/' + req.file.filename)), 
        contentType: 'image/png'
       } 

       const item = await Item.findOne({ name });
    
      // if item already in db
       if (item) {
         return res.status(303).json({
           errors: [
             {
               msg: "Item with that name already in vending machine"
             }
           ]
         })
       }

      if(slotColumn < 0 || slotRow < 0 || slotColumn > 4 || slotRow > 3 ) {
        return res.status(400).send("Wrong Slots Params");
      }
       
       const newItem = new Item({
         name,
         description,
         price,
         quantity,
         image,
         slot: {
           row: slotRow,
           column: slotColumn
         }
       });
       await newItem.save();
  
       res.status(201).json({
        success: true,
        data: newItem
      });
     } catch(err) {
       console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
     }  
  });
}

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
// deprecated version image was a sting
exports.addItem2 = async (req, res, next) => {
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

