'use strict';


const STORE = [{
    name: 'apples',
    checked: false,
    checkBox: false,
    hidden: false
  },
  {
    name: 'oranges',
    checked: false,
    checkBox: false,
    hidden: false
  },
  {
    name: 'milk',
    checked: true,
    checkBox: false,
    hidden: false
  },
  {
    name: 'bread',
    checked: false,
    checkBox: false,
    hidden: false
  }
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element ${item.hidden ? 'hidden' : ''}" data-item-index="${itemIndex}">
    <input type="checkbox" id="checkbox">
      <span class="shopping-item js-shopping-item ${item.crossed ? 'shopping-item__checked' : ''}" style="display: inline-block;">${item.name}</span>
      <img class="js-title-edit" src="https://png.icons8.com/ios/50/000000/pencil.png" style="display: inline; width: 18px;">
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">Cross</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">Delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  //create item object
  STORE.push({
    name: itemName,
    checked: false,
    checkBox: false
  });
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    //get item name and call additem func
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}


function toggleCrossedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  //toggle crossed item bool value
  STORE[itemIndex].crossed = !STORE[itemIndex].crossed;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}


function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCrossedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //delete STORE[itemIndex];
    //use splice to shift remaining to remove empty spots in array
    STORE.splice(itemIndex, 1);

    renderShoppingList();
  });
}

function toggleCheckboxClicked() {
  $('.js-shopping-list').on('click', '#checkbox', event => {
    console.log('`toggleCheckboxClicked` ran');
    //get current itemindex and set opposite bool val
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE[itemIndex].checkBox = !STORE[itemIndex].checkBox;
    console.log(STORE[itemIndex]);

  });
}

function hideBtnClicked() {
  $('.container').on('click', '.hideBtn', event => {
    console.log('`hideBtnClicked` ran');
    //loop through marked items and set hidden bool val
    for (const item of STORE) {
      if (item.checkBox) {
        item.hidden = !item.hidden;
      }
    }
    renderShoppingList();
  });
}


function showAllBtn() {
  $('.container').on('click', '.showAllBtn', event => {
    console.log('`showAllBtn` ran');
    //set all items to unhidden bool val
    STORE.forEach(item => item.hidden = false);
    renderShoppingList();
  });
}


function handleSearch() {
  $('#js-search-form').submit(function (event) {
    event.preventDefault();
    console.log('`handleSearch` ran');
    //store input string and filter results
    const searchVal = $('.js-search-input').val();
    let filtered = STORE.filter(item => item.name === searchVal);
    //loop through list items and hide items that don't match
    for (const foundItem of filtered) {
      for (const item of STORE) {
        if (item !== foundItem) {
          item.hidden = true;
        }
      }
    }
    renderShoppingList();
  });
}


function editItemTitle() {
  $('.js-shopping-list').on('click', '.js-title-edit', event => {
    console.log('`editItemTitle` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //set default name to current name
    const itemName = STORE[itemIndex].name;
    //create prompt box and run validity checks
    STORE[itemIndex].name = prompt('Enter a new item name', STORE[itemIndex].name);
    if (STORE[itemIndex].name === null || STORE[itemIndex].name === '') {
      STORE[itemIndex].name = itemName;
    }

    renderShoppingList();
  });
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  toggleCheckboxClicked();
  hideBtnClicked();
  showAllBtn();
  handleSearch();
  editItemTitle();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);