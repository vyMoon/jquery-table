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

$('#productsTableHead').click( (ev) => {
    ev.preventDefault()
    // console.log('table head');
    if (ev.target.dataset.sorting) {
        table.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement)
    }
});

$('#productsTableBody').on('click', 'a', onTableClick);
$('#productsTableBody').on('click', 'button', onTableClick);

function onTableClick(ev) {
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
            // console.log(id)
            table.updateItem(id)
        }
    }
}

$('#addNewProduct').click( (ev) => {
    ev.preventDefault();
    // console.log('add new product');
    table.updateItem()
});

$('.searchProductBtn').on('click', 'button',(ev) => {
    ev.preventDefault();
    // console.log('seatch btn', ev.target, ev.curentTarget)
    console.log($(this).data('action'))
});

$('#searchField').on('input', (ev) => {
    ev.preventDefault();
    console.log('search field')
})