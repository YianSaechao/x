const express = require('express');
const mongoose = require('mongoose');
const RecipeModel = require('../models/Recipes.js');
const UserModel = require('../models/Users.js');

const router = express.Router();

router.get('/', async (req, res) =>{

    try {
        const response = await RecipeModel.find({});
        res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/', async (req, res) =>{
    const recipe = new RecipeModel(req.body);

    try {
        const response = await recipe.save();
        res.status(201).json(response);
    } catch(error) {
        res.json(error)
    }
})

router.put('/', async (req, res) =>{

    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);

        user.savedRecipes.push(recipe);
        await user.save();

        res.json({ message: 'Recipe added successfully', savedRecipes: user.savedRecipes });
    } catch(error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/savedRecipes/ids', async (req, res) => {
    try {
      const userID = req.query.userID;
  
      if (!userID) {
        return res.status(400).json({ message: 'Missing userID parameter' });
      }
  
      const user = await UserModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

router.get('/savedRecipes', async (req, res) =>{

    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes },
        })

        res.json({ savedRecipes: savedRecipes });
    } catch(error) {
        res.status(500).json({ message: 'Internal server error'})
    }
})

router.delete('/savedRecipes', async (req, res) => {
    try {
        const { userID, recipeID } = req.body;
        const user = await UserModel.findById(userID);

        const recipeIndex = user.savedRecipes.indexOf(recipeID);

        if (recipeIndex !== -1) {
            user.savedRecipes.splice(recipeIndex, 1);
            await user.save();
            res.json({ message: 'Recipe deleted' });
        } else {
            res.json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = { recipesRouter: router};

