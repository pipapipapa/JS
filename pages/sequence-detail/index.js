import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { concatenate } from '../../utils/concatenate.js';
import { moveElement } from '../../utils/moveElement.js';
import { sumUnique } from '../../utils/sumUnique.js';
import { anagram } from '../../utils/anagram.js';


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
                            <hr>
                            <div class="term_controls">
                                <span>Separator:</span>
                                <input type="text" class="inp_text_small" id="separator_input" value=", " placeholder="e.g., ', '">
                                <button class="btn" id="concat_btn">Format Terms</button>
                            </div>
                            <div class="term_controls">
                                <span>Move from index:</span>
                                <input type="number" class="inp_num_small" id="move_from_input" min="0">
                                <span>to index:</span>
                                <input type="number" class="inp_num_small" id="move_to_input" min="0">
                                <button class="btn" id="move_btn">Move Term</button>
                                <button class="btn" id="reset_terms_btn">Reset Terms</button>
                            </div>
                        </div>
                    </div>

                    <div class="card detail-card">
                        <div class="card_body">
                            <p><strong>Keywords:</strong> <span id="keywords_display">${concatenate(this.sequenceData.keywords || [], ' | ')}</span></p>
                            <hr>
                            <div id="sum_unique_result" class="analysis_result">
                            </div>
                             <div id="anagram_result" class="analysis_result anagram_display">
                            </div>
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

    displayConcatenatedTerms(){
        const separatorInput = document.getElementById('separator_input');
        const separator = separatorInput.value !== undefined ? separatorInput.value : ', ';

        const formattedTerms = concatenate(this.displayTerms, separator);

        const displayElement = document.getElementById('sequence_display');
        if (displayElement){
            displayElement.textContent = formattedTerms;
        }
    }

    performMoveElement(){
        const fromInput = document.getElementById('move_from_input');
        const toInput = document.getElementById('move_to_input');
        const fromIndex = parseInt(fromInput.value || "-1", 10);
        const toIndex = parseInt(toInput.value || "-1", 10);

        if (isNaN(fromIndex) || isNaN(toIndex) || fromIndex < 0 || toIndex < 0){
            return;
        }
        if (fromIndex >= this.displayTerms.length || toIndex >= this.displayTerms.length){
            return;
        }

        moveElement(this.displayTerms, fromIndex, toIndex);
        this.displayConcatenatedTerms();
        this.calculateAndDisplaySumUnique();
    }

    resetTermsDisplay(){
        this.displayTerms = [...this.sequenceData.terms];
        this.displayConcatenatedTerms();
        this.calculateAndDisplaySumUnique();
    }

    calculateAndDisplaySumUnique(){
        const sum = sumUnique(this.displayTerms);
        const resultElement = document.getElementById('sum_unique_result');
        if (resultElement){
            resultElement.textContent = `Sum of unique terms: ${sum}`;
        }
    }

    findAndDisplayAnagrams(){
        const keywords = this.sequenceData.keywords || [];
        const anagramGroups = anagram(keywords);
        const resultElement = document.getElementById('anagram_result');
        if (!resultElement) return;

        if (anagramGroups.length > 0){
            let output = "<strong>Anagram Groups (Keywords):</strong>\n";
            anagramGroups.forEach(group =>{
                output += `- [${group.join(', ')}]\n`;
            });
            resultElement.innerHTML = output;
        }
        else{
            resultElement.textContent = "No anagram groups found among keywords.";
        }
    }

    addEventListeners(){
         document.getElementById('concat_btn').addEventListener('click', this.displayConcatenatedTerms.bind(this));
         document.getElementById('move_btn').addEventListener('click', this.performMoveElement.bind(this));
         document.getElementById('reset_terms_btn').addEventListener('click', this.resetTermsDisplay.bind(this));
    }

    render(){
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.displayConcatenatedTerms();

        this.calculateAndDisplaySumUnique();
        this.findAndDisplayAnagrams();

        this.addEventListeners();
    }
}