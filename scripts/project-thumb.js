class ProjectThumb extends HTMLElement{
    static observedAttributes = ["desktop-src","mobile-src","game-src","game-title"];
    constructor(){
        super();
        this.gameTitle = "";
        this.gameSource = "";
        this.desktopSource = "";
        this.mobileSource = "";
    }

    connectedCallback(){
        
        if(!(this.gameTitle = this.parentElement.getAttribute("game-title"))){
            this.gameTitle = "Fetching"
        }
        if(!(this.gameSource = this.parentElement.getAttribute("game-src"))){
            this.gameSource = "";
        }
        if(this.desktopSource == ""){
            this.desktopSource = "./images/thumbnails/Desktop/loading.png";
        }
        if(this.mobileSource == ""){
            this.mobileSource = "./images/thumbnails/Mobile/loading.png";
        }
        this.innerHTML=`
                <a href="${this.gameSource}" target="_blank">
                    <picture>
                        <source media="(max-width:1100px)" srcset="${this.mobileSource}" width="315" height="315" alt="${this.gameTitle} - Thumbnail">
                        <img src="${this.desktopSource}"  width="450" height="250" title="${this.gameTitle}" alt="${this.gameTitle} - Thumbnail">
                    </picture>
                </a>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name == "desktop-src"){
            this.desktopSource = newValue;
            const img = this.querySelector("img");
            img.src = newValue; 
        }else if(name == "mobile-src"){
            const source = this.querySelector("source");
            this.mobileSource = newValue;
            source.srcset = newValue;
        }else if(name == "game-title"){
            this.updateTitle(newValue);
        }else if(name == "game-src"){
            const linkElement = this.querySelector("a");
            linkElement.href = newValue;
        }
    }

    updateTitle(newTitle){
        const source = this.querySelector("source");
        const img = this.querySelector("img");

        source.alt = newTitle + " - Thumbnail";
        img.title = newTitle;
        img.alt = newTitle + " - Thumbnail";

        this.gameTitle = newTitle;
    }
}
customElements.define("project-thumbnail",ProjectThumb);