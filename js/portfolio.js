var createPortfolio = function (root, photoConfigURL) {
    var portfolioArea = document.querySelector(root);
    if (!portfolioArea) {
        console.error("Can't find element with selector " + root);
        return null;
    }

    var render = function (items) {
        portfolioArea.innerHTML = '';
        items.forEach(function (item) {
            var nextPhoto = document.createElement('div');
            nextPhoto.classList.add('portfolio-item');
            var title = document.createElement('h2');
            title.innerHTML = item.title;
            var photo = document.createElement('img');
            photo.src = item.url;
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

    fetchAndRender();

    return {
        fetchAndRender: fetchAndRender
    };
};
