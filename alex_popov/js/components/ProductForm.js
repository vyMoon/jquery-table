// this class works with form that used for entering and editingg information about a product
// constructor recivew characters of currenct and delimiter
// action that used for daving new information and and object with information about a product
// if object wasn't passed idt has empty abject
// this situation can happen when user want to add a new product
class ProductForm extends PromiseModal {
    constructor(currency, priceDelimiter, productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'delivery': {}}, delivery ) {
        super(currency, priceDelimiter, productInformation, delivery);
        
        // this.currency = currency;
        // this.priceDelimiter = priceDelimiter;
        // this.action = action;
        // this.productInformation = productInformation;
        // this.delivery = delivery;
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
        this.off = this.off.bind(this);
        this.render = this.render.bind(this)

        // structures of elements
        // used for randering information about delivery for selectiong cities and countries
        this.structures = {
            form: `<% list.forEach( (el) => { %>
                    <div id="an-container" class=" screenFixed d-flex flex-column justify-content-around align-items-center">
                        <div class="modalAddition bg-light d-flex flex-column rounded-lg px-4 py-2 w-50" >
                            <h4 id="prodictDetails"><%=el%></h4>
                            <form class="border-top" id="addNewForm">
                                <div class="form-group ">
                                    <label for="name">Name</label>
                                    <input type="text" class="form-control form-control-sm" id="name" aria-describedby="emailHelp">
                                    <small class="form-text text-muted">name can have from 5 to 15 characters, and can't ontain spaces only</small>
                                </div>
                                <div class="form-group ">
                                    <label for="email">Supplier email</label>
                                    <input type="text" class="form-control form-control-sm" id="email" aria-describedby="emailHelp">
                                    <small class="form-text text-muted">valid email like example@mail.com</small>
                                </div>
                                <div class="form-groupw w-50">
                                    <label for="count">Count</label>
                                    <input type="text" class="form-control form-control-sm" id="count" aria-describedby="emailHelp">
                                    <small class=" text-danger form-text text-muted">Positive number only. Max length 15 symbols</small>
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="text" class="form-control form-control-sm" id="price" aria-describedby="emailHelp">
                                    <small class="form-text text-muted">Positive number only. Max length 15 symbols. If you want have price like 0.15 type it without 0 like .12 </small>
                                </div>
                
                                <div>
                                    <label class="" for="countriesSelector">Delivery:</label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <select class="form-control form-control-sm" id="countriesSelector"></select>
                                    </div>
                
                                    <div class="pl-5 col form-cities col my-1 overflow-auto pl-4">
                                        <div class="custom-checkbox d-flex flex-column">
                                            <div class="">
                                                <input disabled type="checkbox" class="custom-control-input" id="selectAll">
                                                <label class="custom-control-label" for="selectAll">Slect all</label>
                                            </div>
                                            <div id="deliveryCities"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class=" pt-1">
                                    <button type="submit" class="btn btn-info" id="resolve">Edit</button>
                                    <button type="submit" class="btn btn-danger" id="reject">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                <% }) %>`,

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


    render(resolve, reject) {
        // renders countries as options of the select element of the form
        // and renders cities as checkboxes
        const message = this.productInformation.name ? `Edit ${this.productInformation.name} item` : `Add new Item` ;
        const countries = Object.keys(this.delivery);

        super.render(this.structures.form, [ message ], '#modalcontainer');
        super.render(this.structures.cities, this.delivery, '#deliveryCities' );
        super.render(this.structures.select, countries, '#countriesSelector');
        // adds events
        this.on();
    }

    on() {
        // adds events and displays form and darker
        // if the object has information about product
        // (this information should be passed in counstructor)
        // it fills the form
        this.darker.render();

        if (this.productInformation.id) {
            this.formFiller();
        }

        $('#selectAll').on('click', this.onClickAll);
        $('#countriesSelector').on('change', this.onSelectCountry);

        $('#name').on('input', this.onInputName);
        $('#email').on('input', this.onInputEmail);
        $('#count').on('input', this.onInputNumber);
        $('#price').on('input', this.onInputNumber);
        $('#price').on('focusout', this.onChangePrice);
        $('#price').on('click', this.onClickPrice);
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
            $('#email').val(email);
        }
        if (count) {
            $('#count').val(count);
        }
        if (price) {
            $('#price').val(this.priceMaker(price, this.currency, this.priceDelimiter));
        }
        if (delivery) {
            for(let country in delivery) {
                delivery[country].forEach( (el) => {
                    $(`#${country}-${el}`).prop('checked', true);
                })
            }
        }
    }

    off(ev) {
        //removes events and hide the form and darker
        this.darker.off();

        $('#selectAll').off('click', this.onClickAll);
        $('#countriesSelector').off('change', this.onSelectCountry);
        $('#name').off('input', this.onInputName);
        $('#email').off('input', this.onInputEmail);
        $('#count').off('input', this.onInputNumber);
        $('#price').off('input', this.onInputNumber);
        $('#price').off('focusout', this.onChangePrice);
        $('#price').off('click', this.onClickPrice);

        $('#modalcontainer').html('');
    }

    check(ev) {
        // check the whol form. if a value is not correct this input get focus
        // cif everylthing is ok compound  delivery informatin and saves the product
        // ev.preventDefault();

        if (this.productInformation.name === '' || this.productInformation.name.length < 5 || this.productInformation.name.length > 15) {
            this.invalidFieldDetected('#name');
        } else if ( !this.validation.email.test( this.productInformation.email ) ) {
            this.invalidFieldDetected('#email');
        } else if (this.productInformation.count === 0) {
            this.invalidFieldDetected('#count');
        } else if (this.productInformation.price === 0) {
            this.invalidFieldDetected('#price');
        } else {
            this.answer.ready = true;
            this.answer.body = Object.assign({}, this.productInformation);
            this.answer.body.delivery = this.deliveryCreator();
        }
    }

    deliveryCreator() {
        // compounnd information about cities that are avialible for delivery
        // looks for checked checboxes and makes the object
        const delivery = {};
        $('#deliveryCities').find('input:checked').each( (i, el) => {
            const data = el.id.split('-');
            if (! (data[0] in delivery) ) {
                delivery[data[0]] = [];
            }
            delivery[data[0]].push(data[1]);
        })

        return delivery;
    }

    invalidFieldDetected(id) {
        // if there are incorrect values in the form 
        // if gives the focus to the input and error class
        $( id ).focus();
        $( id ).addClass('is-invalid');
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
        const element = $(`#${elementId}`);
        const reg = elementId == 'count' ? this.validation.number : this.validation.price ;
        const reg2 = elementId == 'count' ? /\D/g : /[^0-9.]/g ;

        count = count.replace(reg2, '');
        
        if (elementId === 'price') {
            let first = count.indexOf('.');
            let last =  count.lastIndexOf('.');

            while( first !== last) {
                count = count.split('');
                count.splice(first, 1);
                count =  count.join('');
                first = count.indexOf('.');
                last =  count.lastIndexOf('.');
            }
        }

        if ( count.length > 14 ) {
            element.val(count.slice(0,-1));
            return;
        }

        if (count !== '') {
            if ( count.charAt(0) === '0') {
                count = count.slice(1);
            }
            if (reg.test(count) && count.length <= 15 ) {
                // if the value is valid it daves it in the store and gives is-valid class
                element.val(count);
                const number = Number( (+count).toFixed(2) );
                this.productInformation[elementId] = number;
                        
             } else {
                element.val(count.slice(0,-1));
            }
        } else {
            this.productInformation[elementId] = 0;
            element.val('')
        }

        if ( element.val() === '' ) {
            this.formHighliter(false, $(`#${elementId}`));
        } else {
            this.formHighliter(true, $(`#${elementId}`));
        }
    }

    onChangePrice(ev) {
        // shows price as number if the element loose focus
        // $ 10,000.00 insted of 10000
        const val = ev.target.value.trim();
        if (val !== '' && val !== "0") {
            ev.target.value = this.priceMaker(val, this.currency, this.priceDelimiter);
        }
    }

    onClickPrice(ev) {
        // shows price as number if the element was clicked
        // 10000 insted of $ 10,000.00
        if (this.productInformation && ev.target.value) {
            ev.target.value = this.productInformation.price;
        }
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

    onSelectCountry() {
        // dispay the container that contains the cities of selected country
        // activates or disactivates select all cities element if it is necessary
        // if all the cities were checked selecet all wil be checked
        if (this.value !== 'choose') {
            $('#selectAll').attr('disabled', false);
            $('#selectAll').parent().addClass('border-bottom');
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
            $('#selectAll').parent().removeClass('border-bottom')
            $('.countryCities').addClass('displayNone');
        }
    }

    onClickAll() {
        // makes all the checkbox of cities checed or unchecked in the container with chosen country
        const selectedCountry = $('#countriesSelector').val();
        
        if (selectedCountry !== 'choose'){
            $(`[data-country="${selectedCountry}"]` ).find('input').prop('checked', $('#selectAll').prop("checked"));
        }
    }

}