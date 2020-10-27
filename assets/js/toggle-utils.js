// toggle container
var menuContainer = document.getElementById('menu-container');
var searchContainer = document.getElementById('search-container');
var menuIcon = document.getElementById('menu-icon');
var searchIcon = document.getElementById('search-icon');
var cancelMenuIcon = document.getElementById('cancel-menu-icon');
var cancelSearchIcon = document.getElementById('cancel-search-icon');
var searchInputElem = document.getElementById('search-input');
var searchResultElem = document.querySelector('.search-result__body');
var bodyElem = document.querySelector('body');

function hideContainer(container) {
  container.classList.add('opacity-0');
  container.classList.remove('opacity-100');
  container.classList.remove('z-50');
  bodyElem.classList.remove('overflow-hidden');
  setTimeout(function () {
    container.classList.add('-z-10');
  }, 300);
}

function showContainer(container) {
  container.classList.remove('opacity-0');
  container.classList.remove('-z-10');
  container.classList.add('opacity-100');
  container.classList.add('z-50');
  bodyElem.classList.add('overflow-hidden');
}

menuIcon.onclick = function () {
  showContainer(menuContainer);
}

searchIcon.onclick = function () {
  showContainer(searchContainer);
  searchInputElem.focus();
}

cancelMenuIcon.onclick = function () {
  hideContainer(menuContainer);
}

cancelSearchIcon.onclick = function () {
  hideContainer(searchContainer);
  searchInputElem.value = '';
  searchResultElem.replaceChild(document.createElement('ul'), searchResultElem.querySelector('ul'));
}

// darkmode
var darkmodeIcon = document.getElementById('darkmode-icon');
var bodyElem = document.querySelector('body');

darkmodeIcon.onclick = function() {
  if (bodyElem.classList.contains('dark')) {
    bodyElem.classList.remove('dark');
    localStorage.removeItem('theme');
  } else {
    bodyElem.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}