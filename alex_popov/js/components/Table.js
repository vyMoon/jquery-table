class Table extends Application {
    constructor(key, fileId, currency, priceDelimiter, delivery) {
        super();
        this.fileId = fileId;
        this.key = key;
        this.delivery = delivery;

        this.currency = currency;
        this.priceDelimiter = priceDelimiter;

        this.state = {
            items: JSON.parse( localStorage.getItem('productList') ),
            search: '',
            sorting: {
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

    start() {
        $('#tableContainer').html(this.structures.tableHead)
        this.renderTableBody('#productsTableBody');


        $('#productsTableHead').click( (ev) => {
            ev.preventDefault()
            
            if (ev.target.dataset.sorting) {
                this.onClickSorting(ev.target.dataset.sorting, '#productsTableBody', ev.target.parentElement)
            }
        });

        $('#addNewProduct').click( (ev) => {
            ev.preventDefault()
            this.updateItem()
        });
        
        $('#productsTableBody').on('click', 'a', this.onTableClick);
        $('#productsTableBody').on('click', 'button', this.onTableClick);
        $('#searchContainer').on('click', 'button', this.goSearch)
        $('#searchContainer').on('input', 'input', this.onInputSearchField)
        $('#searchContainer').keydown( this.goSearch);
    }


    renderTableBody(elementId) {
        const {rule, direction} = this.state.sorting;
        const { search } = this.state;
        let items = this.state.items.slice();

        if (search !== '') {
            items = items.filter( (ev) => {
                return ev.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            })
        }

        if (rule !== '') {
            this.sorter.call(items, items, rule, direction);
            this.sortingMarkersRender(rule, direction);
        }
        this.render(this.structures.tableBody, items, elementId);
    }

    sorter(items, field, bool) {

        const sortingRule = (a,b) => {
            if (typeof a[field] == 'string' && typeof b[field] == 'string') {
                return a[field].toLowerCase().localeCompare(b[field].toLowerCase())
            } else {
                return a[field] - b[field];
            }
        }

        this.sort(sortingRule)
        
        if ( !bool ) {
            this.reverse()
        }
    }

    sortingMarkersRender(rule, direction) {
        if (rule !== '') {
            const selector = direction ? '.iconSortingDirect': '.iconSortingReverse' ;

            this.visibiliter(false, 0, '.iconSorting');
            this.visibiliter(true, document.querySelector(`.${rule}`), selector);
        }
    }

    onTableClick(ev) {
        ev.preventDefault();
         
        if( $(ev.currentTarget).data('action') ) {
    
            const id = $(ev.currentTarget).data('id')
            const action = $(ev.currentTarget).data('action')
    
            if (action === 'delete') {
                this.onClickDelete(id)
            }
            if(action === 'edit') {
                this.updateItem(id)
            }
            if (action === 'view') {
                this.viewer(id)
            }
        }
    }

    onClickDelete(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        });

        const deleteConfirmation = new DeleteConfirmation(this.currency, this.priceDelimiter, this.state.items[index] )
            
        // const deleteConfirmation = new DeleteConfirmation(index, this.state.items[index].name )
            
        const p = new Promise( deleteConfirmation.promiseYou )
        p.then( this.deletItem, this.onReject )
    }

    deletItem(data) {
        // console.log(data)
        const index = this.state.items.findIndex( (el) => {
            return el.id === data.id
        })
        
        setTimeout( () => {
            this.state.items.splice(index, 1);
            localStorage.setItem('productList', JSON.stringify(this.state.items))
            this.renderTableBody('#productsTableBody')
        }, 750)
    }

    onReject() {
        console.log('action was rejected')
    }

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
        // console.log(item)
        const form = new ProductForm(this.currency, this.priceDelimiter, item, this.delivery);
        console.log(form)
        const p = new Promise( form.promiseYou )
        p.then( this.updateData, this.onReject )
    }

    viewer(id) {
        // console.log(id)
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        })
        // console.log(this.currency, this.priceDelimiter, this.state.items[index])
        const modal = new ProductInformation(this.currency, this.priceDelimiter, this.state.items[index])
        // console.log( modal )
            
        const p = new Promise( modal.promiseYou )
        p.then( this.deletItem, this.onReject )
    }

    updateData(data) {
        
        setTimeout( () => {
            // console.log(data)
            if (data.id) {
                const index = this.state.items.findIndex( (el) => {
                    return el.id === data.id
                });

                this.state.items.splice(index, 1, data)

            } else {
                const count = this.state.items.length;
                // const base = localStorage.getItem('productList');
                // console.log(count)
                if (count > 0) {
                    data.id = this.state.items[count - 1].id + 1;
                    // console.log(this.state.items)
                } else {
                    data.id = 1;
                }
                this.state.items.push(data);
            }
            localStorage.setItem('productList', JSON.stringify(this.state.items))
            this.renderTableBody('#productsTableBody')
        }, 750)
    }

    onClickSorting(newRule, elementId, target) {
        super.onClickSorting(newRule, target);
        this.renderTableBody(elementId);
    }

    onInputSearchField(ev) {
        this.state.search = ev.currentTarget.value;
        console.log(this.state)
        if (ev.currentTarget.value === '') {
            this.renderTableBody('#productsTableBody')
        }
    }

    goSearch(ev) {
        if (ev.type === 'click' || (ev.type === 'keydown' && ev.which === 13) ) {
            this.renderTableBody('#productsTableBody');
        }
    }

    priceMaker(num) {
        return super.priceMaker(num, this.currency, this.priceDelimiter)
    }

    

    visibiliter(bool, container, ...targets) {
        // it shows and hides arrows that show the current direction of sorting
        // choses container, passed argument can be a selector or 0 
        // if container 0 it looks for the arrow in the whole body
        // if bool argumets is true it shows if false it hides
        // targets - the list of passed selectors  
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