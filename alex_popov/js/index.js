const key = '$2b$10$0rZLIDFGWOdXGdOc4n7HC.sqsisGH3VoH/BaqpmEZUG9GqnE0zKEi';
const jsonId = '5e9615d8435f5604bb4165f3'

// let req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//   if (req.readyState == XMLHttpRequest.DONE) {
//     console.log(req.responseText);
//   }
// };

// req.open("POST", "https://api.jsonbin.io/b", true);
// req.setRequestHeader("Content-Type", "application/json");
// req.setRequestHeader("secret-key", key);
// req.send('{"Sample": "Hello World"}');


// req = new XMLHttpRequest();

// req.onreadystatechange = () => {
//   if (req.readyState == XMLHttpRequest.DONE) {
//     console.log(req.responseText);
//   }
// };

// req.open("GET", "https://api.jsonbin.io/b/" + jsonId, true);
// req.setRequestHeader("secret-key", key);
// req.send();

// import { table } from './templates/table_body'

function priceMaker(num) {
    const currency = '$';
    const pieces = num.toFixed(2).split('.')

    if (pieces[0].length > 3) {
        pieces[0] = pieces[0].split('')
  
        for(let i = -3; (i * (-1) ) < pieces[0].length; i -=  4 ) {
            pieces[0].splice(i, 0, ',');
        }
  
        pieces[0] = pieces[0].join('')
    }

    return `${currency} ${pieces[0]}.${pieces[1]}`;
}



const products = [
    {
        name: 'Product',
        email: 'mail@mail.ru',
        count: 56,
        price: 1000.56,
        dilivery: false
    }, {
        name: 'Another Product',
        email: 'mail1@mail.ru',
        count: 300,
        price: 1000000.56,
        dilivery: false
    }, {
        name: 'New Product',
        email: 'mail2@mail.ru',
        count: 56,
        price: 500.56,
        dilivery: false
    }, {
        name: 'Product',
        email: 'mail@mail.ru',
        count: 56,
        price: 1000.56,
        dilivery: false
    }, {
        name: 'Another Product',
        email: 'mail1@mail.ru',
        count: 300,
        price: 1000000.56,
        dilivery: false
    }, {
        name: 'New Product',
        email: 'mail2@mail.ru',
        count: 56,
        price: 500.56,
        dilivery: false
    }
]

// const table = '<% list.forEach( (el) => { %> \
//     <tr> \
//         <td><a href="/"><%=el.name%></a></td> \
//         <td><%=el.count%></td> \
//         <td><%=priceMaker( el.price )%></td> \
//         <td class="d-flex justify-content-around"> \
//             <button type="button" class="btn btn-info">Edit</button> \
//             <button type="button" class="btn btn-danger">Delete</button> \
//         </td> \
//     </tr> \
// <% }) %>';

let tmpl = _.template(table);


document.getElementById('productsTableBody').innerHTML = tmpl({
    list: products
});