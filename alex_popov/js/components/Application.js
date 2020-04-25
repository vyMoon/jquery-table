'use strict';

// parent class components in the application for aplication 

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
            pieces[0] = pieces[0].split('');
      
            for(let i = -3; (i * (-1) ) < pieces[0].length; i -=  4 ) {
                pieces[0].splice(i, 0, delimiter);
            }
            
            pieces[0] = pieces[0].join('');
        }
        return `${currency} ${pieces[0]}.${pieces[1]}`;
    }

    render(construction, items, elementId) {

        $( elementId ).html('');
        let tmpl = _.template( construction );  
        $( elementId ).html( tmpl( {list: items} ) );

    }

}