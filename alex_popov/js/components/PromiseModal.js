class PromiseModal extends Application{
    constructor(currency, priceDelimiter, productInformation = {'name': '', 'email': '', 'count': 0, 'price': 0, 'delivery': {}}, delivery = null) {
        super()
        this.currency = currency;
        this.priceDelimiter = priceDelimiter;
        this.delivery = delivery;
        this.productInformation = productInformation;

        this.promiseYou = this.promiseYou.bind(this)

        this.answer = {
            ready: false,
            body: {}
        }
    }


    promiseYou(resolve, reject) {
        // console.log(1)
        this.render()
        
        $('#reject').on('click', onReject.bind(this) );
        $('#resolve').on('click', onResolve.bind(this) );

        function onResolve() {
            console.log('resss')
            this.check()
            if (this.answer.ready) {
                this.off();
                resolve(this.answer.body);
            }
            
        }
    
        function onReject() {
            console.log('rejjjjj')
            this.off();
            reject();
        }

    }
}