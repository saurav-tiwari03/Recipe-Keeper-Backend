const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const ingredients = new mongoose.Schema({
  ingredient: [ingredientSchema],
});

module.exports = mongoose.model("Ingredients", ingredients);
