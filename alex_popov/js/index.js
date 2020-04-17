const {key, fileId, currency, priceDelimiter} = config;
// console.log(key, fileId, currency, priceDelimiter)

const application = new App(key, fileId, currency, priceDelimiter);
// console.log(application)

application.renderTableBody('productsTableBody')

document.querySelector('#productsTableHead').addEventListener('click', (ev) => {
    ev.preventDefault()
    // console.log('table head');
    if (ev.target.dataset.sorting) {
        application.onClickSorting(ev.target.dataset.sorting, 'productsTableBody', ev.target.parentElement)
    }
})

document.querySelector('#productsTableBody').addEventListener('click', (ev) => {
    ev.preventDefault();
    console.log('table body');
})

document.querySelector('#addNewProduct').addEventListener('click', (ev) => {
    ev.preventDefault();
    console.log('add new product');
})

document.querySelector('.searchProductBtn').addEventListener('click', (ev) => {
    ev.preventDefault();
    console.log('seatch btn')
})

document.querySelector('#searchField').addEventListener('input', (ev) => {
    ev.preventDefault();
    console.log('search field')
})