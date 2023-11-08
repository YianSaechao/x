import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        if (userID) {  // Ensure userID is defined
          const response = await axios.get(
            `http://localhost:3000/recipes/savedRecipes/ids?userID=${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);
  
  

  const toggleSaveRecipe = async (recipeID) => {
    try {
      const isRecipeSaved = savedRecipes.includes(recipeID);
      let response;

      if (isRecipeSaved) {
        response = await axios.delete("http://localhost:3000/recipes/savedRecipes", {
          data: { recipeID, userID },
        });
      } else {
        response = await axios.put("http://localhost:3000/recipes", { recipeID, userID });
      }

      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const editRecipe = (recipeID) => {

    console.log(`Edit recipe with ID ${recipeID}`);
  };

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete("http://localhost:3000/recipes", {
        data: { recipeID },
      });

      const updatedRecipes = recipes.filter((recipe) => recipe._id !== recipeID);
      setRecipes(updatedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </div>
            <div>
              <button onClick={() => toggleSaveRecipe(recipe._id)} disabled={savedRecipes.includes(recipe._id)}>
                {savedRecipes.includes(recipe._id) ? "Saved" : "Save"}
              </button>
              <button onClick={() => editRecipe(recipe._id)}>Edit</button>
              <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
