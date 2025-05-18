(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();class p{constructor(e){this.parent=e}getHTML(e){const t=e.terms.slice(0,15).join(", ")+(e.terms.length>15?"...":""),s=e.keywords.slice(0,5).join(", ")+(e.keywords.length>5?"...":"");return`
                <div class="card" data-sequence-card-id="${e.id}">
                    <div class="card_body">
                        <h5 class="card_title sequence-id">${e.id}</h5>
                        <p class="card_text sequence-name">${e.name.substring(0,100)}...</p>
                        <p class="sequence_extra_info info_terms">Terms: ${t}</p>
                        <p class="sequence_extra_info">Keywords: ${s}</p>
                        <button class="btn btn-outline-dark" id="click-card-${e.id}" data-id="${e.id}">Подробнее</button>
                    </div>
                </div>
            `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener("click",t)}render(e,t){const s=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(e,t)}}class g{constructor(e){this.parent=e}addListeners(e){const t=document.getElementById("back-button");t.removeEventListener("click",e),t.addEventListener("click",e)}getHTML(){return'<button id="back-button" class="btn" type="button">« Назад</button>'}render(e){const t=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",t),this.addListeners(e)}}class m{async get(e,t){const s={method:"GET",headers:{}};try{const n=await fetch(e,s);let r=null;const o=await n.text();o&&(r=JSON.parse(o)),t(r)}catch(n){console.log(`Сетевая ошибка или ошибка выполнения запроса GET ${e}:`,n),t(null)}}async post(e,t,s){const n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{const r=await fetch(e,n);let o=null;const i=await r.text();i&&(o=JSON.parse(i)),s(o)}catch(r){console.log(`Сетевая ошибка или ошибка выполнения запроса POST ${e}:`,r),s(null)}}async patch(e,t,s){const n={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};try{const r=await fetch(e,n);let o=null;const i=await r.text();i&&(o=JSON.parse(i)),s(o)}catch(r){console.log(`Сетевая ошибка или ошибка выполнения запроса PATCH ${e}:`,r),s(null)}}async delete(e,t){const s={method:"DELETE",headers:{}};try{const n=await fetch(e,s);let r=null;const o=await n.text();o&&(r=JSON.parse(o)),t(r)}catch(n){console.log(`Сетевая ошибка или ошибка выполнения запроса DELETE ${e}:`,n),t(null)}}}const a=new m;class y{constructor(){this.baseUrl="http://localhost:3000"}getSequences(){return`${this.baseUrl}/sequences`}getSequenceById(e){return`${this.baseUrl}/sequences/${e}`}createSequence(){return`${this.baseUrl}/sequences`}removeSequenceById(e){return`${this.baseUrl}/sequences/${e}`}updateSequenceById(e){return`${this.baseUrl}/sequences/${e}`}}const d=new y;class f{constructor(e,t){this.parent=e,this.id=t,this.sequenceData=[]}get pageRoot(){return document.getElementById("sequence_detail_page")}getHTML(e){return`
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
            `}clickBack(){new h(this.parent).render()}getData(){a.get(d.getSequenceById(this.id),e=>{this.renderSequencePage(e)})}renderSequencePage(e){const t=e.terms.join(", "),s=document.getElementById("sequence_display");s&&(s.textContent=t);const n=document.getElementById("sequence_id");s&&(n.textContent=this.id);const r=document.getElementById("sequence_name");s&&(r.textContent=e.name);const o=document.getElementById("sequence_author");s&&(o.textContent=e.author)}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new g(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class h{constructor(e){this.parent=e,this.filterKeyword=""}get pageRoot(){return document.getElementById("main_page")}getHTML(){return`
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
            `}getData(){a.get(d.getSequences(),e=>{this.renderCards(e)})}renderCards(e){const t=this.pageRoot.querySelector(".gallery");t&&(t.innerHTML="",e.forEach(s=>{const n=this.filterKeyword.toLowerCase(),r=s.name.toLowerCase().includes(n),o=s.id.toLowerCase().includes(n),i=s.keywords.some(l=>l.toLowerCase().includes(n));(!n||r||o||i)&&new p(t).render(s,this.clickCard.bind(this))}))}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const t=this.pageRoot.querySelector("#filter_keyword"),s=this.pageRoot.querySelector("#filter_btn"),n=this.pageRoot.querySelector("#add_card_btn"),r=this.pageRoot.querySelector("#delete_card_btn");s.addEventListener("click",()=>{this.filterKeyword=t.value||"",this.getData()}),n.addEventListener("click",this.addCard.bind(this)),r.addEventListener("click",this.removeCard.bind(this)),this.getData()}clickCard(e){const t=e.target.dataset.id;new f(this.parent,t).render()}addCard(){a.get(d.getSequences(),e=>{if(e.length<1)return;const t=e[0],s={name:`${t.name}`,terms:[...t.terms],keywords:[...t.keywords],author:t.author};a.post(d.createSequence(),s,n=>{this.getData()})})}removeCard(){a.get(d.getSequences(),e=>{e.length<1||a.delete(d.removeSequenceById(e[0].id),t=>{this.getData()})})}}const u=document.getElementById("root");u&&new h(u).render();
