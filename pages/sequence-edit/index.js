import { ajax } from "../../modules/ajax.js";
import { sequenceUrls } from "../../modules/sequenceUrls.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";


export class SequenceEditPage{
    constructor(parent){
        this.parent = parent;
    }

    get pageRoot(){
        return document.getElementById('sequence_edit_page')
    }

    getHTML(){
        return (
            `
            <div id="sequence_edit_page">
                <div class="card">
                    <div class="card_body">
                        <input type="text" class="card_title sequence-id input-group input-group-sm mb-3" id="sequence_id_input" placeholder="id последовательности (Редактирование)">
                        <div>
                            <input type="text" class="card_text sequence-name input-group input-group-sm mb-3" id="sequence_name_input" placeholder="Имя последовательности">
                            <input type="text" class="sequence_extra_info info_terms input-group input-group-sm mb-3" id="sequence_terms_input" placeholder="Члены последовательности">
                            <input type="text" class="sequence_extra_info input-group input-group-sm mb-3" id="sequence_keywords_input" placeholder="Ключи последовательности">
                            <input type="text" class="sequence_extra_info author input-group input-group-sm mb-3" id="sequence_author_input" placeholder="Автор">
                        </div>
                        <button class="btn btn-outline-dark" id="edit_button">Ок</button>
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

    render(){
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const editButton = this.pageRoot.querySelector('#edit_button');
        editButton.addEventListener('click', this.editButton.bind(this));
    }

    editButton(){
        const idInput = this.pageRoot.querySelector('#sequence_id_input');
        const nameInput = this.pageRoot.querySelector('#sequence_name_input');
        const authorInput = this.pageRoot.querySelector('#sequence_author_input');
        const termsInput = this.pageRoot.querySelector('#sequence_terms_input');
        const keywordsInput = this.pageRoot.querySelector('#sequence_keywords_input');

        const id = idInput.value.trim();
        const name = nameInput.value.trim();
        const author = authorInput.value.trim();

        const termsArray = (termsInput.value || '') 
            .split(',')
            .map(term => term.trim())
            .filter(term => term.length > 0); 

        const keywordsArray = (keywordsInput.value || '')
            .split(',')
            .map(keyword => keyword.trim())
            .filter(keyword => keyword.length > 0);

        const newCardData = {
            name: name,
            terms: termsArray,
            keywords: keywordsArray,
            author: author || '',
        };

        if (id){
            ajax.patch(sequenceUrls.updateSequenceById(idInput.value), newCardData);            
        }
        else{
            ajax.post(sequenceUrls.createSequence(), newCardData);
        }
    }
}