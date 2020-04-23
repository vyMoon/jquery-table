const {key, fileId, currency, priceDelimiter} = config;

if ( ! localStorage.getItem('productList') ) {
    console.log('local storage is updated, then you will get data from local storage')
    localStorage.setItem('productList', JSON.stringify( products ) )
} else if (localStorage.getItem('productList').length === 0 ) {
    console.log('The program get the list of the products from localStorage. Now the list is empty. You should add some new items')
} else {
    console.log('you get data from localstorage')
}

const table = new Table(
    key, 
    fileId, 
    currency, 
    priceDelimiter,
    delivery
);
// console.log( application )

$( () => {
    // table.renderTableBody('#productsTableBody');
    table.start()
});

$('#productsTableHead').click( (ev) => {
    ev.preventDefault()
    
    if (ev.target.dataset.sorting) {
        table.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement)
    }
});

$('#productsTableBody').on('click', 'a', onTableClick);
$('#productsTableBody').on('click', 'button', onTableClick);

function onTableClick(ev) {
    ev.preventDefault();
    
    if( $(this).data('action') ) {

        const id = $(this).data('id')
        const action = $(this).data('action')

        if (action === 'delete') {
            table.deleteItem(id)
        }
        if(action === 'edit') {
            table.updateItem(id)
        }
    }
}

// $('#addNewProduct').click( (ev) => {
//     ev.preventDefault();
//     table.updateItem()
// });

// $('#searchContainer').on('click', 'button', function(ev) {
//     ev.preventDefault()
//     // console.log( $(this).data('action'))
//     table.goSearch()
// })

// $('#searchContainer').on('input', 'input', function(ev) {
//     // console.log( $(this).val() )
//     table.onInputSearchField( $(this).val() )
// })

// $('#searchContainer').keydown( (ev) => {
//     if (ev.which === 13) {
//         // console.log('search')
//         table.goSearch()
//     }
// });