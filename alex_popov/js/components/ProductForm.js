console.log('pf');

class ProductForm extends Application {
    constructor() {
        super();
        this.structures = {
            select: '<option value="choose">choose</option> \
            <% list.forEach( (el, index) => { %> \
                <option value="<%=el%>"><%=el%></option> \
            <% }) %>',

            cities: '<% for( let country in list ) { %> \
                <div class="displayNone countryCities" data-country="<%=country%>"> \
                    <% list[country].forEach( (el) => { %> \
                        <div> \
                            <input type="checkbox" class="custom-control-input" id="<%=el%>"> \
                            <label class="custom-control-label" for="<%=el%>"><%=el%></label> \
                        </div> \
                    <% }) %> \
                </div> \
            <% } %>'
        }
    }

    onSubmitForm = (ev) => {
        ev.preventDefault()
        console.log('form submit')
    }

    onClickAll() {
        // console.log(this)
        const selectedCountry = $('#countriesSelector').val();
        console.log( $('#selectAll').prop("checked"))
        
        
        if (selectedCountry !== 'choose'){
            $(`[data-country="${selectedCountry}"]` ).find('input').prop('checked', $('#selectAll').prop("checked"))
        }

    }

    onSelectCountry() {
        // console.log( $('.countryCities') )
        // console.log(this.value)
        if (this.value !== 'choose') {
            $('#selectAll').attr('disabled', false)
            $('.countryCities').addClass('displayNone')
            $(`[data-country="${this.value}"]`).removeClass('displayNone')
        
            const inputs = $(`[data-country="${this.value}"]` ).find('input');
            let selected = 0;
            inputs.each( (i, el) => {
                // console.log( $(el).prop('checked') )
                if ( $(el).prop('checked') === false) {
                    console.log('false')
                    $('#selectAll').prop('checked', false)
                } else {
                    selected++
                }
            })

            if (selected === inputs.length) {
                $('#selectAll').prop('checked', true)
            }

        } else {
            $('#selectAll').attr('disabled', true)
            $('.countryCities').addClass('displayNone')
        }
    }
    on() {
        $('#an-container').removeClass('displayNone');
        $('.darker').removeClass('displayNone')

        $('#formCancel').on('click', this.off)

        $('#formSubmit').on('click', this.onSubmitForm)

        $('#selectAll').on('click', this.onClickAll)

        $('#countriesSelector').on('change', this.onSelectCountry)
    }

    off(ev) {
        ev.preventDefault()
        console.log('form cancel')
        $('#formCancel').off('click', this.onCancelform)
        $('#formSubmit').off('click', this.onSubmitForm)
        $('#selectAll').off('click', this.onClickAll)
        $('#selectAll').prop('checked', false);
        $('#an-container').addClass('displayNone');
        $('.darker').addClass('displayNone')
    }

    render(deliveryIformation) {
        const countries = Object.keys(deliveryIformation);
        super.render(this.structures.cities, deliveryIformation, '#deliveryCities' )
        super.render(this.structures.select, countries, '#countriesSelector');
    }


}