export class BackButtonComponent{
    constructor(parent){
        this.parent = parent;
    }

    addListeners(listener){
        const button = document.getElementById("back-button");
        button.removeEventListener("click", listener);
        button.addEventListener("click", listener);
    }

    getHTML(){
        return (
            `<button id="back-button" class="btn" type="button">« Назад</button>`
        )
    }

    render(listener){
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(listener);
    }
}