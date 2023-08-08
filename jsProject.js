const inputSlider = document.querySelector("[length-slider]");
const lengthDisplay = document.querySelector("[length-number]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#number");
const symbolscheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebutton = document.querySelector(".gen-pass");
const allcheckbox = document.querySelectorAll("input[type = checkbox]");

const symbols = '~!@#$%^&*(<>)?';


let password = "";
let passwordLength = 10;
let checkCount = 0;
console.log("🚀 ~ file: jsProject.js:20 ~ checkCount:", checkCount)
handleSlider();
setIndicator("#808080")

//slider function
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
    //color
     const min = inputSlider.min;
     const max = inputSlider.max;

     inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max-min) ) + "% 100%";
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandumNumber() {
    return getRndInteger(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbols() {
    const randnum = getRndInteger(0, symbols.length);
    return symbols.charAt(randnum);
}

console.log("done hora h");

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (symbolscheck.checked) hasSym = true;
    if (numberscheck.checked) hasNum = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#00ff00");
    }
    else if (hasUpper && (hasLower || hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ffff00");
    }
    else {
        setIndicator("#ff0000");
    }
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });
}

console.log("done hora h - generate button tak");

generatebutton.addEventListener('click', handleClick);

function handleClick(){

    allcheckbox.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckBoxChange())
    })


    if (checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";

  //  console.log("jadfshkaljt lastttt");

    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if (lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if (numberscheck.checked)
        funcArr.push(generateRandumNumber);

    if (symbolscheck.checked)
        funcArr.push(generateSymbols);

    //ticked numbers or data
    console.log("done hora h at lastttt");

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    // remaining data
    console.log("dkh yaha tkkttt");

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    //UI show
    passwordDisplay.value = password;
    console.log("Ui addition ho gaya");
    calcStrength();

} 
