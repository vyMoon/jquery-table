class Darker {
    constructor() {
        this.structure = {
            tag: '<div/>',
            attr: {
                'class': 'screenFixed darker bg-dark'
            }
        }
    }

    render() {
        $( this.structure.tag, this.structure.attr ).insertAfter( '#productsTable' );
    }

    off() {
        $('.darker').remove();
    }
}