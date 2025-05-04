import { SequenceCardComponent } from "../../components/sequence-card/index.js";
import { SequenceDetailPage } from "../sequence-detail/index.js";
import { sequenceData } from "../../main.js";

export class MainPage{
    constructor(parent){
        this.parent = parent;
        this.data = sequenceData.getData();
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
                        <button class="btn btn-outline-secondary btn-sm" id="add_card_btn">Добавить</button>
                        <button class="btn btn-outline-secondary btn-sm" id="delete_card_btn">Удалить</button>
                    </div>
                    <div class="gallery">
                    </div>
                </div>
            `
        )
    }

    renderCards(){
         const gallery = this.pageRoot.querySelector('.gallery');
         if (!gallery){
            return;
         }

         gallery.innerHTML = "";

         const keyword = this.filterKeyword.toLowerCase();

         this.data.forEach((item) => {
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

        filterInput.addEventListener('input', (e) => {
            this.filterKeyword = e.target.value;
             this.renderCards();
        });

         filterButton.addEventListener('click', () => {
             this.filterKeyword = filterInput.value || '';
             this.renderCards();
         });

        addButton.addEventListener('click', this.addCard.bind(this));
        deleteButton.addEventListener('click', this.removeCard.bind(this));

        this.renderCards();
    }


    clickCard(e){
        const cardId = e.target.dataset.id;
        const sequencePage = new SequenceDetailPage(this.parent, cardId, sequenceData.getData.bind(this));
        sequencePage.render();
    }

    addCard(){
        if (this.data.length > 0){
            const newCardData = JSON.parse(JSON.stringify(this.data[0]));
            newCardData.id = `${newCardData.id}`;
            this.data.push(newCardData);
            this.renderCards();
        }
    }

    removeCard(){
        if (this.data.length > 0){
            this.data.pop();
            this.renderCards();
        }
    }
}