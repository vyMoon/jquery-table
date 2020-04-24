class DeleteConfirmation extends Application{
    constructor(index, name) {
        super();

        this.index = index;
        this.name = name;
        this.darker = new Darker();

        this.render = this.render.bind(this);

        this.structure = `<% list.forEach( ( el ) => { %>
            <% console.log(el) %>
        <div class="MC-container screenFixed d-flex flex-column justify-content-around align-items-center">
                <div class="modalConfirmation d-flex flex-column rounded text-white w-50">
                    <h4 class="mx-auto">You are going to delete </h4>
                    <h2 class="mx-auto" id="deletedContent"><%=el.name%></h2>
                    <h4 class="mx-auto">are you shure?</h4>
                    <div class="modalConfirmation-buttons d-flex justify-content-around mt-4 px-5">
                        <button id="rejectDel" type="button" class="btn btn-success w-25">No</button>
                        <button id="solveDel" type="button" class="btn btn-danger w-25">Yes</button>
                    </div>
                </div>
            </div>
        <% }) %>`;
    }

    render(resolve, reject) {
        
        this.darker.render();
        super.render(this.structure, [ {name: this.name} ] , '#confirmationContainer');

        $('#rejectDel').on('click', onReject.bind(this) );
        $('#solveDel').on('click', onResolve.bind(this) );

        function onResolve() {
            this.darker.off();
            this.off();

            resolve(this.index);
        }
    
        function onReject() {
            this.darker.off();
            this.off();

            reject();
        }
    }

    off() {
        $('#confirmationContainer').html('');
    }
}