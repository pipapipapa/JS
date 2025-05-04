import { concatenate } from "../../utils/concatenate.js";

export class SequenceCardComponent{
    constructor(parent){
        this.parent = parent;
    }

    getHTML(data){
        const termsPreview = concatenate(data.terms.slice(0, 15), ', ') + (data.terms.length > 15 ? '...' : '');
        const keywordsPreview = concatenate(data.keywords.slice(0, 5), ', ') + (data.keywords.length > 5 ? '...' : '');


        return (
            `
                <div class="card" data-sequence-card-id="${data.id}">
                    <div class="card_body">
                        <h5 class="card_title sequence-id">${data.id}</h5>
                        <p class="card_text sequence-name">${data.name.substring(0, 100)}...</p>
                        <p class="sequence_extra_info info_terms">Terms: ${termsPreview}</p>
                        <p class="sequence_extra_info">Keywords: ${keywordsPreview}</p>
                        <button class="btn btn-outline-dark" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            `
        )
    }

    addListeners(data, listener){
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener){
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}