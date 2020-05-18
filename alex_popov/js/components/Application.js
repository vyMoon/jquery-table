'use strict';

// parent class components in the application for aplication 

class Application {
    // the function changes the information about sorting in the state
    // first sorting is direct
    // second sorting by the same rule reverse the direction
    // if we change the rule of directon (we can sort by the price and by the name )
    // first dorting is direct 
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

    // gets number like 3000000 and returns string like $ 3,000,000.00 
    priceMaker(num, currency, delimiter) {
        const pieces = Number(num).toFixed(2).split('.')
    
        if (pieces[0].length > 3) {
            pieces[0] = pieces[0].split('');
      
            for(let i = -3; (i * (-1) ) < pieces[0].length; i -=  4 ) {
                pieces[0].splice(i, 0, delimiter);
            }
            pieces[0] = pieces[0].join('');
        }
        
        return `${currency} ${pieces[0]}.${pieces[1]}`;
    }

    //  exept structure as a string for lodash library
    // items is an array of values. mostly it is the information about the priduct
    // or the list of products
    // it should always be an array as the structure string uses foreach method
    render(construction, items, elementId) {

        $( elementId ).html('');
        let tmpl = _.template( construction );  
        $( elementId ).html( tmpl( {list: items} ) );

    }

}