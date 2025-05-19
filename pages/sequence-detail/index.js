import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { sequenceUrls } from "../../modules/sequenceUrls.js";


export class SequenceDetailPage{
    constructor(parent, id){
        this.parent = parent;
        this.id = id;      
    }

    get pageRoot(){
        return document.getElementById('sequence_detail_page');
    }

    getHTML(){
        return (
            `
                <div id="sequence_detail_page">
                    <p id="sequence_id" class="sequence-id">'N/A'</p>
                    <p id="sequence_name">'N/A'<strong></strong></p>
                    <p id="sequence_author"><em>Author: 'N/A'</em></p>

                    <div class="card detail-card">
                        <div class="card_header">Sequence Terms</div>
                        <div class="card_body">
                            <p id="sequence_display" class="sequence_terms_display">
                            </p>
                        </div>
                    </div>
                </div>
            `
        )
    }

    clickBack(){
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getData() {
        ajax.get(sequenceUrls.getSequenceById   (this.id), (data) => {
            this.renderSequencePage(data);
    })
    }

    renderSequencePage(sequenceData){
        const formattedTerms = sequenceData.terms.join(', ');

        const displayElement = document.getElementById('sequence_display');
        if (displayElement){
            displayElement.textContent = formattedTerms;
        }
        
        const sequenceIdElement = document.getElementById('sequence_id');
        if (displayElement){
            sequenceIdElement.textContent = this.id;
        }

        const sequenceNameElement = document.getElementById('sequence_name');
        if (displayElement){
            sequenceNameElement.textContent = sequenceData.name;
        }

        const sequenceAuthorElement = document.getElementById('sequence_author');
        if (displayElement){
            sequenceAuthorElement.textContent = sequenceData.author;
        }
    }


    render(){
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}