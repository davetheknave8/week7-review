$(document).ready( onReady );

let globalItem = {};

function addItem(){
    console.log( 'in addItem' )
    // capture user input
    // place in new object
    let newItem = {
        color: $( '#colorIn').val(),
        item: $( '#nameIn').val(),
        size: $( '#sizeIn').val()
    }
    console.log( 'adding:', newItem);
    $.ajax({
        method: 'POST',
        url: '/item',
        data: newItem
    })
    .then(function(response){
        showInventory();
        $('#nameIn').val('');
    })
    //display inventory
    showInventory(); 
}

function onReady(){
    $('#sizeIn').val('');
    $('#colorIn').val('');
    console.log('JQ');
    $('#submitButton').on('click', '#addItemButton', addItem);
    $('#submitButton').on('click', '#editItemButton', editItem);
    // $( '#filterButton' ).on('click', filter);
    showInventory();
    $( '#inventoryOut').on('click', '#sellButton', sellItem);
    $('#inventoryOut').on('click', '#editButton', handleEdit);
}

function showInventory(inventory){
    console.log( 'in showInventory');
    $.ajax({
        method: 'GET',
        url: '/item'
    }).then(function (response){
        let el = $('#inventoryOut');
        //loop through the inventory
        el.empty();
        for (let item of response) {
            //append items to the dom
            const li = $(`<li>${item.size} ${item.color} ${item.item}<button id="sellButton">Sell</button><button id="editButton">Edit</button></li>`)
            el.append(li);
            li.data('item', item);
        }
        //empty name input
        $('#nameIn').val('')

    })   
}

// function filter(){
//     console.log( 'in filter' );
//     // capture user input
//     const colorCheck = $('#colorSearchIn').val()
//     const sizeCheck = $('#sizeSearchIn').val()
//     //loop through inventory
//     let el = $('#inventoryOut');
//     //loop through the inventory
//     el.empty();
//     for ( let item of inventory){
//         //display matches
//         if(item.size === sizeCheck && item.color === colorCheck){
//             console.log('match:', item)
//             el.append(`<li>${item.size} ${item.color} ${item.name}<button id="sellButton">Sell</button></li>`)
//         }
//     } 
// }

function sellItem(event){
    console.log($(this).parent().text())

     let itemToSell = $(this).closest('li').data('item');
     $.ajax({
         method: 'DELETE',
         url: `/item/${itemToSell.id}`,
         data: itemToSell
     }).then(function(response){
         showInventory();
     })
}

function handleEdit(){
    console.log('edit');
    globalItem = $(this).closest('li').data('item');
    console.log(globalItem);
    $('#title').empty();
    $('#title').append(`<h2>Edit Item</h2>`);
    $('#submitButton').empty();
    $('#submitButton').append(`<button class="btn-primary" id="editItemButton">Submit Edit</button>`);
    $('#inventoryOut').empty();
    $('#inventoryOut').append(`<li>${globalItem.size} ${globalItem.color} ${globalItem.item}</li>`)
    $('#sizeIn').val(globalItem.size);
    $('#colorIn').val(globalItem.color);
    $('#nameIn').val(globalItem.item);
}


function editItem(){
    globalItem.size = $('#sizeIn').val();
    globalItem.color = $('#colorIn').val();
    globalItem.item = $('#nameIn').val();
    $.ajax({
        method: 'PUT',
        url: `/item/${globalItem.id}`,
        data: globalItem
    }).then(function(response){
        showInventory();
        $('#nameIn').val('');
        $('#title').empty();
        $('#title').append(`<h2>Add New Item</h2>`);
        $('#submitButton').empty();
        $('#submitButton').append(`<button class="btn-primary" id="addItemButton">Add Item</button>`);
    })
}
