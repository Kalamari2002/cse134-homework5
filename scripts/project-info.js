class ProjectInfo extends HTMLElement{
    static observedAttributes = ["game-title", "game-src"];
    constructor(){
        super();
        this.gameTitle = "";
        this.gameSource = "";
    }

    connectedCallback(){
        if(!(this.gameTitle = this.parentElement.getAttribute("game-title"))){
            this.gameTitle = "Press buttons above to load";
        }
        if(!(this.gameSource = this.parentElement.getAttribute("game-src"))){
            this.gameSource = "";
        }

        this.innerHTML = `
                <h3>
                    <a href="${this.gameSource}" target="_blank">${this.gameTitle}</a>
                </h3>`;
    }

    attributeChangedCallback(name, oldValue, newValue){
        const linkElement = this.querySelector("a");
        if(name == "game-title"){
            linkElement.innerHTML = newValue; 
        }else if(name == "game-src"){
            linkElement.href = newValue;
        }
    }
}
customElements.define("project-info",ProjectInfo);