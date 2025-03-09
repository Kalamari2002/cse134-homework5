const styleLink = document.querySelector("link");
const button = document.querySelector("button");
console.log(button);
let lightMode = false;
function toggleMode(lightStyleSrc, darkStyleSrc){
    if (!lightMode) {
        lightMode = true;
        //styleLink.href = "./styles/main-lightmode.css";
        styleLink.href = lightStyleSrc;
        button.innerHTML = "Dark Mode";
        console.log("LIGHT MODE");
    }else{
        lightMode = false;
        //styleLink.href = "./styles/main.css";
        styleLink.href = darkStyleSrc;
        button.innerHTML = "Light Mode";
        console.log("DARK MODE");
    }
}