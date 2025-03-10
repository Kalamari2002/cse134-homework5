class ProjectThumb extends HTMLElement{
    static observedAttributes = ["desktop-src","mobile-src"];
    constructor(){
        super();
        this.gameTitle = "";
        this.gameSource = "";
        this.desktopSource = "";
        this.mobileSource = "";
    }

    connectedCallback(){
        this.gameTitle = this.parentElement.getAttribute("game-title");
        this.gameSource = this.parentElement.getAttribute("game-src");
        this.innerHTML=`
                <a href="${this.gameSource}" target="_blank">
                    <picture>
                        <source media="(max-width:1100px)" srcset="${this.mobileSource}" width="315" height="315" alt="${this.gameTitle} - Thumbnail">
                        <img src="${this.desktopSource}"  width="450" height="250" title="${this.gameTitle}" alt="${this.gameTitle} - Thumbnail">
                    </picture>
                </a>
        `
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "desktop-src"){
            this.desktopSource = newValue;
        }else if(name == "mobile-src"){
            this.mobileSource = newValue;
        }
    }
}
customElements.define("project-thumbnail",ProjectThumb);