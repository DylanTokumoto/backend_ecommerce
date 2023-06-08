const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
    productName: String,
    category: String,
    supplier: String,
    image: String,
    description: String,
})

module.exports = model("Item", ItemSchema);