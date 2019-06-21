$(document).ready( onReady );

let inventory = [];

function addItem(){
    console.log( 'in addItem' )
    // capture user input
    // place in new object
    let newItem = {
        color: $( '#colorIn').val(),
        name: $( '#nameIn').val(),
        size: $( '#sizeIn').val()
    }
    console.log( 'adding:', newItem);
    // push object into array
    inventory.push(newItem);
    //display inventory
    showInventory(); 
}

function onReady(){
    console.log('JQ');
    $( '#addItemButton' ).on('click', addItem);
    $( '#filterButton' ).on('click', filter)
}

function showInventory(){
    console.log( 'in showInventory');
    let el = $( '#inventoryOut');
    //loop through the inventory
    el.empty();
    for( let item of inventory){
       //append items to the dom
       el.append(`<li>${item.size} ${item.color} ${item.name}</li>`)
    }
    //empty name input
    $('#nameIn').val('')
}

function filter(){
    console.log( 'in filter' );
    // capture user input
    const colorCheck = $('#colorSearchIn').val()
    const sizeCheck = $('#sizeSearchIn').val()
    //loop through inventory
    for ( let item of inventory){
        //display matches
        if(item.size === sizeCheck && item.color === colorCheck){
            console.log('match:', item)
        }
    }
}

