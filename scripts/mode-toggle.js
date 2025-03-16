class ModeToggle extends HTMLElement{
    static moonIconDark = "./images/icons/moon_icon_darkmode.png";
    static moonIconLight = "./images/icons/moon_icon_lightmode.png";
    static sunIconDark = "./images/icons/sun_icon_darkmode.png";
    static sunIconLight = "./images/icons/sun_icon_lightmode.png";

    static darkColorPalette = "./styles/variables/dark-color-palette.css";
    static lightColorPalette = "./styles/variables/light-color-palette.css";
    
    constructor(){
        super();
        this.currentMode = 'dark';
        this.lightStyleSrc = "";
        this.darkStyleSrc = "";
    }

    connectedCallback(){
        this.innerHTML = `<span>
        <img src="${ModeToggle.moonIconDark}" alt="moon-icon" width="50px">
        <label class="switch">
            <input type="checkbox">
            <span class="slider"></span>
        </label>
        <img src="${ModeToggle.sunIconDark}" alt="sun-icon" width="50px">
    </span>`
        this.determineInitialMode();
    }

    determineInitialMode(){
        console.log("initial mode");
        const toggle = this.querySelector("input");
        console.log(toggle);
        if(localStorage.getItem('ToggleMode') == null){
            console.log("No Data");
            this.switchToDarkMode();
        }else{
            if(localStorage.getItem('ToggleMode') == 'dark'){
                this.switchToDarkMode();
                toggle.checked = false;
            }else if(localStorage.getItem('ToggleMode') == 'light'){
                this.switchToLightMode();
                toggle.checked = true;
            }
        }
        toggle.addEventListener('change',()=>{
            this.toggleMode()
        });
    }
    
    toggleMode(){
        console.log("toggled");
        let mode = localStorage.getItem('ToggleMode');
        if(mode == 'dark'){
            this.switchToLightMode();
        }else if(mode == 'light'){
            this.switchToDarkMode();
        }
    }

    switchToLightMode(){
        console.log("LIGHT MODE");
        const styleLink = document.getElementById("color-palette");
        const toggleIcons = this.querySelectorAll("img");
        const moonIcon = toggleIcons[0];
        const sunIcon = toggleIcons[1];

        styleLink.href = ModeToggle.lightColorPalette;
        localStorage.setItem('ToggleMode', 'light');
        moonIcon.src = ModeToggle.moonIconLight;
        sunIcon.src = ModeToggle.sunIconLight;
    }
    
    switchToDarkMode(){
        console.log("DARK MODE");
        const styleLink = document.getElementById("color-palette");
        const toggleIcons = this.querySelectorAll("img");
        const moonIcon = toggleIcons[0];
        const sunIcon = toggleIcons[1];

        styleLink.href = ModeToggle.darkColorPalette;
        localStorage.setItem('ToggleMode', 'dark');
        moonIcon.src = ModeToggle.moonIconDark;
        sunIcon.src = ModeToggle.sunIconDark;
    }
}
customElements.define("mode-toggle", ModeToggle);