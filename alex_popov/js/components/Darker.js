class Darker {
    constructor() {
        this.structure = {
            tag: '<div/>',
            attr: {
                'class': 'screenFixed darker'
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