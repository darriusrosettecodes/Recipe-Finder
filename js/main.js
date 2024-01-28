// DOM elements
const applicationContainer = document.querySelector('.recipe-finder-body');
const recipeContainer = document.querySelector('.recipe-options');
const recipeDetailsContainer = document.querySelector('.recipe-details');
const bookmarksDropdown = document.querySelector('.bookmarks-dropdown-content');
const searchBar = document.querySelector('.search-bar-input');
const searchBtn = document.querySelector('.search-btn');
const loadingImg = document.querySelector('.loading-img');

import { performSearch } from "./search.js";
import { bookmarks, updateBookmarksDropdown } from "./bookmark.js";

// FUNCTION TO LOAD SAVED BOOKMARKS
window.addEventListener('load', function(){
  const savedBookmarks = localStorage.getItem('bookmarks');
  if(savedBookmarks) {
    bookmarks.push(...JSON.parse(savedBookmarks))
    updateBookmarksDropdown()
  }
})

// Event listener for the search button
searchBtn.addEventListener('click', function () {
    performSearch(searchBar.value);
});

searchBar.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter (keyCode 13)
  if (event.keyCode === 13) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Call your search function or perform search operation here
      performSearch(searchBar.value); // Assuming performSearch is your search function
  }
});