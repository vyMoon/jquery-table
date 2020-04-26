// component that render the window with information about a product

class ProductInformation extends PromiseModal{
    constructor( currency, priceDelimiter, productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'delivery': {}} ) {
        super( currency, priceDelimiter, productInformation );
        this.darker = new Darker();


        this.structure = {
            main: `<% list.forEach( ( el ) => { %>
                    
                        <div id="an-container" class=" screenFixed d-flex flex-column justify-content-around align-items-center">
                            <div class="modalViewer bg-light d-flex flex-column rounded-lg px-4 py-2 w-75" >
                                <h4 class="border-bottom"><%=el.name%></h4>
                                <div class="row">
                                    <div class="col">
                                        <h5>Supplier email</h5>
                                        <p><%=el.email%></p>
                                    </div>
                                    <div class="col border-left">
                                        <h5>Quantity</h5>
                                        <p><%=el.count%></p>
                                    </div>
                                    <div class="col border-left">
                                        <h5>Price</h5>
                                        <p><%= table.priceMaker( el.price )%></p>
                                    </div>
                                </div>
                                <h5 class="delivery">Can be delivered to</h5>
                                <div id="deliveryInformation" class="row pb-2">
                                    <div id="countries" class="modalViewer-deliveryInformation list-group w-25 overflow-auto"></div>
                                    <div id="cities" class="col modalViewer-deliveryInformation overflow-auto d-flex flex-wrap  align-content-start"></div>
                                </div>
                                <button type="button" class="btn btn-info" id="reject">Close</button> 
                                <button type="button" class="displayNone btn btn-info" id="resolve">Close</button>
                            </div>
                        </div>
                    </div>
                    
                <% }) %>`,

            countries: `<% list.forEach( (el) => { %>
                    <a data-country="<%=el%>" href="#" class="list-group-item list-group-item-action"><%=el%></a>
                <% }) %>`,

            cities: ` <% list.forEach( (el) => {  %>
                    <div><p>choose a country</p> </div>
                    <% for( let country in el) { %>
                        <div data-country="<%=country%>" class="displayNone col modalViewer-deliveryInformation overflow-auto d-flex flex-wrap  align-content-start">
                            <% el[country].forEach( (city) => { %>
                                <p class="px-2"><%=city%></p>
                            <% }) %>
                        </div>
                    <% } %>
                <% }) %>`
        }
    }

    render() {
        this.darker.render();
        const countries = Object.keys(this.productInformation.delivery);
        super.render(this.structure.main, [ this.productInformation ], '#modalcontainer');

        if (countries.length > 0) {
            super.render(this.structure.countries, countries,"#countries");
            super.render(this.structure.cities, [this.productInformation.delivery], '#cities');
        } else {
            $('.delivery').text('Delivery is not available');
        }
        $('#countries').on( 'click', 'a' , this.selector );
    }

    //  callback that render avialable cities fro delivery
    selector(ev) {
        const country = $(ev.currentTarget).data('country');
        $('#countries').find('a').removeClass('active');
        $(ev.currentTarget).addClass('active');
        $('#cities').find('div').addClass('displayNone');
        $('#cities').find(`div[data-country="${country}"]`).removeClass('displayNone');
    }

    off() {
        $('#countries').off( 'click', 'a' , this.selector );
        this.darker.off();
        $('#modalcontainer').html('');
    }

}