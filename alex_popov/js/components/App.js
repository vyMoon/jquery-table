class App extends SuperApp {
    constructor(key, fileId) {
        super();
        this.fileId = fileId;
        this.key = key;

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

    onClickSorting(newRule, elementId) {
        // // super.onClickSorting(newRule, this.state.sorting)
        // // console.log('-------------------------------')
        // const{rule} = this.state.sorting
        // // console.log(rule, newRule, this.state.sorting)
        // if (rule === '') {
        //     // console.log('empty str')
        //     this.state.sorting.rule = newRule
        //     // console.log(this.state.sorting)
        // } else if (newRule === rule) {
        //     // console.log('equ')
        //     this.state.sorting.direction = !this.state.sorting.direction
        // } else if (newRule !== rule) {
        //     // console.log('another')
        //     this.state.sorting.rule = newRule;
        //     this.state.sorting.direction = true;
        // }
        super.onClickSorting(newRule)
        this.renderTableBody(elementId);
    }

    renderTableBody(elementId) {
        const {rule, direction} = this.state.sorting
        let items = this.state.items.slice();
        // console.log(rule, direction)

        if (rule !== '') {
            // console.log('sort')
            this.sorter.call(items, items, rule, direction)
        }
        // console.log(items)
        // rule === '' ? true : items = this.sorter(items, rule, direction);

        super.renderTableBody(this.tableBodyConstruction, items, elementId);
    }
}