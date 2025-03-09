const form = document.querySelector("form");

const nameInput = document.querySelector('#contact-name');
const nameErr = document.querySelector(`output[name='name-error-output']`);
const nameInfo = document.querySelector(`output[name='name-info-output']`);

const emailInput = document.querySelector('#contact-email');
const emailErr = document.querySelector(`output[name='email-error-output']`);
const emailInfo = document.querySelector(`output[name='email-info-output']`);

const commentsTextArea = document.querySelector('textarea');
const commentsInfo = document.querySelector(`output[name='comments-info-output']`);
const commentsErr = document.querySelector(`output[name='comments-error-output']`);

const INVALID_COLOR_DARK = "#ec9595";
const WARNING_COLOR_DARK = "#f0a74f";
const REGULAR_COLOR_DARK = "#eeeccf";

const INVALID_COLOR_LIGHT = "#b45454";
const WARNING_COLOR_LIGHT = "#c4883f";
const REGULAR_COLOR_LIGHT = "#24221f"; 

let curr_invalid_color;
let curr_warning_color;
let curr_regular_color;

const NAME_REGEXP = /[A-Za-z .]+/;
const EMAIL_REGEXP = /[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/;
const COMMENTS_REGEXP = /[A-Za-z0-9 .,?!;:"'()]+/
const form_errors = [
    {
        'field':"contact-name",
        'errors':[]
    },
    {
        'field':"contact-email",
        'errors':[]
    },
    {
        'field':"comments",
        'errors':[]
    }
];

if(localStorage.getItem('ToggleMode') == 'dark'){
    curr_invalid_color = INVALID_COLOR_DARK;
    curr_warning_color = WARNING_COLOR_DARK;
    curr_regular_color = REGULAR_COLOR_DARK;
}else if(localStorage.getItem('ToggleMode') == 'light'){
    curr_invalid_color = INVALID_COLOR_LIGHT;
    curr_warning_color = WARNING_COLOR_LIGHT;
    curr_regular_color = REGULAR_COLOR_LIGHT;
}

form.addEventListener("submit",event=>{
    const errorData = document.createElement('input');
    errorData.type = 'hidden';
    errorData.name = "form-errors";       
    errorData.value = JSON.stringify(form_errors);
    form.appendChild(errorData);

});

console.log(nameInput);
nameInput.addEventListener("keydown", event => {
    nameInput.setCustomValidity("");
    if(!NAME_REGEXP.test(event.key)){
        form_errors[0]['errors'].push(nameInput.value + event.key);
        console.log("ERROR: ", form_errors[0]['errors']);
        event.preventDefault();
        flashError(nameInput,nameErr);
    }
});
nameInput.addEventListener("input", event => {
    const currCount = nameInput.value.length;
    const maxCount = nameInput.getAttribute("maxlength");
    nameInfo.innerHTML =  `${currCount}/${maxCount}`;
})

emailInput.addEventListener("input", (event)=>{
    emailInput.setCustomValidity("");
    const currCount = emailInput.value.length;
    const maxCount = emailInput.getAttribute("maxlength");
    emailInfo.innerHTML =  `${currCount}/${maxCount}`;
});

commentsTextArea.addEventListener("keydown", event => {
    commentsTextArea.setCustomValidity("");
    if(commentsTextArea.value.length == 500){
        return;
    }

    if(!COMMENTS_REGEXP.test(event.key)){
        form_errors[2]['errors'].push(commentsTextArea.value + event.key);
        console.log("ERROR: ", form_errors[2]['errors']);
        event.preventDefault();
        flashError(commentsTextArea,commentsErr,"Please don't type non-punctuation characters.");
    }
});
commentsTextArea.addEventListener("input", (event)=>{
    const currCount = commentsTextArea.value.length;
    const maxCount = commentsTextArea.getAttribute("maxlength");
    console.log(commentsInfo);
    commentsErr.style.opacity = 0;
    commentsInfo.innerHTML = `${currCount}/${maxCount}`;
    if(currCount < 400) {
        commentsInfo.style.color=curr_regular_color;
        commentsTextArea.style.backgroundColor = curr_regular_color;
    } else if(currCount >= 400 && currCount < 500) {
        commentsInfo.style.color=curr_warning_color;
        commentsTextArea.style.backgroundColor = curr_warning_color;
    } else {
        commentsInfo.style.color = curr_invalid_color;
        commentsTextArea.style.backgroundColor = curr_invalid_color;
        commentsErr.innerHTML = "Character limit reached!"
        commentsErr.style.opacity = 1;
    }
});


function flashError(inputElement,errorOutput,message){
    const flashKeyFrames = [{backgroundColor: curr_invalid_color}, {backgroundColor: curr_regular_color}];
    const flashTiming = { duration: 2000 };

    const fadeoutFrames = [{opacity: 1}, {opacity: 1}, {opacity: 1}, {opacity: 1}, {opacity: 0}];
    const fadeoutTiming = { duration: 4000 };

    inputElement.animate(flashKeyFrames,flashTiming);
    if(message)
        errorOutput.innerHTML = message;
    errorOutput.opacity = 1;
    errorOutput.animate(fadeoutFrames, fadeoutTiming);
}

function ValidateInputs(){
    if(!nameInput.checkValidity()){
        nameInput.setCustomValidity("Please only include letters, spaces and periods on your name.");
        form_errors[0]['errors'].push(nameInput.value);
        console.log(form_errors);
    }else{
        nameInput.setCustomValidity('');
    }

    if(!emailInput.checkValidity()){
        emailInput.setCustomValidity("Please insert a valid email.");
        form_errors[1]['errors'].push(emailInput.value);
        console.log(form_errors);
    }else{
        emailInput.setCustomValidity('');
    }

    if(!commentsTextArea.checkValidity()){
        commentsTextArea.setCustomValidity("Please include a comment!");
        form_errors[2]['errors'].push(commentsTextArea.value);
    }else{
        commentsTextArea.setCustomValidity('');
    }
}