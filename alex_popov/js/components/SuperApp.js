'use strict';

class SuperApp {

    onClickSorting(newRule, sorting) {
        // super.onClickSorting(newRule, this.state.sorting)
        // console.log('-------------------------------')
        const{rule} = this.state.sorting
        // console.log(rule, newRule, this.state.sorting)
        if (rule === '') {
            // console.log('empty str')
            this.state.sorting.rule = newRule
            // console.log(this.state.sorting)
        } else if (newRule === rule) {
            // console.log('equ')
            this.state.sorting.direction = !this.state.sorting.direction
        } else if (newRule !== rule) {
            // console.log('another')
            this.state.sorting.rule = newRule;
            this.state.sorting.direction = true;
        }
    }

    priceMaker(num) {
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

    renderTableBody(construction, items, elementId) {
        let tmpl = _.template( construction );
        document.getElementById(elementId).innerHTML = tmpl({
            list: items
        });
    }

    sorter(items, field, bool) {
        // console.log(this)
        const sortingRule = ( a, b) => {
            if ( a[field] > b[field] ) {
                return 1
            }
            if ( a[field] < b[field] ) {
                return -1
            }
            return 0
        }

        // const items = this.state.items.slice();
        // items.sort(sortingRule)
        this.sort(sortingRule)
        
        if ( !bool ) {
            // items.reverse()
            this.reverse()
        }
        
        // return items;
    }

}