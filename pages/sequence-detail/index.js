import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";


export class SequenceDetailPage{
    constructor(parent, id, getDataFunc){
        this.parent = parent;
        this.id = id;
        this.getDataFunc = getDataFunc;

        const allData = this.getDataFunc();
        this.sequenceData = allData.find(seq => seq.id === this.id);

        if (!this.sequenceData){
             this.sequenceData = { id: this.id, name: "Error: Not Found", terms: [], keywords: [], author: "" };
        }

        this.displayTerms = [...this.sequenceData.terms];
    }

    get pageRoot(){
        return document.getElementById('sequence_detail_page');
    }

    getHTML(){
        return (
            `
                <div id="sequence_detail_page">
                    <p class="sequence-id">${this.sequenceData.id}</p>
                    <p><strong>${this.sequenceData.name}</strong></p>
                    <p class="sequence_author"><em>Author: ${this.sequenceData.author || 'N/A'}</em></p>

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

    displaySequenceTerms(){
        const formattedTerms = this.displayTerms.join(', ');

        const displayElement = document.getElementById('sequence_display');
        if (displayElement){
            displayElement.textContent = formattedTerms;
        }
    }


    render(){
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.displaySequenceTerms();
    }
}