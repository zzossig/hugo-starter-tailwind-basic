var fileIcon = `<svg class="inline mb-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 64 64" version="1.1"><g id="surface18931520"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 47.25 56 L 16.75 56 C 14 56 11.75 53.75 11.75 51 L 11.75 11 C 11.75 8.25 14 6 16.75 6 L 47.25 6 C 50 6 52.25 8.25 52.25 11 L 52.25 51 C 52.25 53.75 50 56 47.25 56 Z M 47.25 56 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(25.882354%,60.000002%,88.235295%);fill-opacity:1;" d="M 16.75 11 L 47.25 11 L 47.25 18.5 L 16.75 18.5 Z M 44.25 28.5 L 18.75 28.5 C 17.898438 28.5 17.25 27.851562 17.25 27 C 17.25 26.148438 17.898438 25.5 18.75 25.5 L 44.25 25.5 C 45.101562 25.5 45.75 26.148438 45.75 27 C 45.75 27.851562 45.101562 28.5 44.25 28.5 Z M 44.25 36 L 18.75 36 C 17.898438 36 17.25 35.351562 17.25 34.5 C 17.25 33.648438 17.898438 33 18.75 33 L 44.25 33 C 45.101562 33 45.75 33.648438 45.75 34.5 C 45.75 35.351562 45.101562 36 44.25 36 Z M 32 43.5 L 18.75 43.5 C 17.898438 43.5 17.25 42.851562 17.25 42 C 17.25 41.148438 17.898438 40.5 18.75 40.5 L 32 40.5 C 32.851562 40.5 33.5 41.148438 33.5 42 C 33.5 42.851562 32.851562 43.5 32 43.5 Z M 32 43.5 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(27.058825%,29.411766%,32.941177%);fill-opacity:1;" d="M 47.25 57.5 L 16.75 57.5 C 13.148438 57.5 10.25 54.601562 10.25 51 L 10.25 11 C 10.25 7.398438 13.148438 4.5 16.75 4.5 L 47.25 4.5 C 50.851562 4.5 53.75 7.398438 53.75 11 L 53.75 51 C 53.75 54.601562 50.851562 57.5 47.25 57.5 Z M 16.75 7.5 C 14.800781 7.5 13.25 9.050781 13.25 11 L 13.25 51 C 13.25 52.949219 14.800781 54.5 16.75 54.5 L 47.25 54.5 C 49.199219 54.5 50.75 52.949219 50.75 51 L 50.75 11 C 50.75 9.050781 49.199219 7.5 47.25 7.5 Z M 16.75 7.5 "/></g></svg>`;

function makeLi(ulElem, obj) {
  var li = document.createElement('li');
  li.className = 'mb-6 p-4 dark:bg-solarized-base02 rounded-md'; // search-result__item

  var a = document.createElement('a');
  a.innerHTML = fileIcon.concat("&nbsp;", obj.item.title);
  a.setAttribute('class', 'font-semibold text-3xl'); // search-result__item--title
  a.setAttribute('href', obj.item.permalink);

  var descDiv = document.createElement('div');
  descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
  
  if (obj.item.description) {
    descDiv.innerHTML = obj.item.description;
  } else if (obj.item.content) {
    descDiv.innerHTML = obj.item.content.substring(0, 400);
  }

  li.appendChild(a);
  li.appendChild(descDiv);
  ulElem.appendChild(li);
}

function makeHighlightLi(ulElem, obj) {
  var li = document.createElement('li');
  li.className = 'mb-6 p-4 dark:bg-solarized-base02 rounded-md'; // search-result__item
  var descDiv = null;

  var a = document.createElement('a');
  a.innerHTML = fileIcon.concat("&nbsp;", obj.item.title);
  a.setAttribute('class', 'font-semibold text-3xl my-auto'); // search-result__item--title
  a.setAttribute('href', obj.item.uri);

  if (obj.matches && obj.matches.length) {
    for (var i = 0; i < obj.matches.length; i++) {
      if ('title' === obj.matches[i].key) {
        a = document.createElement('a');
        a.innerHTML = fileIcon.concat("&nbsp;", generateHighlightedText(obj.matches[i].value, obj.matches[i].indices));
        a.setAttribute('class', 'font-semibold text-3xl my-auto'); // search-result__item--title
        a.setAttribute('href', obj.item.uri);
      }

      if ('description' === obj.matches[i].key) {
        descDiv = document.createElement('div');
        descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
        descDiv.innerHTML = generateHighlightedText(obj.item.description, obj.matches[i].indices);
      } else if ('content' === obj.matches[i].key) {
        if (!descDiv) {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
          descDiv.innerHTML = generateHighlightedText(obj.item.content.substring(0, 400), obj.matches[i].indices);
        }
      } else {
        if (obj.item.description) {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
          descDiv.innerHTML = obj.item.description;
        } else {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
          descDiv.innerHTML = obj.item.content.substring(0, 400);
        }
      }
    }

    li.appendChild(a);
    if (descDiv) {
      li.appendChild(descDiv);
    }
    if (li) {
      ulElem.appendChild(li);
    }
  }
}

function generateHighlightedText(text, regions) {
  if (!regions) {
    return text;
  }

  var content = '', nextUnhighlightedRegionStartingIndex = 0;

  regions.forEach(function (region) {
    if (region[0] === region[1]) {
      return null;
    }

    content += '' +
      text.substring(nextUnhighlightedRegionStartingIndex, region[0]) +
      '<span class="text-red-600">' +
      text.substring(region[0], region[1] + 1) +
      '</span>' +
      '';
    nextUnhighlightedRegionStartingIndex = region[1] + 1;
  });

  content += text.substring(nextUnhighlightedRegionStartingIndex);

  return content;
};

function renderSearchResultsMain(searchText, results) {
  var searchResult = document.querySelector('.search-result');
  var searchBody = document.querySelector('.search-result__body');
  var originUl = searchBody.querySelector('ul');
  var ul = document.createElement('ul');

  if (results && results.length) {
    results.forEach(function (result) {
      makeLi(ul, result);
    });
  }

  originUl.parentNode.replaceChild(ul, originUl);
}

function renderSearchHighlightResultsMain(searchText, results) {
  var searchResult = document.querySelector('.search-result');
  var searchBody = document.querySelector('.search-result__body');
  var originUl = searchBody.querySelector('ul');
  var ul = document.createElement('ul');

  if (results && results.length) {
    results.forEach(function (result) {
      makeHighlightLi(ul, result);
    });
  }

  originUl.parentNode.replaceChild(ul, originUl);
}