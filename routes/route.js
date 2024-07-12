const express = require("express");
const router = express.Router();

//User routes
const {
  login,
  signup,
  updateProfile,
  getUserByUserName,
} = require("./../controllers/Auth");
router.post("/login", login);
router.post("/signup", signup);
router.put("/user/updateProfile/:id", updateProfile);
router.get("/user/:userName", getUserByUserName);

//File upload
const {profileUpload} = require("../controllers/FileUpload");
router.post("/user/profileUpload", profileUpload);

//Recipe routes
const {
  createRecipe,
  getRecipeByUser,
  upVoteRecipe,
  getRecipes,
  getIngredients
} = require("./../controllers/Recipe");
router.post("/recipe/create", createRecipe);
router.post("/recipe/upVote", upVoteRecipe);
router.get("/recipe/get/:id", getRecipeByUser);
router.get("/recipes/ingredients/:id",getIngredients)
router.get("/recipes",getRecipes);

module.exports = router;
