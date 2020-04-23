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
        this.onInputSearchField = this.onInputSearchField.bind(this)

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


    deletItem(index) {
        setTimeout( () => {
            this.state.items.splice(index, 1);
            localStorage.setItem('productList', JSON.stringify(this.state.items))
            this.renderTableBody('#productsTableBody')
        }, 750)
    }

    onReject() {
        console.log('action was rejected')
    }

    onClickSorting(newRule, elementId, target) {
        super.onClickSorting(newRule, target);
        this.renderTableBody(elementId);
    }

    priceMaker(num) {
        return super.priceMaker(num, this.currency, this.priceDelimiter)
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

    // renderTableBody(elementId) {
    //     const {rule, direction} = this.state.sorting;
    //     const { search } = this.state;
    //     let items = this.state.items.slice();

    //     if (search !== '') {
    //         items = items.filter( (ev) => {
    //             return ev.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    //         })
    //     }

    //     if (rule !== '') {
    //         this.sorter.call(items, items, rule, direction);
    //         this.sortingMarkersRender(rule, direction);
    //     }

    //     $('#tableContainer').html(this.structures.tableHead)
    //     this.render(this.structures.tableBody, items, elementId);
    // }

    deleteItem(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        });

        const deleteConfirmation = new DeleteConfirmation(index, this.state.items[index].name )
            
        const p = new Promise( deleteConfirmation.render )
        p.then( this.deletItem, this.onReject )
    }

    updateItem(id) {
        let item;
        if (id) {
            const index = this.state.items.findIndex( (el) => {
                return el.id === id;
            });
            if (index !== -1) {
                item = this.state.items[index]
            }
        }
        // console.log(item);

        const form = new ProductForm(this.currency, this.priceDelimiter, this.newItemAdder, item, this.delivery);
        const p = new Promise( form.render )
        p.then( this.updateData, this.onReject )
    }

    updateData(data) {
        
        setTimeout( () => {
            // console.log(this)
            if (data.id) {
                const index = this.state.items.findIndex( (el) => {
                    return el.id === data.id
                });

                this.state.items.splice(index, 1, data)

            } else {
                data.id = this.state.items.length + 1;
                this.state.items.push(data);
            }
            localStorage.setItem('productList', JSON.stringify(this.state.items))
            this.renderTableBody('#productsTableBody')
        }, 750)
    }

    onInputSearchField(ev) {
        // console.log('input search')
        this.state.search = ev.currentTarget.value;
        // console.log(this.state)
        if (ev.currentTarget.value === '') {
            this.renderTableBody('#productsTableBody')
        }
    }

    goSearch() {
        // console.log('search')
        this.renderTableBody('#productsTableBody');
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

        $('#tableContainer').html(this.structures.tableHead);
        this.render(this.structures.tableBody, items, elementId);
    }

    start() {
        $('#tableContainer').html(this.structures.tableHead)
        this.renderTableBody('#productsTableBody');

        $('#addNewProduct').click( (ev) => {
            ev.preventDefault();
            this.updateItem()
        });
        
        $('#searchContainer').on('click', 'button', function(ev) {
            ev.preventDefault()
            // console.log( $(this).data('action'))
            this.goSearch()
        })
        
        $('#searchContainer').on('input', 'input', this.onInputSearchField)
        
        $('#searchContainer').keydown( (ev) => {
            if (ev.which === 13) {
                // console.log('search')
                this.goSearch()
            }
        });
    }


}