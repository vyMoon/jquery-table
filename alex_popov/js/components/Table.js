class Table extends Application {
    constructor(currency, priceDelimiter, delivery) {
        super();
        this.delivery = delivery;                                             // the full information about the avialable citias for delivery
        this.currency = currency;
        this.priceDelimiter = priceDelimiter;

        this.state = {
            items: JSON.parse( localStorage.getItem('productList') ),         // the list of the products
            search: '',                                                       // here stores the string for searcing products
            sorting: {                                                         // and information about sorting
                rule: '',
                direction: true
            }
        }

        this.deletItem = this.deletItem.bind(this);
        this.updateData = this.updateData.bind(this);
        this.onInputSearchField = this.onInputSearchField.bind(this);
        this.goSearch = this.goSearch.bind(this);
        this.onTableClick = this.onTableClick.bind(this);
        this.viewer = this.viewer.bind(this)


        // structures for rendering elements
        this.structures = {

            tableHead: `
                <div class="d-flex justify-content-between w-75">
                    <div id="searchContainer" class="w-50 input-group mb-3">
                        <input id="searchField" type="text" class="form-control mr-3" placeholder="Enter poduct name" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button data-action="search" class="btn btn-success searchProductBtn" type="button" id="button-addon2">Search</button>
                    </div>
                    <button id="addNewProduct" type="button" class="btn btn-primary align-self-baseline">Add new</button>
                </div>
        
                <table id="productsTable" class="table table-hover w-75 p-3">
            
                    <thead id="productsTableHead">
                        <tr>
                            <th scope="col"class="name w-50">
                                <a data-sorting="name" href="#">Name</a>
                                <svg class="iconSorting iconSortingReverse" hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                <svg class="iconSorting iconSortingDirect" hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                            </th>
                            <th scope="col" class="price w-25">
                                <a data-sorting="price" href="#">Price</a>
                                <svg class="iconSorting iconSortingReverse" hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                <svg class="iconSorting iconSortingDirect" hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg> 
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
        
                    <tbody id="productsTableBody"></tbody>
        
                </table>`,

            tableBody: `<% list.forEach( (el, index) => { %>
                    <tr> 
                        <td>
                            <div class="d-flex justify-content-between">
                            <a href="#" data-id="<%=el.id%>" data-action="view"><%=el.name%></a>
                                <span class="text-light rounded-pill bg-secondary px-2"><%=el.count%></span>
                            </div>
                        </td> 
                        <td><%=table.priceMaker( el.price )%></td> 
                        <td class="d-flex justify-content-around"> 
                            <button type="button" class="btn btn-info" data-id="<%=el.id%>" data-action="edit">Edit</button> 
                            <button type="button" class="btn btn-danger" data-id="<%=el.id%>" data-action="delete">Delete</button> 
                        </td> 
                    </tr>
                <% }) %>`
        }

    }


    // renders the elements of the table and adds events
    start() {
        $('#tableContainer').html(this.structures.tableHead);
        this.renderTableBody('#productsTableBody');

        $('#productsTableHead').click( (ev) => {
            ev.preventDefault();
            
            if (ev.target.dataset.sorting) {
                this.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement);
            }
        });

        $('#addNewProduct').click( (ev) => {
            ev.preventDefault();
            this.updateItem();
        });
        
        $('#productsTableBody').on('click', 'a', this.onTableClick);
        $('#productsTableBody').on('click', 'button', this.onTableClick);
        $('#searchContainer').on('click', 'button', this.goSearch);
        $('#searchContainer').on('input', 'input', this.onInputSearchField);
        $('#searchContainer').keydown( this.goSearch);
    }


    // sort the data, filter thelist if we want to find somthing
    renderTableBody(elementId) {
        const {rule, direction} = this.state.sorting;
        const { search } = this.state;
        let items = this.state.items.slice();

        if (search !== '') {
            items = items.filter( (ev) => {
                return ev.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            });
        }

        if (rule !== '') {
            this.sorter.call(items, rule, direction);
            this.sortingMarkersRender(rule, direction);
        }
        this.render(this.structures.tableBody, items, elementId);
    }


    // the function that sorts the datat
    // it cn be used either for strings or numbers
    sorter(field, bool) {

        const sortingRule = (a,b) => {
            if (typeof a[field] == 'string' && typeof b[field] == 'string') {
                return a[field].toLowerCase().localeCompare(b[field].toLowerCase());
            } else {
                return a[field] - b[field];
            }
        }

        this.sort(sortingRule);
        
        if ( !bool ) {
            this.reverse();
        }
    }


    // shows and hides the markers of direction of products if we sort the data by name or price
    sortingMarkersRender(rule, direction) {
        if (rule !== '') {
            const selector = direction ? '.iconSortingDirect': '.iconSortingReverse';

            this.visibiliter(false, 0, '.iconSorting');
            this.visibiliter(true, document.querySelector(`.${rule}`), selector);
        }
    }


    // manages the click on the table body
    // it wathes the data-ection of the elements that got the event
    onTableClick(ev) {
        ev.preventDefault();
         
        if( $(ev.currentTarget).data('action') ) {
    
            const id = $(ev.currentTarget).data('id');
            const action = $(ev.currentTarget).data('action');
    
            if (action === 'delete') {
                this.onClickDelete(id);
            }
            if(action === 'edit') {
                this.updateItem(id);
            }
            if (action === 'view') {
                this.viewer(id);
            }
        }
    }


    // runs the deleting proces
    onClickDelete(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        });

        const modal = new DeleteConfirmation(this.currency, this.priceDelimiter, this.state.items[index] );
        modal.promiseYou().then( this.deletItem, this.onReject );
    }


    //recives the datat from promis and delete the element
    deletItem(data) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === data.id;
        });
        
        setTimeout( () => {
            this.state.items.splice(index, 1);
            localStorage.setItem('productList', JSON.stringify(this.state.items));
            this.renderTableBody('#productsTableBody');
        }, 750)
    }


    // tells us about rejects of promis.
    onReject() {
        console.log('action was rejected');
    }


    // runs the process of editing a position or creating new position
    updateItem(id) {
        let item;
        if (id) {
            const index = this.state.items.findIndex( (el) => {
                return el.id === id;
            });
            if (index !== -1) {
                item = Object.assign({}, this.state.items[index]);
            }
        }

        const form = new ProductForm(this.currency, this.priceDelimiter, item, this.delivery);
        form.promiseYou().then( this.updateData, this.onReject );
    }


    // shows the information about the product
    viewer(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        })

        const modal = new ProductInformation(this.currency, this.priceDelimiter, this.state.items[index]);
        modal.promiseYou().then(()=>{}, this.onReject)
    }


    // updade data. it is used either for creating new position or editing a postion in the list
    updateData(data) {
        
        setTimeout( () => {
            if (data.id) {
                const index = this.state.items.findIndex( (el) => {
                    return el.id === data.id;
                });

                this.state.items.splice(index, 1, data);

            } else {
                const count = this.state.items.length;

                if (count > 0) {
                    data.id = this.state.items[count - 1].id + 1;
                } else {
                    data.id = 1;
                }
                this.state.items.push(data);
            }
            localStorage.setItem('productList', JSON.stringify(this.state.items));
            this.renderTableBody('#productsTableBody');
        }, 750)
    }


    // udates the information about sorting in the state
    // and runs rerendering the body of the table
    onClickSorting(newRule, elementId, target) {
        super.onClickSorting(newRule, target);
        this.renderTableBody(elementId);
    }


    // rerender the full list of the products if value of the searching field is an empty string
    onInputSearchField(ev) {
        this.state.search = ev.currentTarget.value;
        if (ev.currentTarget.value === '') {
            this.renderTableBody('#productsTableBody');
        }
    }


    //  uns the update the body of the table if this.state.search is not empty
    goSearch(ev) {
        if (ev.type === 'click' || (ev.type === 'keydown' && ev.which === 13) ) {
            this.renderTableBody('#productsTableBody');
        }
    }


    // gets a number like 9000 and returns string like  $ 9,000.00 for rendering
    priceMaker(num) {
        return super.priceMaker(num, this.currency, this.priceDelimiter);
    }


    // it shows and hides arrows that show the current direction of sorting
    // choses container, passed argument can be a selector or 0 
    // if container 0 it looks for the arrow in the whole body
    // if bool argumets is true it shows if false it hides
    // targets - the list of passed selectors  
    visibiliter(bool, container, ...targets) {
        
        const cont = container === 0 ? document.querySelector('body') : container,
            fn = bool ? document.body.removeAttribute : document.body.setAttribute ;

        targets.forEach( (el) => {
            cont.querySelectorAll(el).forEach( (elem) => {
                // here the third argumend used only if the function is setAttribute 
                // it sets attr hidden as true
                // if the function is removeAttr it doesn't use this parametr
                fn.call(elem, 'hidden', 'true');
            })
        })
    }

}