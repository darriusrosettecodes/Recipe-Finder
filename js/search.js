import { appId, appKey } from './api.js';
import { displayAllRecipes } from './recipe.js';

const loadingImg = document.querySelector('.loading-img');
const recipeContainer = document.querySelector('.recipe-options');
const searchBar = document.querySelector('.search-bar-input');

export const performSearch = function() {
    // Show loading spinner
    recipeContainer.innerHTML = '';
    recipeContainer.appendChild(loadingImg);
    loadingImg.style.display = 'block';

    // GET DATA FROM API
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchBar.value}&app_id=${appId}&app_key=${appKey}`)
        .then(response => {
            // Hide loading spinner when response is received
            loadingImg.style.display = 'none';
            return response.json();
        })
        .then(recipesData => {
            // Clear existing recipes
            recipeContainer.innerHTML = '';
            console.log(recipesData);
            // Display new recipes
            displayAllRecipes(recipesData);
        })
        .catch(error => {
            console.error('Error:', error);
            // Show loading spinner in case of error
            loadingImg.style.display = 'block';
        });

    searchBar.value = '';
};