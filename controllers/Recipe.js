const Recipe = require("../models/recipe");
const Ingredients = require("../models/ingredients");
const User = require("./../models/user");

exports.createRecipe = async (req, res) => {
  try {
    const { recipeBy, title,tags, ingredients } = req.body;
    if (!recipeBy || !title || !ingredients) {
      throw new Error("Error in recipe fields");
    }

    const ingredientsDoc = new Ingredients({ ingredient: ingredients });
    await ingredientsDoc.save();

    const recipe = await Recipe.create({
      recipeBy: recipeBy,
      title: title,
      tags:tags,
      ingredients: ingredientsDoc._id,
    });

    console.log(recipe);
    const user = await User.findById(recipeBy);
    if (!user) {
      throw new Error("Error while saving recipe to user collection");
    }
    user.recipes.push(recipe._id);
    await user.save();

    res.status(200).json({
      success: true,
      recipe: recipe,
      message: "Recipe created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while creating recipe",
    });
  }
};

exports.getRecipeByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Could not find User");
    }

    const recipes = await Recipe.find({ _id: { $in: user.recipes } });

    res.status(200).json({
      success: true,
      data: recipes,
      message: "Recipes found successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while retrieving recipes",
    });
  }
};

exports.upVoteRecipe = async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (recipe.upVotes.includes(userId)) {
      throw new Error("User has already upvoted this recipe");
    }
    recipe.upVotes.push(userId);
    await recipe.save();

    const Votes = user.upVotes;
    user.upVotes = Votes + 1;
    user.save();

    res.status(200).json({
      success: true,
      message: `UpVotes for ${recipe.title}`,
      currentUpVotes: recipe.upVotes.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Erro while upvoting a recipe",
    });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log(recipes);
    res.status(200).json({
      success: true,
      recipes: recipes,
      message: "All recipes fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching recipes",
    });
  }
};
