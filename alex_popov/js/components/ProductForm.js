console.log('pf');

class ProductForm extends Application {
    constructor(productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'dilivery': {}}) {
        super();

        this.productInformation = productInformation;

        this.validation = {
            'name': /^[\w]{1,}@[a-z]{1,}.[a-z]{2,}$/,
            'email': /^[\w]{1,}[@]{1}[a-z]{1,}[.]{1}[a-z]{2,}$/,
            'number': /^\d{1,}$/,
            'price': /^\d{1,}.{0,1}\d{0,2}$/
        }
        // this.regExpNumber = /^\d{1,}$/;


        this.onInputName = this.onInputName.bind(this)
        this.onInputEmail = this.onInputEmail.bind(this)
        this.onInputNumber = this.onInputNumber.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onInputPrice = this.onInputPrice.bind(this)

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

    formHighliter(bool, el) {
        // const el = $(selector);
        if ( bool ) {
            el.addClass('is-valid')
            el.removeClass('is-invalid')
        } else {
            el.addClass('is-invalid')
            el.removeClass('is-valid')
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

    onInputName() {
        
        this.productInformation.name = String( $('#name').val() ).trim();
        
        if (this.productInformation.name.length > 15) {
            this.productInformation.name = this.productInformation.name.slice(0, -1);
            $('#name').val(this.productInformation.name)
        }

        this.formHighliter(this.productInformation.name.length > 4, $('#name') )
    }

    onInputEmail() {
        
        const el = $('#email')
        const isEmailValid = this.validation.email.test( el.val().toLowerCase() );
        
        if ( isEmailValid ) {
            this.productInformation.email = $('#email').val()
            this.formHighliter(isEmailValid, $('#email'))
            console.log(this.productInformation.email)
        } else {
            this.formHighliter(isEmailValid, $('#email'))
        }
        
    }

    onInputNumber() {
        const count = $('#count').val().trim();
        console.log(count)
        if (count !== '') {
            if (this.validation.number.test(count)) {
                const number = Number( (+count).toFixed() )
                this.productInformation.count = number;
                this.formHighliter(true, $('#count'))
                
            } else {
                $('#count').val(this.productInformation.count)
            }
        } else {
            this.formHighliter(false, $('#count'))
        }
    }

    onInputPrice() {

    }

    onChangePrice() {
        console.log(' changeprice')
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
            $('#selectAll').prop('checked', false)
            $('.countryCities').addClass('displayNone')
        }
    }
    on() {
        $('#an-container').removeClass('displayNone');
        $('.darker').removeClass('displayNone')

        $('#formCancel').on('click', this.off);
        $('#formSubmit').on('click', this.onSubmitForm);
        $('#selectAll').on('click', this.onClickAll);
        $('#countriesSelector').on('change', this.onSelectCountry);

        $('#name').on('input', this.onInputName)
        $('#email').on('input', this.onInputEmail)
        $('#count').on('input', this.onInputNumber)
        $('#price').on('input', this.onInputPrice)
        $('#price').on('change', this.onChangePrice)
    }

    off(ev) {
        ev.preventDefault()
        
        $('#formCancel').off('click', this.onCancelform)
        $('#formSubmit').off('click', this.onSubmitForm)
        $('#selectAll').off('click', this.onClickAll)
        $('#name').off('input', this.onInputName)
        $('#email').off('input', this.onInputEmail)
        $('#count').off('input', this.onInputNumber)
        $('#price').off('input', this.onInputPrice)
        $('#price').off('change', this.onChangePrice)

        $('#selectAll').prop('checked', false);

        $('#an-container').addClass('displayNone');
        $('.darker').addClass('displayNone')

        $('#addNewForm').find('input').val('')
    }

    render(deliveryIformation) {
        const countries = Object.keys(deliveryIformation);
        super.render(this.structures.cities, deliveryIformation, '#deliveryCities' )
        super.render(this.structures.select, countries, '#countriesSelector');
    }


}