class ProjectInfo extends HTMLElement{
    constructor(){
        super();
        this.gameTitle = "";
        this.gameSource = "";
    }

    connectedCallback(){
        this.gameTitle = this.parentElement.getAttribute("game-title");
        this.gameSource = this.parentElement.getAttribute("game-src");
        this.innerHTML = `
                <h3>
                    <a href="${this.gameSource}" target="_blank">${this.gameTitle}</a>
                </h3>`;
    }
}
customElements.define("project-info",ProjectInfo);