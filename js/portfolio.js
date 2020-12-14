var createPortfolio = function (root, photoConfigURL) {
  var portfolioArea = document.querySelector(root);
  if (!portfolioArea) {
    console.error("Can't find element with selector " + root);
    return null;
  }

  var photosLoaded = [];

  var initialisePhotoLoadState = function (items) {
    photosLoaded = items.map(function () { return false; });
  };

  var allPhotosLoaded = function () {
    return photosLoaded.every(function (x) {
      return x;
    });
  };

  var totalPhotoHeight = function () {
    return photosLoaded.reduce(function (totalHeight, nextHeight) {
      return totalHeight + nextHeight;
    });
  };

  var onPhotoLoaded = function (photo, photoIndex) {
    photosLoaded[photoIndex] = parseInt(window.getComputedStyle(photo).height);
    if (allPhotosLoaded()) {
      styleGrid();
    }
  };

  // In pixels
  var ROW_HEIGHT = 20;
  var ROW_GUTTER = 70;

  // For the title and some space around it
  var ARTWORK_PADDING = 2;

  var styleGrid = function () {
    var totalHeight = totalPhotoHeight();
    var screenWidth = window.innerWidth;
    var columns = screenWidth < 1400 ? 1 : 2;
    var rowCount = Math.ceil(totalHeight / ROW_HEIGHT);
    portfolioArea.style.gridTemplateColumns = 'repeat(' + columns + ', 1fr)';
    portfolioArea.style.gridTemplateRows = 'repeat(' + rowCount + ', ' + ROW_HEIGHT + 'px)';
    portfolioArea.style.gridGap = ROW_GUTTER + 'px';
    var lastEnding = 1;
    var rowStart = 1;
    document
      .querySelectorAll('.portfolio-item')
      .forEach(function (item, index) {
        if (index % columns === 0) {
          rowStart = lastEnding;
        }
        var image = item.querySelector('img');
        var imageHeight = parseInt(window.getComputedStyle(image).height);
        var title = item.querySelector('h2');
        var titleHeight = parseInt(window.getComputedStyle(title).height);
        var rowsForItem = ARTWORK_PADDING + Math.ceil((imageHeight + titleHeight) / (ROW_HEIGHT + ROW_GUTTER));
        if (rowsForItem + rowStart > lastEnding) {
          lastEnding = rowsForItem + rowStart;
        }
        item.style.gridRowStart = rowStart + '';
        item.style.gridRowEnd = 'span ' + rowsForItem;
      });
  };

  var render = function (items) {
    portfolioArea.innerHTML = '';
    var totalHeight = 0;
    initialisePhotoLoadState(items);
    items.forEach(function (item, index) {
      var nextPhoto = document.createElement('div');
      nextPhoto.classList.add('portfolio-item');
      var title = document.createElement('h2');
      title.innerHTML = item.title;
      var photo = document.createElement('img');
      photo.src = item.url;
      photo.onload = function () { onPhotoLoaded(photo, index); };
      nextPhoto.appendChild(title);
      nextPhoto.appendChild(photo);
      portfolioArea.appendChild(nextPhoto);
    });
  };

  var fetchAndRender = function () {
    fetch(photoConfigURL, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(render);
  };

  window.addEventListener('resize', fetchAndRender);

  fetchAndRender();

  return {
    fetchAndRender: fetchAndRender,
    styleGrid: styleGrid
  };
};
