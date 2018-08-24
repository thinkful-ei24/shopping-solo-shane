'use strict';


const STORE = [
  {name: 'apples', checked: false, checkBox: false},
  {name: 'oranges', checked: false, checkBox: false},
  {name: 'milk', checked: true, checkBox: true},
  {name: 'bread', checked: false, checkBox: false}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
    <input type="checkbox" id="checkbox">

      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" style="display: inline-block;">${item.name}</span>

      <img class="js-title-edit" src="https://png.icons8.com/ios/50/000000/pencil.png" style="display: inline; width: 18px;">

      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
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
  //let viewItems = [...STORE.items];

  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);




  //need to rewrite to include filtering for new arrays
  //from searching, changing title, and hiding
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, checkBox: false});
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}


function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
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
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  console.log('`handleDeleteItemClicked` ran');
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //delete STORE[itemIndex];
    //use splice to shift remaining to remove empty spots in array
    STORE.splice(itemIndex, 1);

    renderShoppingList();
  });
}


function hideChecked() {
  console.log('`hideChecked` ran');
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //delete STORE[itemIndex];
    STORE.splice(itemIndex, 1);

    renderShoppingList();
  });
}


function handleSearch() {
  console.log('`handleSearch` ran');
  $('js-search-form').submit(function(event) {
    event.preventDefault();
    const searchVal = $('.js-search-input').val();
    let newArr = STORE.filter(item => item.name === searchVal);
  });
}


function editItemTitle() {
  console.log('`editItemTitle` ran');
  $('.js-shopping-list').on('click', '.js-title-edit', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE[itemIndex].name = prompt('Enter a new item name', STORE[itemIndex].name);

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
  hideChecked();
  handleSearch();
  editItemTitle();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);