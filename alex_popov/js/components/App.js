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
                <td><a href="#" data-id="<%=index%>" data-action="view"><%=el.name%></a></td> \
                <td><%=el.count%></td> \
                <td><%=application.priceMaker( el.price )%></td> \
                <td class="d-flex justify-content-around"> \
                    <button type="button" class="btn btn-info" data-id="<%=index%>" data-action="edit">Edit</button> \
                    <button type="button" class="btn btn-danger" data-id="<%=index%>" data-action="delete">Delete</button> \
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
        }
    }

    renderTableBody(elementId) {
        const {rule, direction} = this.state.sorting
        let items = this.state.items.slice();
        // console.log(this.sortingMarkersRender(rule, direction))

        if (rule !== '') {
            // console.log('sort')
            this.sorter.call(items, items, rule, direction)
            this.sortingMarkersRender(rule, direction)
        }
        // console.log(items)
        // rule === '' ? true : items = this.sorter(items, rule, direction);

        super.renderTableBody(this.tableBodyConstruction, items, elementId);
    }
}