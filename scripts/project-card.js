class ProjectCard extends HTMLElement{
    static observedAttributes = ["game-title", "game-src"];
    constructor(){
        super();
        this.gameTitle = "";
        this.gameSource = "";
    }

    connectedCallback(){
        console.log(this.querySelector("p"));
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
        if(name == "game-title"){
            this.gameTitle = newValue;
        }else if(name == "game-src"){
            this.gameSource = newValue;
        }
    }
}
customElements.define("project-card", ProjectCard);