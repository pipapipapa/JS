import { SequenceCardComponent } from "../../components/sequence-card/index.js";
import { SequenceDetailPage } from "../sequence-detail/index.js";
import { SequenceEditPage } from "../sequence-edit/index.js";
import { ajax } from "../../modules/ajax.js";
import { sequenceUrls } from "../../modules/sequenceUrls.js";


export class MainPage{
    constructor(parent){
        this.parent = parent;
        this.filterKeyword = "";
    }

    get pageRoot(){
        return document.getElementById('main_page')
    }

    getHTML(){
        return (
            `
                <div id="main_page" class="main_page">
                    <h2>Энциклопедия ℤ последовательностей</h2>
                    <div class="controls_form">
                        <input type="text" class="input-group input-group-sm mb-3" id="filter_keyword" placeholder="Поиск по ключам и ID">
                        <button class="btn btn-outline-secondary btn-sm" id="filter_btn">Поиск</button>
                        <button class="btn btn-outline-secondary btn-sm" id="add_card_btn">Добавить/редактировать</button>
                        <button class="btn btn-outline-secondary btn-sm" id="delete_card_btn">Удалить</button>
                    </div>
                    <div class="gallery">
                    </div>
                </div>
            `
        )
    }

    getData() {
        ajax.get(sequenceUrls.getSequences(), (data) => {
            this.renderCards(data);
        })
    }

    renderCards(data){
        const gallery = this.pageRoot.querySelector('.gallery');
        if (!gallery){
            return;
        }

        gallery.innerHTML = "";

        data.forEach((item) => {
            const keyword = this.filterKeyword.toLowerCase();

            const nameMatch = item.name.toLowerCase().includes(keyword);
            const idMatch = item.id.toLowerCase().includes(keyword);
            const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(keyword));

            if (!keyword || nameMatch || idMatch || keywordMatch){
                const sequenceCard = new SequenceCardComponent(gallery);
                sequenceCard.render(item, this.clickCard.bind(this));
            }
        });
    }

    render(){
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const filterInput = this.pageRoot.querySelector('#filter_keyword');
        const filterButton = this.pageRoot.querySelector('#filter_btn');
        const addButton = this.pageRoot.querySelector('#add_card_btn');
        const deleteButton = this.pageRoot.querySelector('#delete_card_btn');

        filterButton.addEventListener('click', () => {
            this.filterKeyword = filterInput.value || '';
            this.getData();
        });

        addButton.addEventListener('click', this.addCard.bind(this));
        deleteButton.addEventListener('click', this.removeCard.bind(this));

        this.getData();
    }

    clickCard(e){
        const cardId = e.target.dataset.id;
        const sequencePage = new SequenceDetailPage(this.parent, cardId);
        sequencePage.render();
    }

    addCard(){
        const sequenceEditPage = new SequenceEditPage(this.parent);
        sequenceEditPage.render();
    }

    removeCard(){
        ajax.get(sequenceUrls.getSequences(), (data) => {
            if (data.length < 0){
                return
            }
            
            ajax.delete(sequenceUrls.removeSequenceById(data[0].id));
            this.renderCards(data);
        })
    }
}