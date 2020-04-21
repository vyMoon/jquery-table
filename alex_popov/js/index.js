const {key, fileId, currency, priceDelimiter} = config;
// console.log(key, fileId, currency, priceDelimiter)

const table = new Table(
    key, 
    fileId, 
    currency, 
    priceDelimiter,
    delivery
);
// console.log( application )

$( () => {
    table.renderTableBody('#productsTableBody');
});
// application.renderTableBody('productsTableBody')

// Event setup using a convenience method
// $( "p" ).click(function() {
//     console.log( "You clicked a paragraph!" );
// });

$('#productsTableHead').click( (ev) => {
    ev.preventDefault()
    // console.log('table head');
    if (ev.target.dataset.sorting) {
        table.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement)
    }
});

// document.querySelector('#productsTableHead').addEventListener('click', (ev) => {
//     ev.preventDefault()
//     // console.log('table head');
//     if (ev.target.dataset.sorting) {
//         application.onClickSorting(ev.target.dataset.sorting, 'productsTableBody', ev.target.parentElement)
//     }
// })

$('#productsTableBody').on('click', 'a', tableClick);
$('#productsTableBody').on('click', 'button', tableClick);

function tableClick(ev) {
    ev.preventDefault();
    // console.log( $(this).data('action'))
    if( $(this).data('action') ) {
        const id = $(this).data('id')
        const action = $(this).data('action')
        // console.log(id, action)
        if (action === 'delete') {
            table.deleteItem(id)
        }
        if(action === 'edit') {
            console.log(id)
            table.editItem(id)
        }
    }
}

// document.querySelector('#productsTableBody').addEventListener('click', (ev) => {
//     ev.preventDefault();
//     console.log('table body');
// })

$('#addNewProduct').click( (ev) => {
    ev.preventDefault();
    console.log('add new product');
    table.addNewItem()
});

// document.querySelector('#addNewProduct').addEventListener('click', (ev) => {
//     ev.preventDefault();
//     console.log('add new product');
// })

$('.searchProductBtn').on('click', 'button',(ev) => {
    ev.preventDefault();
    // console.log('seatch btn', ev.target, ev.curentTarget)
    console.log($(this).data('action'))
});

// document.querySelector('.searchProductBtn').addEventListener('click', (ev) => {
//     ev.preventDefault();
//     console.log('seatch btn')
// })

$('#searchField').on('input', (ev) => {
    ev.preventDefault();
    console.log('search field')
})

// document.querySelector('#searchField').addEventListener('input', (ev) => {
//     ev.preventDefault();
//     console.log('search field')
// })