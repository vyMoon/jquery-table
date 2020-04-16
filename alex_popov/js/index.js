const application = new App(config.key, config.fileId);

application.renderTableBody('productsTableBody')

// console.log( application );

// let tmpl = _.template( table );
// document.getElementById('productsTableBody').innerHTML = tmpl({
//     list: application.state.items
// });

document.querySelector('#productsTableHead').addEventListener('click', (ev) => {
    ev.preventDefault()
    // console.log('table head');
    // console.log(ev.target.dataset.sorting )
    application.onClickSorting(ev.target.dataset.sorting, 'productsTableBody')
    // console.log(application.state.sorting)
    // application.renderTableBody('productsTableBody')
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