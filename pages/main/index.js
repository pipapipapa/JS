import { SequenceCardComponent } from "../../components/sequence-card/index.js";
import { SequenceDetailPage } from "../sequence-detail/index.js";

export class MainPage{
    constructor(parent){
        this.parent = parent;
        this.data = this.getData();
        this.filterKeyword = "";
    }

    get pageRoot(){
        return document.getElementById('main_page')
    }

    getHTML(){
        return (
            `
                <div id="main_page" class="main_page">
                    <h2>OEIS Sequence Explorer</h2>
                    <div class="controls_form">
                        <input type="text" class="inp_text" id="filter_keyword" placeholder="Filter by keyword or ID">
                        <button class="btn" id="filter_btn">Filter</button>
                        <button class="btn" id="add_card_btn">Add card</button>
                        <button class="btn" id="delete_card_btn">Remove card</button>
                    </div>
                    <div class="gallery">
                    </div>
                </div>
            `
        )
    }

    getData(){
        return [
           {
                id: "A076263",
                name: "Triangle read by rows: T(n,k) = number of nonisomorphic connected graphs with n vertices and k edges",
                terms: [1, 1, 1, 1, 2, 1, 1, 3, 5, 5, 4, 2, 1, 1, 6, 13, 19, 22, 20, 14, 9, 5, 2, 1, 1, 11, 33, 67, 107, 132, 138, 126, 95, 64, 40, 21, 10, 5, 2, 1],
                keywords: ["nonn", "tabf", "graph", "connected", "triangle", "nodes", "edges", "sendo", "segde"],
                author: "Arne Ring"
            },
           {
                id: "A000040",
                name: "The prime numbers.",
                terms: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
                keywords: ["core", "nonn", "easy", "nice", "prime", "ecin"],
                author: "N. J. A. Sloane"
            },
           {
                id: "A000045",
                name: "Fibonacci numbers: F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.",
                terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597],
                keywords: ["core", "nonn", "easy", "nice", "fibonacci"],
                author: "N. J. A. Sloane"
            }
        ];
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
        const sequencePage = new SequenceDetailPage(this.parent, cardId, this.getData.bind(this));
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