import { updateBookmarksDropdown, isBookmarked, toggleBookmark } from './bookmark.js';

const recipeContainer = document.querySelector('.recipe-options');
const recipeDetailsContainer = document.querySelector('.recipe-details');

export const createRecipeDiv = function(recipe) {
  const recipeDiv = document.createElement('div');
  recipeDiv.className = 'option';

  const imgElement = document.createElement('img');
  imgElement.src = recipe.recipe.image;
  imgElement.alt = '';
  imgElement.className = 'option-img';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'option-info';

  const nameElement = document.createElement('h3');
  nameElement.className = 'option-name';
  nameElement.textContent = recipe.recipe.label;

  const infoSpan = document.createElement('span');
  infoSpan.className = 'info';
  infoSpan.textContent = recipe.recipe.source;

  infoDiv.appendChild(nameElement);
  infoDiv.appendChild(infoSpan);

  recipeDiv.appendChild(imgElement);
  recipeDiv.appendChild(infoDiv);

  return recipeDiv;
};

export const displayRecipeDetails = function(recipe) {
  recipeDetailsContainer.innerHTML = '';

  const detailsSection = document.createElement('section');
  detailsSection.className = 'recipe-details';

  const imgElement = document.createElement('div');
  imgElement.className = 'recipe-img';
  imgElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.371), rgba(0, 0, 0, 0.365)), url('${recipe.recipe.image}')`;
  imgElement.style.backgroundRepeat = 'no-repeat'
  imgElement.style.backgroundPosition = 'center';
  imgElement.style.backgroundSize = 'cover';

  const nameElement = document.createElement('h1');
  nameElement.className = 'recipe-name';
  nameElement.textContent = recipe.recipe.label;

  const timeDetailsDiv = document.createElement('div');
  timeDetailsDiv.className = 'recipe-time-details';

  const timeDiv = document.createElement('div');
  timeDiv.className = 'time';

  const clockIcon = document.createElement('i');
  clockIcon.className = 'fa-regular fa-clock';

  const cookTimeSpan = document.createElement('span');
  cookTimeSpan.className = 'cook-time';
  cookTimeSpan.textContent = recipe.recipe.totalTime;

  const bookmarkBtn = document.createElement('button');
  bookmarkBtn.className = 'bookmark-btn';

  const bookmarkIcon = document.createElement('i');
  bookmarkIcon.classList.add('bookmark-icon')
  bookmarkIcon.classList.add('fa-bookmark')
  bookmarkIcon.classList.add('fa-regular')

  bookmarkBtn.appendChild(bookmarkIcon)

  const ingredientsDiv = document.createElement('div');
  ingredientsDiv.className = 'recipe-ingredients';

  const ingredientsHeader = document.createElement('h3');
  ingredientsHeader.textContent = 'Recipe Ingredients';

  const ingredientsList = document.createElement('ul');
  ingredientsList.className = 'ingredients-container';

  recipe.recipe.ingredients.forEach(function (ingredient) {
    const ingredientListItem = document.createElement('li');
    ingredientListItem.className = 'ingredient';
    ingredientListItem.textContent = ingredient.text;
    ingredientsList.appendChild(ingredientListItem);
  });

  const instructionsDiv = document.createElement('div');
  instructionsDiv.className = 'recipe-instructions';

  const instructionsHeader = document.createElement('h3');
  instructionsHeader.textContent = 'How To Cook It';
  
  const instructionsButton = document.createElement('button');
  instructionsButton.textContent = 'INSTRUCTIONS';
  
  instructionsButton.addEventListener('click', function() {
      window.location.href = recipe.recipe.url; // Navigate to the URL when the button is clicked
  });  


  bookmarkBtn.addEventListener('click', () => {
    toggleBookmark(recipe, bookmarkIcon); 
    console.log(bookmarkIcon)
    updateBookmarksDropdown();
  });

  if (isBookmarked(recipe)) {
    bookmarkIcon.classList.add('is-bookmarked');
  }

  timeDiv.appendChild(clockIcon);
  timeDiv.appendChild(cookTimeSpan);
  timeDetailsDiv.appendChild(timeDiv);
  timeDetailsDiv.appendChild(bookmarkBtn);

  ingredientsDiv.appendChild(ingredientsHeader);
  ingredientsDiv.appendChild(ingredientsList);

  instructionsDiv.appendChild(instructionsHeader);
  instructionsDiv.appendChild(instructionsButton);

  detailsSection.appendChild(imgElement);
  detailsSection.appendChild(nameElement);
  detailsSection.appendChild(timeDetailsDiv);
  detailsSection.appendChild(ingredientsDiv);
  detailsSection.appendChild(instructionsDiv);

  recipeDetailsContainer.appendChild(detailsSection);
};

export const displayAllRecipes = function(recipesData) {
  recipesData.hits.forEach(recipe => {
    const recipeDiv = createRecipeDiv(recipe);
    recipeContainer.appendChild(recipeDiv);

    recipeDiv.addEventListener('click', () => {
      displayRecipeDetails(recipe);
      recipeDetailsContainer.style.overflow = 'hidden'
    });
  });
};
