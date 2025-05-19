(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();class _{constructor(e){this.parent=e}getHTML(e){const t=e.terms.slice(0,15).join(", ")+(e.terms.length>15?"...":""),s=e.keywords.slice(0,5).join(", ")+(e.keywords.length>5?"...":"");return`
                <div class="card" data-sequence-card-id="${e.id}">
                    <div class="card_body">
                        <h5 class="card_title sequence-id">${e.id}</h5>
                        <p class="card_text sequence-name">${e.name.substring(0,100)}...</p>
                        <p class="sequence_extra_info info_terms">Terms: ${t}</p>
                        <p class="sequence_extra_info">Keywords: ${s}</p>
                        <button class="btn btn-outline-dark" id="click-card-${e.id}" data-id="${e.id}">Подробнее</button>
                    </div>
                </div>
            `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener("click",t)}render(e,t){const s=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(e,t)}}class m{constructor(e){this.parent=e}addListeners(e){const t=document.getElementById("back-button");t.removeEventListener("click",e),t.addEventListener("click",e)}getHTML(){return'<button id="back-button" class="btn" type="button">« Назад</button>'}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",t),this.addListeners(e)}}class b{async get(e,t){const s={method:"GET",headers:{}};try{const n=await fetch(e,s);let r=null;const o=await n.text();o&&(r=JSON.parse(o)),t(r)}catch(n){console.log(`Сетевая ошибка или ошибка выполнения запроса GET ${e}:`,n),t(null)}}async post(e,t,s){const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{const r=await fetch(e,n);let o=null;const i=await r.text();i&&(o=JSON.parse(i)),s(o)}catch(r){console.log(`Сетевая ошибка или ошибка выполнения запроса POST ${e}:`,r),s(null)}}async patch(e,t,s){const n={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{const r=await fetch(e,n);let o=null;const i=await r.text();i&&(o=JSON.parse(i)),s(o)}catch(r){console.log(`Сетевая ошибка или ошибка выполнения запроса PATCH ${e}:`,r),s(null)}}async delete(e,t){const s={method:"DELETE",headers:{}};try{const n=await fetch(e,s);let r=null;const o=await n.text();o&&(r=JSON.parse(o)),t(r)}catch(n){console.log(`Сетевая ошибка или ошибка выполнения запроса DELETE ${e}:`,n),t(null)}}}const d=new b;class f{constructor(){this.baseUrl="http://localhost:3000"}getSequences(){return`${this.baseUrl}/sequences`}getSequenceById(e){return`${this.baseUrl}/sequences/${e}`}createSequence(){return`${this.baseUrl}/sequences`}removeSequenceById(e){return`${this.baseUrl}/sequences/${e}`}updateSequenceById(e){return`${this.baseUrl}/sequences/${e}`}}const u=new f;class v{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById("sequence_detail_page")}getHTML(){return`
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
            `}clickBack(){new p(this.parent).render()}getData(){d.get(u.getSequenceById(this.id),e=>{this.renderSequencePage(e)})}renderSequencePage(e){const t=e.terms.join(", "),s=document.getElementById("sequence_display");s&&(s.textContent=t);const n=document.getElementById("sequence_id");s&&(n.textContent=this.id);const r=document.getElementById("sequence_name");s&&(r.textContent=e.name);const o=document.getElementById("sequence_author");s&&(o.textContent=e.author)}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new m(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class w{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("sequence_edit_page")}getHTML(){return`
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
            `}clickBack(){new p(this.parent).render()}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new m(this.pageRoot).render(this.clickBack.bind(this)),this.pageRoot.querySelector("#edit_button").addEventListener("click",this.editButton.bind(this))}editButton(){const e=this.pageRoot.querySelector("#sequence_id_input"),t=this.pageRoot.querySelector("#sequence_name_input"),s=this.pageRoot.querySelector("#sequence_author_input"),n=this.pageRoot.querySelector("#sequence_terms_input"),r=this.pageRoot.querySelector("#sequence_keywords_input"),o=e.value.trim(),i=t.value.trim(),l=s.value.trim(),y=(n.value||"").split(",").map(a=>a.trim()).filter(a=>a.length>0),q=(r.value||"").split(",").map(a=>a.trim()).filter(a=>a.length>0),h={name:i,terms:y,keywords:q,author:l||""};o?d.patch(u.updateSequenceById(e.value),h):d.post(u.createSequence(),h)}}class p{constructor(e){this.parent=e,this.filterKeyword=""}get pageRoot(){return document.getElementById("main_page")}getHTML(){return`
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
            `}getData(){d.get(u.getSequences(),e=>{this.renderCards(e)})}renderCards(e){const t=this.pageRoot.querySelector(".gallery");t&&(t.innerHTML="",e.forEach(s=>{const n=this.filterKeyword.toLowerCase(),r=s.name.toLowerCase().includes(n),o=s.id.toLowerCase().includes(n),i=s.keywords.some(l=>l.toLowerCase().includes(n));(!n||r||o||i)&&new _(t).render(s,this.clickCard.bind(this))}))}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const t=this.pageRoot.querySelector("#filter_keyword"),s=this.pageRoot.querySelector("#filter_btn"),n=this.pageRoot.querySelector("#add_card_btn"),r=this.pageRoot.querySelector("#delete_card_btn");s.addEventListener("click",()=>{this.filterKeyword=t.value||"",this.getData()}),n.addEventListener("click",this.addCard.bind(this)),r.addEventListener("click",this.removeCard.bind(this)),this.getData()}clickCard(e){const t=e.target.dataset.id;new v(this.parent,t).render()}addCard(){new w(this.parent).render()}removeCard(){d.get(u.getSequences(),e=>{e.length<1||d.delete(u.removeSequenceById(e[0].id),t=>{this.getData()})})}}const g=document.getElementById("root");g&&new p(g).render();
