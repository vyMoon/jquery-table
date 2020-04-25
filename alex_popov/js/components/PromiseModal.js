// this class is the parent class for all popup form
// like form for confirmation of deleting and form for 
// adding a new product, for view of a product
// it has promiseYou method that will  pass into 
// a new promise

// every pop up, class  that will extend this class
// should have buttons that have #reject #resolve id
// it watches for events and can resolve of reject promise by this way
//render() method for adding html on the container and creates events on 
// elements that should have such watchers
// and check method that should to check information and decide can promise 
// be resolved or not.
// the check() method changes this.answer.ready in true ifeveruthing is ok
// and put data that should be passed further in this.answer.body

// also we cshould pass a such kind of information like currency simbol
// price delimiter that used for fircing price number into  $ 10,000 format
// if it is necesarry
// and information about the product that it working on at this moment
// and information about cities and countries that we can arrange delivery

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