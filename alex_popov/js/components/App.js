class App extends SuperApp {
    constructor(key, fileId, currency, priceDelimiter) {
        super();
        this.fileId = fileId;
        this.key = key;

        this.currency = currency;
        this.priceDelimiter = priceDelimiter;

        this.state = {
            items: products.slice(),
            sorting: {
                rule: '',
                direction: true
            }
        }

        this.tableBodyConstruction = '<% list.forEach( (el, index) => { %> \
            <tr> \
                <td><a href="#" data-id="<%=el.id%>" data-action="view"><%=el.name%></a></td> \
                <td><%=el.count%></td> \
                <td><%=application.priceMaker( el.price )%></td> \
                <td class="d-flex justify-content-around"> \
                    <button type="button" class="btn btn-info" data-id="<%=el.id%>" data-action="edit">Edit</button> \
                    <button type="button" class="btn btn-danger" data-id="<%=el.id%>" data-action="delete">Delete</button> \
                </td> \
            </tr> \
        <% }) %>'
    }

    onClickSorting(newRule, elementId, target) {
        super.onClickSorting(newRule, target);
        this.renderTableBody(elementId);
    }

    priceMaker(num) {
        return super.priceMaker(num, this.currency, this.priceDelimiter)
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
        super.renderTableBody(this.tableBodyConstruction, items, elementId);
    }

    deleteItem(id) {
        const index = this.state.items.findIndex( (el) => {
            return el.id === id;
        });

        // const p = new Promise(promiseF.bind(this))

        function promiseF(resolve, reject) {
            // console.log(this)
            $('#deletedContent').text(this.state.items[index].name)
            $('.darker').removeClass('displayNone')
            $('.MC-container').removeClass('displayNone')

            const solve = () => {
                console.log('ckikc')
                $('.darker').addClass('displayNone')
                $('.MC-container').addClass('displayNone')
                $('#rejectDel').off('click', reject)
                $('#solveDel').off('click', solve)
                resolve(index)
            }

            function reject() {
                console.log('reject')
                $('.darker').addClass('displayNone')
                $('.MC-container').addClass('displayNone')
                $('#rejectDel').off('click', reject)
                $('#solveDel').off('click', solve)
            }
            $('#rejectDel').on('click', reject )
            $('#solveDel').on('click', solve )
        }

        const next = (index) => {
            // console.log(this.state.items)
            console.log( this.state.items.splice(index, 1) )
            console.log(index)
            console.log(this.state.items)
            this.renderTableBody('#productsTableBody')
        }
        const p = new Promise(promiseF.bind(this))
        p.then( next )
    }
}