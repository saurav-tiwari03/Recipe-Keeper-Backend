const express = require("express");
const router = express.Router();

//Authentication routes
const { login, signup } = require("./../controllers/Auth");
router.post("/login", login);
router.post("/signup", signup);

//Create recipe routes
const { createRecipe, getRecipeByUser,upVoteRecipe } = require("./../controllers/Recipe");
router.post("/recipe/create", createRecipe);
router.get("/recipe/get/:id", getRecipeByUser);
router.post("/recipe/upVote", upVoteRecipe);
module.exports = router;
