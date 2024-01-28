export let bookmarks = [];
const bookmarksDropdown = document.querySelector('.bookmarks-dropdown-content');

import { createRecipeDiv, displayRecipeDetails } from "./recipe.js";

export const addBookmark = function(recipe) {
    bookmarks.push(recipe);
};

export const removeBookmark = function(recipe) {
  const index = bookmarks.findIndex(bookmark => bookmark.recipe.uri === recipe.recipe.uri);
  if (index !== -1) {
    bookmarks.splice(index, 1);
  }
};

export const getBookmarks = function() {
    return bookmarks;
};

export const isBookmarked = function (recipe) {
    return bookmarks.some(bookmark => bookmark.recipe.uri === recipe.recipe.uri);
};

export const toggleBookmark = function (recipe, bookmarkIcon) {
  const isAlreadyBookmarked = isBookmarked(recipe);

  if (isAlreadyBookmarked) {
    removeBookmark(recipe);
    bookmarkIcon.classList.remove('is-bookmarked');
  } else {
    addBookmark(recipe);
    bookmarkIcon.classList.add('is-bookmarked');
  }

  // Update locale storage with new bookmark
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  updateBookmarksDropdown()
};

export const updateBookmarksDropdown = function () {
    bookmarksDropdown.innerHTML = '';
  
    bookmarks.forEach(bookmark => {
      const bookmarkDiv = createRecipeDiv(bookmark);
  
      bookmarkDiv.addEventListener('click', () => {
        displayRecipeDetails(bookmark);
      });
  
      bookmarksDropdown.appendChild(bookmarkDiv);
    });
};