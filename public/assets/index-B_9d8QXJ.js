(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();class p{constructor(e){this.parent=e}getHTML(e){const n=e.terms.slice(0,15).join(", ")+(e.terms.length>15?"...":""),t=e.keywords.slice(0,5).join(", ")+(e.keywords.length>5?"...":"");return`
                <div class="card" data-sequence-card-id="${e.id}">
                    <div class="card_body">
                        <h5 class="card_title sequence-id">${e.id}</h5>
                        <p class="card_text sequence-name">${e.name.substring(0,100)}...</p>
                        <p class="sequence_extra_info info_terms">Terms: ${n}</p>
                        <p class="sequence_extra_info">Keywords: ${t}</p>
                        <button class="btn btn-outline-dark" id="click-card-${e.id}" data-id="${e.id}">Подробнее</button>
                    </div>
                </div>
            `}addListeners(e,n){document.getElementById(`click-card-${e.id}`).addEventListener("click",n)}render(e,n){const t=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",t),this.addListeners(e,n)}}class g{constructor(e){this.parent=e}addListeners(e){const n=document.getElementById("back-button");n.removeEventListener("click",e),n.addEventListener("click",e)}getHTML(){return'<button id="back-button" class="btn" type="button">« Назад</button>'}render(e){const n=this.getHTML();this.parent.insertAdjacentHTML("afterbegin",n),this.addListeners(e)}}class m{get(e,n){const t=new XMLHttpRequest;t.open("GET",e),t.send(),t.onreadystatechange=()=>{t.readyState===4&&this._handleResponse(t,n)}}post(e,n,t){const s=new XMLHttpRequest;s.open("POST",e),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(n)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,t)}}patch(e,n,t){const s=new XMLHttpRequest;s.open("PATCH",e),s.setRequestHeader("Content-Type","application/json"),s.send(JSON.stringify(n)),s.onreadystatechange=()=>{s.readyState===4&&this._handleResponse(s,t)}}delete(e,n){const t=new XMLHttpRequest;t.open("DELETE",e),t.send(),t.onreadystatechange=()=>{t.readyState===4&&this._handleResponse(t,n)}}_handleResponse(e,n){try{const t=e.responseText?JSON.parse(e.responseText):null;n(t,e.status)}catch(t){console.error("Ошибка парсинга JSON:",t),n(null,e.status)}}}const i=new m;class y{constructor(){this.baseUrl="http://localhost:3000"}getSequences(){return`${this.baseUrl}/sequences`}getSequenceById(e){return`${this.baseUrl}/sequences/${e}`}createSequence(){return`${this.baseUrl}/sequences`}removeSequenceById(e){return`${this.baseUrl}/sequences/${e}`}updateSequenceById(e){return`${this.baseUrl}/sequences/${e}`}}const d=new y;class f{constructor(e,n){this.parent=e,this.id=n,this.sequenceData=[]}get pageRoot(){return document.getElementById("sequence_detail_page")}getHTML(e){return`
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
            `}clickBack(){new l(this.parent).render()}getData(){i.get(d.getSequenceById(this.id),e=>{this.renderSequencePage(e)})}renderSequencePage(e){const n=e.terms.join(", "),t=document.getElementById("sequence_display");t&&(t.textContent=n);const s=document.getElementById("sequence_id");t&&(s.textContent=this.id);const r=document.getElementById("sequence_name");t&&(r.textContent=e.name);const c=document.getElementById("sequence_author");t&&(c.textContent=e.author)}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new g(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class l{constructor(e){this.parent=e,this.filterKeyword=""}get pageRoot(){return document.getElementById("main_page")}getHTML(){return`
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
            `}getData(){i.get(d.getSequences(),e=>{this.renderCards(e)})}renderCards(e){const n=this.pageRoot.querySelector(".gallery");n&&(n.innerHTML="",e.forEach(t=>{const s=this.filterKeyword.toLowerCase(),r=t.name.toLowerCase().includes(s),c=t.id.toLowerCase().includes(s),h=t.keywords.some(a=>a.toLowerCase().includes(s));(!s||r||c||h)&&new p(n).render(t,this.clickCard.bind(this))}))}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e);const n=this.pageRoot.querySelector("#filter_keyword"),t=this.pageRoot.querySelector("#filter_btn"),s=this.pageRoot.querySelector("#add_card_btn"),r=this.pageRoot.querySelector("#delete_card_btn");t.addEventListener("click",()=>{this.filterKeyword=n.value||"",this.getData()}),s.addEventListener("click",this.addCard.bind(this)),r.addEventListener("click",this.removeCard.bind(this)),this.getData()}clickCard(e){const n=e.target.dataset.id;new f(this.parent,n).render()}addCard(){i.get(d.getSequences(),e=>{if(e.length<0)return;const n=e[0],t={name:`${n.name}`,terms:[...n.terms],keywords:[...n.keywords],author:n.author};i.post(d.createSequence(),t),this.renderCards(e)})}removeCard(){i.get(d.getSequences(),e=>{e.length<0||(i.delete(d.removeSequenceById(e[0].id)),this.renderCards(e))})}}const u=document.getElementById("root");u&&new l(u).render();
