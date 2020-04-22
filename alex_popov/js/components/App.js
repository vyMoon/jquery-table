class Table extends Application {
    constructor(key, fileId, currency, priceDelimiter, delivery) {
        super();
        this.fileId = fileId;
        this.key = key;
        this.delivery = delivery;

        this.currency = currency;
        this.priceDelimiter = priceDelimiter;

        this.state = {
            items: products.slice(),
            sorting: {
                rule: '',
                direction: true
            }
        }

        this.newItemAdder = this.newItemAdder.bind(this);
        this.itemEditer = this.itemEditer.bind(this);
        this.deletItem = this.deletItem.bind(this);

        this.structures = {
            tableBody1: `<% list.forEach( (el, index) => { %> 
                <tr> 
                    <td><a href="#" data-id="<%=el.id%>" data-action="view"><%=el.name%></a></td> 
                    <td><%=el.count%></td> 
                    <td><%=table.priceMaker( el.price )%></td> 
                    <td class="d-flex justify-content-around"> 
                        <button type="button" class="btn btn-info" data-id="<%=el.id%>" data-action="edit">Edit</button> 
                        <button type="button" class="btn btn-danger" data-id="<%=el.id%>" data-action="delete">Delete</button> 
                    </td> 
                </tr> 
            <% }) %>`,

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

    newItemAdder(newProduct) {
        // console.log(this)
        newProduct.id = this.state.items.length + 1;
        this.state.items.push(newProduct);

        // console.log(newProduct)
        this.renderTableBody('#productsTableBody')
    }

    itemEditer() {
        console.log('table edit item', this)
    }

    deleteItem(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        });

        const deleteConfirmation = new DeleteConfirmation(index, this.state.items[index].name )
            
        const p = new Promise( deleteConfirmation.render )
        p.then( this.deletItem, this.onReject )
    }

    deletItem(index) {
        setTimeout( () => {
            this.state.items.splice(index, 1) 
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
        const sortingRule = ( a, b) => {
            if ( a[field] > b[field] ) {
                return 1
            }
            if ( a[field] < b[field] ) {
                return -1
            }
            return 0
        }

        this.sort(sortingRule)
        
        if ( !bool ) {
            this.reverse()
        }
    }

    

    sortingMarkersRender(rule, direction) {
        if (rule !== '') {
            // console.log(rule, direction)
            const selector = direction ? '.iconSortingDirect': '.iconSortingReverse' ;

            this.visibiliter(false, 0, '.iconSorting');
            this.visibiliter(true, document.querySelector(`.${rule}`), selector);
            // this.visibiliter(true, $(`.${rule}`), selector);
        }
    }

    renderTableBody(elementId) {
        const {rule, direction} = this.state.sorting;
        const items = this.state.items.slice();
        // console.log( 'render', this.state)

        if (rule !== '') {
            // console.log('sort')
            this.sorter.call(items, items, rule, direction);
            this.sortingMarkersRender(rule, direction);
        }
        this.render(this.structures.tableBody, items, elementId);
    }

    addNewItem() {
        const form = new ProductForm(this.currency, this.priceDelimiter, this.newItemAdder, undefined);
        // console.log (this.addNewItem())
        // form.on()

        form.render(this.delivery)
        // this.newItemAdder()
        // form.action()

    }

    editItem(id) {
        // console.log( this.state.items )
        const productId = this.state.items.findIndex( (el) => {
            return el.id === id
        })

        const form = new ProductForm(this.currency, this.priceDelimiter, this.itemEditer, this.state.items[productId])

        form.render(this.delivery)
    }

    
}