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
    $( '#filterButton' ).on('click', filter);
    $( '#showAllButton').on('click', showInventory);
    $( '#inventoryOut').on('click', '#sellButton', sellItem)
}

function showInventory(){
    console.log( 'in showInventory');
    let el = $( '#inventoryOut');
    //loop through the inventory
    el.empty();
    for( let item of inventory){
       //append items to the dom
       el.append(`<li>${item.size} ${item.color} ${item.name}<button id="sellButton">Sell</button></li>`)
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
    let el = $('#inventoryOut');
    //loop through the inventory
    el.empty();
    for ( let item of inventory){
        //display matches
        if(item.size === sizeCheck && item.color === colorCheck){
            console.log('match:', item)
            el.append(`<li>${item.size} ${item.color} ${item.name}<button id="sellButton">Sell</button></li>`)
        }
    } 
}

function sellItem(event){
    console.log($(this).parent().text())

     let itemToSell = $(this).parent().text();
     for(let item of inventory){
         let itemInInv = `${item.size} ${item.color} ${item.name}Sell`
         if(itemToSell === itemInInv){
             inventory.pop(item)
             showInventory();
         }
     }
}

