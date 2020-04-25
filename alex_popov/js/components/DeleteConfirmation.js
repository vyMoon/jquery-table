// component that render modal window for confirmation deleting of en element

class DeleteConfirmation extends PromiseModal{
    constructor(currency, priceDelimiter, productInformation) {
        super(currency, priceDelimiter, productInformation);

        this.darker = new Darker();

        // this.render = this.render.bind(this);

        this.structure = `<% list.forEach( ( el ) => { %>
        <div class="MC-container screenFixed d-flex flex-column justify-content-around align-items-center">
                <div class="modalConfirmation d-flex flex-column rounded text-white w-50">
                    <h4 class="mx-auto">You are going to delete </h4>
                    <h2 class="mx-auto" id="deletedContent"><%=el.name%></h2>
                    <h4 class="mx-auto">are you shure?</h4>
                    <div class="modalConfirmation-buttons d-flex justify-content-around mt-4 px-5">
                        <button id="reject" type="button" class="btn btn-info w-25">No</button>
                        <button id="resolve" type="button" class="btn btn-danger w-25">Yes</button>
                    </div>
                </div>
            </div>
        <% }) %>`;
    }
    
    render() {
        this.darker.render();
        super.render(this.structure, [ this.productInformation ] , '#modalcontainer');
    }

    check() {
        this.answer.ready = true;
        // this.answer.body = this.productInformation
    }


    off() {
        $('#modalcontainer').html('');
        this.darker.off();
    }
}