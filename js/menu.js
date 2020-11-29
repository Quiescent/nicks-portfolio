function createMenu(root) {
  var menuRoot = document.querySelector(root);
  if (!menuRoot) {
    console.error("Couldn't find element with selecter: " + root);
    return null;
  }

  var showItems = function () {
    menuRoot
      .style
      .width = '4.5em';
    menuRoot
      .style
      .height = '2.5em';
    menuRoot
      .style
      .borderRadius = '10px';
    menuRoot
      .style
      .paddingLeft = '';
    menuRoot
      .querySelector('#menu-collapsed')
      .style
      .display = 'none';
    menuRoot
      .querySelectorAll('.menu-item')
      .forEach(function (menuItem) {
        menuItem
          .style
          .display = 'block';
      });
  };

  var hideItems = function () {
    menuRoot
      .style
      .width = '';
    menuRoot
      .style
      .height = '';
    menuRoot
      .style
      .borderRadius = '';
    menuRoot
      .style
      .paddingLeft = '0px';
    menuRoot
      .querySelector('#menu-collapsed')
      .style
      .display = '';
    menuRoot
      .querySelectorAll('.menu-item')
      .forEach(function (menuItem) {
        menuItem
          .style
          .display = 'none';
      });
  };
  
  
  menuRoot.addEventListener('mouseover', showItems);
  menuRoot.addEventListener('mouseout', hideItems);

  hideItems();

  return {};  
}
