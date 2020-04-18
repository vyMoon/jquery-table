const {key, fileId, currency, priceDelimiter} = config;
// console.log(key, fileId, currency, priceDelimiter)

const application = new App(key, fileId, currency, priceDelimiter);
// console.log($('.table'))

$( () => {
    application.renderTableBody('#productsTableBody');
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
        application.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement)
    }
});

// document.querySelector('#productsTableHead').addEventListener('click', (ev) => {
//     ev.preventDefault()
//     // console.log('table head');
//     if (ev.target.dataset.sorting) {
//         application.onClickSorting(ev.target.dataset.sorting, 'productsTableBody', ev.target.parentElement)
//     }
// })

$('#productsTableBody').on('click', 'a', onDel);
$('#productsTableBody').on('click', 'button', onDel);

function onDel(ev) {
    ev.preventDefault();

    if($(this).data('action')) {
        const id = $(this).data('id')
        const action = $(this).data('action')
        // console.log(id, action)
        if (action === 'delete') {
            // console.log('delete')
            // application.deleteItem.call(application, id)
            application.deleteItem(id)
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