const {key, fileId, currency, priceDelimiter} = config;

if ( ! localStorage.getItem('productList') ) {
    console.log('The start data is loaded in the localstorage, then you will get data from local storage');
    localStorage.setItem('productList', JSON.stringify( products ) );
} else if (JSON.parse( localStorage.getItem('productList') ).length === 0 ) {
    console.log('The program get the list of the products from localStorage. Now the list is empty. You should add some new items');
} else {
    console.log('you get data from localstorage');
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