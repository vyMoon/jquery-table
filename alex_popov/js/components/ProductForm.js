// this class works with form that used for entering and editingg information about a product
// constructor recivew characters of currenct and delimiter
// action that used for daving new information and and object with information about a product
// if object wasn't passed idt has empty abject
// this situation can happen when user want to add a new product
class ProductForm extends Application {
    constructor(currency, priceDelimiter, action, productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'delivery': {}}) {
        super();
        
        this.currency = currency;
        this.priceDelimiter = priceDelimiter;
        this.action = action;
        this.productInformation = productInformation;
        // regular expressions for checking data
        this.validation = {
            'name': /^[\w]{1,}@[a-z]{1,}.[a-z]{2,}$/,
            'email': /^[\w-_]{1,}[@]{1}[a-z-_]{1,}[.]{1}[a-z]{2,}$/,
            'number': /^\d{1,}$/,
            'price': /^[0-9]*[.]?[0-9]{0,2}$/
        }

        this.darker = new Darker();

        // binding functions that work with data about product
        this.onInputName = this.onInputName.bind(this);
        this.onInputEmail = this.onInputEmail.bind(this);
        this.onInputNumber = this.onInputNumber.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onClickPrice = this.onClickPrice.bind(this);
        this.productEditer = this.productEditer.bind(this);
        this.off = this.off.bind(this);

        // structures of elements
        // used for randering information about delivery for selectiong cities and countries
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



    deliveryCreator() {
        // compounnd information about cities that are avialible for delivery
        // looks for checked checboxes and makes the object
        const delivery = {}
        $('#deliveryCities').find('input:checked').each( (i, el) => {
            const data = el.id.split('-');
            if (! (data[0] in delivery) ) {
                delivery[data[0]] = [];
            }
            delivery[data[0]].push(data[1]);
        })

        return delivery;
    }

    formHighliter(bool, el) {
        // gives error class for an imput if it was checed as correct or incorrect
        if ( bool ) {
            el.addClass('is-valid');
            el.removeClass('is-invalid');
        } else {
            el.addClass('is-invalid');
            el.removeClass('is-valid');
        }
    }

    inputIncorectNumber(id, newVal) {
        // I supposed if the price or count values get incoret value
        // it stores 0 if every simbols are not a digit
        // and if price got before 100 and then got 'f/ for example
        // it should store 100 and miss 'f' after 100
        if( newVal !== '') {
            $(`#${id}`).val(newVal);
        }
        
        if (newVal === '') {
            newVal = 0;
            this.formHighliter(false, $(`#${id}`) )
        }
        this.productInformation[id] = newVal;
    }

    invalidFieldDetected(id) {
        // if there are incorrect values in the form 
        // if gives the focus to the input and error class
        $( id ).focus();
        $( id ).addClass('is-invalid');
    }    

    off(ev) {
        //removes events and hide the form and darker
        ev.preventDefault()
        // console.log(this)
        this.darker.off()

        $('#formCancel').off('click', this.onCancelform);
        $('#formSubmit').off('click', this.onSubmitForm);
        $('#selectAll').off('click', this.onClickAll);
        $('#countriesSelector').off('change', this.onSelectCountry);

        $('#name').off('input', this.onInputName);
        $('#email').off('input', this.onInputEmail);
        $('#count').off('input', this.onInputNumber);
        $('#price').off('input', this.onInputNumber);
        $('#price').off('focusout', this.onChangePrice);
        $('#price').off('click', this.onClickPrice);

        $('#selectAll').prop('checked', false);

        $('#an-container').addClass('displayNone');
        $('.darker').addClass('displayNone')

        $('#addNewForm').find('input').val('');
        $('#addNewForm').find('input').removeClass('is-valid', 'is-invalid');
        $('#addNewForm').find('input').removeClass('is-invalid');
    }

    formFiller() {
        // the form filler function
        // it is used in on() function of this object
        // the priceMker is the function that is in the parent boject
        const {name, email, count, price, delivery} = this.productInformation;

        if (name) {
            $('#name').val(name);
        }
        if (email) {
            $('#email').val(email)
        }
        if (count) {
            $('#count').val(count)
        }
        if (price) {
            $('#price').val(this.priceMaker(price, this.currency, this.priceDelimiter))
        }
        if (delivery) {
            for(let country in delivery) {
                delivery[country].forEach( (el) => {
                    // console.log(`${country}-${el}`)
                    // console.log( $(`#${country}-${el}`) )
                    $(`#${country}-${el}`).prop('checked', true)
                })
            }
        }
    }

    on() {
        // adds events and displays form and darker
        // if the object has information about product
        // (this information should be passed in counstructor)
        // it fills the form
        this.darker.render()
        if (this.productInformation.id) {
            this.formFiller()
        }

        $('#an-container').removeClass('displayNone');
        $('.darker').removeClass('displayNone');

        $('#formCancel').on('click', this.off);
        $('#formSubmit').on('click', this.productEditer);
        $('#selectAll').on('click', this.onClickAll);
        $('#countriesSelector').on('change', this.onSelectCountry);

        $('#name').on('input', this.onInputName);
        $('#email').on('input', this.onInputEmail);
        $('#count').on('input', this.onInputNumber);
        $('#price').on('input', this.onInputNumber);
        $('#price').on('focusout', this.onChangePrice);
        $('#price').on('click', this.onClickPrice);
    }

    onChangePrice(ev) {
        // shows price as number if the element loose focus
        // $ 10,000.00 insted of 10000
        const val = ev.target.value.trim();
        if (val !== '' && val !== "0") {
            console.log(val === '0')
            ev.target.value = this.priceMaker(val, this.currency, this.priceDelimiter);
        }
    }

    onClickAll() {
        // makes all the checkbox of cities checed or unchecked in the container with chosen country
        const selectedCountry = $('#countriesSelector').val();
        
        if (selectedCountry !== 'choose'){
            $(`[data-country="${selectedCountry}"]` ).find('input').prop('checked', $('#selectAll').prop("checked"));
        }
    }

    onClickPrice(ev) {
        // shows price as number if the element was clicked
        // 10000 insted of $ 10,000.00
        if (this.productInformation && ev.target.value) {
            ev.target.value = this.productInformation.price;
        }
    }

    onInputName() {
        // checks the name value of the prosuct if the number of caharacters in the name value
        // less tham 5 the input got is-invalid class
        // user cant enter more than 15 charecters for the name value
        // so we keep users of annoying situations with filling the form
        this.productInformation.name = String( $('#name').val() ).trim();
        
        if (this.productInformation.name.length > 15) {
            this.productInformation.name = this.productInformation.name.slice(0, -1);
            $('#name').val(this.productInformation.name);
        }

        this.formHighliter(this.productInformation.name.length > 4, $('#name') );
    }

    onInputEmail() {
        // saves email value into store and give the input error class
        // I suppesed that  this is only one value that can be incorrect in the sotre
        const el = $('#email')
        const isEmailValid = this.validation.email.test( el.val().toLowerCase() );
        this.productInformation.email = $('#email').val();

        this.formHighliter(isEmailValid, $('#email'));
    }

    onInputNumber(ev) {
        // keeps price and count values in the state as numbers
        let count = ev.target.value.trim();
        const elementId = ev.target.id;
        let reg, reg2;
        //chooses reg exp for price of count
        if (elementId === 'count') {
            reg = this.validation.number;
            reg2 = /\D/g;
        } else if (elementId === 'price') {
            reg = this.validation.price;
            reg2 = /[^0-9.]/g;
        }

        if (count !== '') {
            if (reg.test(count)) {
                // if the value is valid it daves it in the store and gives is-valid class
                const number = Number( (+count).toFixed(2) );
                this.productInformation[elementId] = number;
                this.formHighliter(true, $(`#${elementId}`));
                
            } else {
                // if value has incorrect characters this characters will be replaced 
                // and the value in the input and in the state will have correct value 
                // with out incorrect characters
                if (elementId === 'price') {
                    count = count.replace(reg2, '');
                    count = Number( (+count).toFixed(2) ) ;
                } else if (elementId === 'count') {
                    
                    count = Number( count.replace(reg2, '') );
                }
                
                this.inputIncorectNumber(elementId, count);
                
                if (count === 0) {
                    this.formHighliter(false, $(`#${elementId}`));
                }
            }

        } else {
            // if the value in the input is empty string
            // store 0 (nmber in the sotre) and add is-invalid class
            this.inputIncorectNumber(elementId, '');
            this.formHighliter(false, $(`#${elementId}`));
        }
    }

    onSelectCountry() {
        // dispay the container that contains the cities of selected country
        // activates or disactivates select all cities element if it is necessary
        // if all the cities were checked selecet all wil be checked
        if (this.value !== 'choose') {
            $('#selectAll').attr('disabled', false);
            $('.countryCities').addClass('displayNone');
            $(`[data-country="${this.value}"]`).removeClass('displayNone');
        
            const inputs = $(`[data-country="${this.value}"]` ).find('input');
            let selected = 0;
            inputs.each( (i, el) => {

                if ( $(el).prop('checked') === false) {
                    $('#selectAll').prop('checked', false);
                } else {
                    selected++;
                }
            })

            if (selected === inputs.length) {
                $('#selectAll').prop('checked', true);
            }

        } else {
            $('#selectAll').attr('disabled', true);
            $('#selectAll').prop('checked', false);
            $('.countryCities').addClass('displayNone');
        }
    }

    productEditer(ev) {
        // check the whol form. if a value is not correct this input get focus
        // cif everylthing is ok compound  delivery informatin and saves the product
        ev.preventDefault();

        if (this.productInformation.name === '' || this.productInformation.name.length < 5 || this.productInformation.name.length > 15) {
            this.invalidFieldDetected('#name');
        } else if ( !this.validation.email.test( this.productInformation.email ) ) {
            this.invalidFieldDetected('#email');
        } else if (this.productInformation.count === 0) {
            this.invalidFieldDetected('#count');
        } else if (this.productInformation.price === 0) {
            this.invalidFieldDetected('#price');
        } else {
            this.productInformation.delivery = this.deliveryCreator();
            this.action(this.productInformation);
            this.off(ev);
        }
    }

    render(deliveryIformation) {
        // renders countries as options of the select element of the form
        // and renders cities as checkboxes
        const countries = Object.keys(deliveryIformation);

        super.render(this.structures.cities, deliveryIformation, '#deliveryCities' );
        super.render(this.structures.select, countries, '#countriesSelector');
        // adds events
        this.on();
    }

}