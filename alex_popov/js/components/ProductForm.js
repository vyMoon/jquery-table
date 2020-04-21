
class ProductForm extends Application {
    constructor(currency, priceDelimiter, action, productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'delivery': {}}) {
        super();
        // this.on()
        this.currency = currency;
        this.priceDelimiter = priceDelimiter;
        this.action = action;
        this.productInformation = productInformation;

        this.validation = {
            'name': /^[\w]{1,}@[a-z]{1,}.[a-z]{2,}$/,
            'email': /^[\w-_]{1,}[@]{1}[a-z-_]{1,}[.]{1}[a-z]{2,}$/,
            'number': /^\d{1,}$/,
            'price': /^[0-9]*[.]?[0-9]{0,2}$/
        }

        this.onInputName = this.onInputName.bind(this);
        this.onInputEmail = this.onInputEmail.bind(this);
        this.onInputNumber = this.onInputNumber.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onClickPrice = this.onClickPrice.bind(this);
        
        // this.off = this.off.bind(this);

        this.cityAdder = this.cityAdder.bind(this);

        this.structures = {
            select: `<option value="choose">choose</option>
            <% list.forEach( (el, index) => { %>
                <option value="<%=el%>"><%=el%></option>
            <% }) %>`,

            cities: `<% for( let country in list ) { %> 
                <div class="displayNone countryCities" data-country="<%=country%>"> 
                    <% list[country].forEach( (el) => { %> 
                        <div>
                            <input type="checkbox" class="custom-control-input" id="<%=country%>-<%=el%>"> 
                            <label class="custom-control-label" for="<%=country%>-<%=el%>"><%=el%></label> 
                        </div> 
                    <% }) %> 
                </div> 
            <% } %>`
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

    invalidFieldDetected(id) {
        $( id ).focus();
        $( id ).addClass('is-invalid')
    }

    deliveryCreator() {
        const delivery = {}
        $('#deliveryCities').find('input:checked').each( (i, el) => {
            const data = el.id.split('-')
            // console.log(!( data[0] in dd) )
            if (! (data[0] in delivery) ) {
                // console.log('create')
                delivery[data[0]] = []
            }
            delivery[data[0]].push(data[1])
        })

        return delivery;
    }

    cityAdder(ev) {
        ev.preventDefault()

        if (this.productInformation.name === '' || this.productInformation.name.length < 5 || this.productInformation.name.length > 15) {
            this.invalidFieldDetected('#name')
        } else if ( !this.validation.email.test( this.productInformation.email ) ) {
            // console.log(this.validation.email.test( this.productInformation.email) )
            // console.log('eamail failed')
            this.invalidFieldDetected('#email')
            // $('#email').focus()
            // $('#email').addClass('is-invalid')
        } else if (this.productInformation.count === 0) {
            // console.log('count failed')
            this.invalidFieldDetected('#count')
            // $('#count').focus()
            // $('#count').addClass('is-invalid')
        } else if (this.productInformation.price === 0) {
            // console.log('price failed')
            this.invalidFieldDetected('#price')
        } else {
            console.log('everuthing is ok')
            this.productInformation.delivery = this.deliveryCreator();
            console.log(this.productInformation)
            this.action(this.productInformation)
            this.off(ev)
            // console.log(this)
        }


        //  // this.productInformation.dilivery[data[0]] = data[1]
    }

    // onSubmit = (ev) => {
    //     ev.preventDefault()
    //     // console.log('asdf' in this.productInformation.delivery)
    //     // console.log( $('#deliveryCities').find('input:checked') )
    //     // const delivery = {}
    //     const dd
    //     $('#deliveryCities').find('input:checked').each( this.cityAdder)
    //     // console.log(this.productInformation.dilivery)
    // }

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
        // console.log(isEmailValid)

        this.formHighliter(isEmailValid, $('#email'))

        this.productInformation.email = $('#email').val()
        
    }

    InputZeroValue(id, newVal) {
        // this.productInformation[id] = newVal;
        $(`#${id}`).val(newVal)
        if (newVal === '') {
            newVal = 0;
            this.formHighliter(false, $(`#${id}`) )
        }
        this.productInformation[id] = newVal;
    }

    onInputNumber(ev) {
        let count = ev.target.value.trim();
        const elementId = ev.target.id;
        let reg, reg2;
        
        if (elementId === 'count') {
            reg = this.validation.number;
            reg2 = /\D/g;
        } else if (elementId === 'price') {
            reg = this.validation.price;
            reg2 = /[^0-9.]/g;
        }

        if (count !== '') {
            if (reg.test(count)) {
                // console.log(count)
                const number = Number( (+count).toFixed(2) )
                this.productInformation[elementId] = number;
                this.formHighliter(true, $(`#${elementId}`))
                
            } else {
                // console.log('false')
                if (elementId === 'price') {
                    // console.log(1)
                    count = count.replace(reg2, '')
                    count = Number( (+count).toFixed(2) ) 
                } else if (elementId === 'count') {
                    // console.log(2)
                    count = Number( count.replace(reg2, '') )
                }
                // console.log(count)
                this.InputZeroValue(elementId, count)
                // console.log(count)
                if (count === 0) {
                    this.formHighliter(false, $(`#${elementId}`))
                }
            }

        } else {
            this.InputZeroValue(elementId, '')
            this.formHighliter(false, $(`#${elementId}`))
        }
    }

    onChangePrice(ev) {
        
        const val = ev.target.value.trim()
        if (val !== '') {
            ev.target.value = this.priceMaker(val, this.currency, this.priceDelimiter)
        }
    }

    onClickPrice(ev) {
        // console.log('click price')
        // console.log(ev.target.value)
        // console.log(this.productInformation.price)
        if (this.productInformation && ev.target.value) {
            console.log('change')
            ev.target.value = this.productInformation.price;
        }
    }

    onSelectCountry() {
        if (this.value !== 'choose') {
            $('#selectAll').attr('disabled', false)
            $('.countryCities').addClass('displayNone')
            $(`[data-country="${this.value}"]`).removeClass('displayNone')
        
            const inputs = $(`[data-country="${this.value}"]` ).find('input');
            let selected = 0;
            inputs.each( (i, el) => {
                // console.log( $(el).prop('checked') )
                if ( $(el).prop('checked') === false) {
                    // console.log('false')
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
        $('#formSubmit').on('click', this.cityAdder);
        $('#selectAll').on('click', this.onClickAll);
        $('#countriesSelector').on('change', this.onSelectCountry);

        $('#name').on('input', this.onInputName)
        $('#email').on('input', this.onInputEmail)
        $('#count').on('input', this.onInputNumber)
        $('#price').on('input', this.onInputNumber)
        $('#price').on('focusout', this.onChangePrice)
        $('#price').on('click', this.onClickPrice)

        // $('#deliveryCities').on('click', this.onClickCities)
    }

    off(ev) {
        ev.preventDefault()
        // this.offActions()
        $('#formCancel').off('click', this.onCancelform)
        $('#formSubmit').off('click', this.onSubmitForm)
        $('#selectAll').off('click', this.onClickAll)
        $('#countriesSelector').off('change', this.onSelectCountry);

        $('#name').off('input', this.onInputName)
        $('#email').off('input', this.onInputEmail)
        $('#count').off('input', this.onInputNumber)
        $('#price').off('input', this.onInputNumber)
        $('#price').off('focusout', this.onChangePrice)
        $('#price').off('click', this.onClickPrice)
        // $('#deliveryCities').off('click', this.onClickCities)

        $('#selectAll').prop('checked', false);

        $('#an-container').addClass('displayNone');
        $('.darker').addClass('displayNone')

        $('#addNewForm').find('input').val('')
        $('#addNewForm').find('input').removeClass('is-valid', 'is-invalid')
        $('#addNewForm').find('input').removeClass('is-invalid')
    }

    render(deliveryIformation) {
        const countries = Object.keys(deliveryIformation);
        super.render(this.structures.cities, deliveryIformation, '#deliveryCities' )
        super.render(this.structures.select, countries, '#countriesSelector');
    
        this.on()
    }

}