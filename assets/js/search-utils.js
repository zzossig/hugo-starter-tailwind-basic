var fileIcon = `<svg class="inline mb-1" fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="22px" height="22px"><path d="M 20.265625 4.207031 C 20.023438 3.96875 19.773438 3.722656 19.527344 3.476563 C 19.277344 3.230469 19.035156 2.980469 18.792969 2.734375 C 17.082031 0.988281 16.0625 0 15 0 L 7 0 C 4.796875 0 3 1.796875 3 4 L 3 22 C 3 24.203125 4.796875 26 7 26 L 19 26 C 21.203125 26 23 24.203125 23 22 L 23 8 C 23 6.9375 22.011719 5.917969 20.265625 4.207031 Z M 21 22 C 21 23.105469 20.105469 24 19 24 L 7 24 C 5.894531 24 5 23.105469 5 22 L 5 4 C 5 2.894531 5.894531 2 7 2 L 14.289063 1.996094 C 15.011719 2.179688 15 3.066406 15 3.953125 L 15 7 C 15 7.550781 15.449219 8 16 8 L 19 8 C 19.996094 8 21 8.003906 21 9 Z"/></svg>`;

function makeLi(ulElem, obj) {
  var li = document.createElement('li');
  li.className = 'mb-6'; // search-result__item

  var a = document.createElement('a');
  a.innerHTML = fileIcon.concat("&nbsp;", obj.item.title);
  a.setAttribute('class', 'font-semibold text-3xl'); // search-result__item--title
  a.setAttribute('href', obj.item.permalink);

  var descDiv = document.createElement('div');
  descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
  
  if (obj.item.description) {
    descDiv.innerHTML = obj.item.description;
  } else if (obj.item.content) {
    descDiv.innerHTML = obj.item.content.substring(0, 225);
  }

  li.appendChild(a);
  li.appendChild(descDiv);
  ulElem.appendChild(li);
}

function makeHighlightLi(ulElem, obj) {
  var li = document.createElement('li');
  li.className = 'mb-6'; // search-result__item
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
          descDiv.innerHTML = generateHighlightedText(obj.item.content.substring(0, 150), obj.matches[i].indices);
        }
      } else {
        if (obj.item.description) {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
          descDiv.innerHTML = obj.item.description;
        } else {
          descDiv = document.createElement('div');
          descDiv.setAttribute('class', 'text-lg'); // search-result__item--desc
          descDiv.innerHTML = obj.item.content.substring(0, 150);
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
      '<span class="text-blue-600">' +
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