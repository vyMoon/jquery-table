const {key, fileId, currency, priceDelimiter} = config;

if ( ! localStorage.getItem('productList') ) {
    console.log('The start data is loaded to the localstorage, then you will get the data from the local storage. If you change the data, it will be changed in the local storage too');
    localStorage.setItem('productList', JSON.stringify( products ) );
} else if (JSON.parse( localStorage.getItem('productList') ).length === 0 ) {
    console.log('The program get the list of the products from the localStorage. Now the list is empty. You should add some new items');
} else {
    console.log('you have got the data from the localstorage');
}

const table = new Table(
    key, 
    fileId, 
    currency, 
    priceDelimiter,
    delivery
);

$( () => {
    table.start();
});