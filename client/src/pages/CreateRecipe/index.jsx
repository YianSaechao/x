import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useGetUserID = () => window.localStorage.getItem("userID");


export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/recipes", { ...recipe }, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created");
      navigate("/");  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe"> 
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
       
        <input type="text" id="name" name="name" placeholder="Recipe Name"value={recipe.name} onChange={handleChange} />
     
        {recipe.ingredients.map((ingredient, index) => (
          <input key={index} type="text" placeholder="Add ingredient" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
        ))}

        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
      
        <textarea id="instructions" name="instructions" placeholder="Cooking Instructions" value={recipe.instructions} onChange={handleChange}></textarea>
      
        <input type="text" id="imageUrl" name="imageUrl" placeholder="Add ImageUrl" value={recipe.imageUrl} onChange={handleChange} />
      
        <input type="number" id="cookingTime" name="cookingTime" placeholder="Cooking time" value={recipe.cookingTime} onChange={handleChange} />

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
