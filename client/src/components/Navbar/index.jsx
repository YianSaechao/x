import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [cookies, setCookie] = useCookies(['access_token']);
  const navigate = useNavigate();

  const Logout = () => {
    window.localStorage.removeItem('userID');
    setCookie('access_token', '', { path: '/' }); 
    navigate('/auth');
  };

  return (
    <div className='navbar'>
      <Link to='/' className='button-link'>
        Home
      </Link>
      <Link to='/createRecipe' className='button-link'>
        Create Recipe
      </Link>
      <Link to='/savedRecipes' className='button-link'>
        Saved Recipes
      </Link>
      {!cookies.access_token ? (
        <Link to='/auth' className='button-link'>
          Login/Register
        </Link>
      ) : (
        <button onClick={Logout}>Logout</button>
      )}
    </div>
  );
};


