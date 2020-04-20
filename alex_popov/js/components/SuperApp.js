'use strict';

class Application {

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
        const pieces = Number(num).toFixed(2).split('.')
    
        if (pieces[0].length > 3) {
            pieces[0] = pieces[0].split('')
      
            for(let i = -3; (i * (-1) ) < pieces[0].length; i -=  4 ) {
                pieces[0].splice(i, 0, delimiter);
            }
            pieces[0] = pieces[0].join('')
        }
        return `${currency} ${pieces[0]}.${pieces[1]}`;
    }

    render(construction, items, elementId) {
        let tmpl = _.template( construction );

        $( elementId ).html('')

        $( elementId ).html( tmpl( {list: items} ) );
        // setTimeout(function() {
        //     $( elementId ).html( tmpl( {list: items} ) );
        // }, 1000)
    }

    // sorter(items, field, bool) {
    //     const sortingRule = ( a, b) => {
    //         if ( a[field] > b[field] ) {
    //             return 1
    //         }
    //         if ( a[field] < b[field] ) {
    //             return -1
    //         }
    //         return 0
    //     }

    //     this.sort(sortingRule)
        
    //     if ( !bool ) {
    //         this.reverse()
    //     }
    // }

    visibiliter(bool, container, ...targets) {
        const cont = container === 0 ? document.querySelector('body') : container,
        // const cont = container === 0 ? $('body') : container,
            fn = bool ? document.body.removeAttribute : document.body.setAttribute ;

        targets.forEach( (el) => {
            cont.querySelectorAll(el).forEach( (elem) => {
                fn.call(elem, 'hidden', 'true')
            })
        })
    }

}