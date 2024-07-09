const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags:[{
    type:String,
    required: true,
  }],
  imageUrl: {
    type: String,
    // required: true,
  },
  ingredients: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredients",
    required: true,
  },
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UpVote",
  }],
  rating: {
    type: Number,
    default:0,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
