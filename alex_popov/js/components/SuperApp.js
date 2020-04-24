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

    visibiliter(bool, container, ...targets) {
        // it shows and hides arrows that show the current direction of sorting
        // choses container, passed argument can be a selector or 0 
        // if container 0 it looks for the arrow in the whole body
        // if bool argumets is true it shows if false it hides
        // targets - the list of passed selectors  
        const cont = container === 0 ? document.querySelector('body') : container,
            fn = bool ? document.body.removeAttribute : document.body.setAttribute ;

        targets.forEach( (el) => {
            cont.querySelectorAll(el).forEach( (elem) => {
                // here the third argumend used only if the function is setAttribute 
                // it sets attr hidden as true
                // if the function is removeAttr it doesn't use this parametr
                fn.call(elem, 'hidden', 'true');
            })
        })
    }

}