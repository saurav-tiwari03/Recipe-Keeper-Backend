const express = require("express");
const router = express.Router();

//User routes
const { login, signup, updateProfile,getUserByUserName} = require("./../controllers/Auth");
router.post("/login", login);
router.post("/signup", signup);
router.put('/user/updateProfile/:id', updateProfile);
router.get('/user/:userName',getUserByUserName)

//Create recipe routes
const { createRecipe, getRecipeByUser,upVoteRecipe } = require("./../controllers/Recipe");
router.post("/recipe/create", createRecipe);
router.get("/recipe/get/:id", getRecipeByUser);
router.post("/recipe/upVote", upVoteRecipe);


module.exports = router;
