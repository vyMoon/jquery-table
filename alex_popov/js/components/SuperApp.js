'use strict';

class SuperApp {

    visibiliter(bool, container, ...targets) {
        // console.log(container)
        // let fn;
        const cont = container === 0 ? document.querySelector('body') : container,
            fn = bool ? document.body.removeAttribute : document.body.setAttribute ;

        targets.forEach( (el) => {
            cont.querySelectorAll(el).forEach( (elem) => {
                fn.call(elem, 'hidden', 'true')
            })
        })
    }

    onClickSorting(newRule, target) {
        const{rule} = this.state.sorting

        if (rule === '') {
            this.state.sorting.rule = newRule;
        } else if (newRule === rule) {
            this.state.sorting.direction = !this.state.sorting.direction
        } else if (newRule !== rule) {
            this.state.sorting.rule = newRule;
            this.state.sorting.direction = true;
        }
    }

    priceMaker(num, currency, delimiter) {
        // const currency = '$';
        // console.log(num, currency)
        const pieces = num.toFixed(2).split('.')
    
        if (pieces[0].length > 3) {
            pieces[0] = pieces[0].split('')
      
            for(let i = -3; (i * (-1) ) < pieces[0].length; i -=  4 ) {
                pieces[0].splice(i, 0, delimiter);
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

}