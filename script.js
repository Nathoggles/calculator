//DOM elements
const buttons = document.querySelectorAll("button");
const allContainer = document.querySelector("#allContainer");
const display = document.querySelector("#M");
const width = window.innerWidth;

// Object to store generated objects
const calcStorage = {};

//Counter variables, for assembling a calculation object and for its parts for a next calculation object where needed
let calcCounter = 0;
let phaseCounter = 0;
let plusMinus = false;
let tempResult;
let tempNum = {};


// Dynamic generator of calculation objects
function generateCalcs() {
    if (phaseCounter != 0){
    calcToDiv(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2, calcStorage[`${calcCounter}`].result);}
    phaseCounter = 1;
    calcCounter++;
    plusMinus = false;
        calcStorage[`${calcCounter}`] = {id: calcCounter, num1: '', num2: '', operator: '', result: ''};
            calcStorage[`${calcCounter}`];
}


//set a temporary num each time a button is pressed depending on the current state (before an operator is selected or after), 
//allowing to declump the input functions and reduce if/else statements based on phaseCounter. 
function setTempNum() {
    tempNum.num = calcStorage[`${calcCounter}`][`num${phaseCounter}`];
}

//update the num in CalcStorage when tempNum.num is changed.
function updateNum() {
    calcStorage[`${calcCounter}`][`num${phaseCounter}`] = tempNum.num;
}



generateCalcs();


//Global button click listener
    //if phasecounter == 1, tempObject.num = num1
    //if phasecounter == 2, tempObject.num = 2;

buttons.forEach((button) => 
    button.addEventListener("click", (event) => {
    setTempNum();
      if (event.target.id == "C" && (!display.textContent == "")) {
    onC();
    } if (event.target.id == "back"){
    onBack();
    } if (event.target.classList.contains("calc")) {
    onNumber(event);
    } if (event.target.id == "+-") {
        onPlusMinus();
    } if ((event.target.classList.contains("operator"))){
        onOperator(event);
    } if (event.target.id == "%") { 
        onPercent(event);
    }if (event.target.id == "equal" && phaseCounter == 2) {
        onEqual();
    }
}));

//Functions to run on specific buttons pressed: use global phaseCounter to check step of the calculation, generate a new calculation sub-object (calcStorage[`${calcCounter}`]) 
//and fill its keys with corresponding input

function onC(){
    calcStorage[`${calcCounter}`].num1 = "";
    calcStorage[`${calcCounter}`].num2 = "";
    calcStorage[`${calcCounter}`].operator = "";
    display.style.fontSize = "18vh";
    displayContent("0");
    phaseCounter = 1;
}

function onBack()
    { //on pressing the back button: delete the last character, if string is "" - set display to 0, if clicked on the result phase, behave as a C button
    if ((tempResult == display.textContent) || (tempResult == tempNum.num)) {
        calcStorage[`${calcCounter}`].num1 = "";
        calcStorage[`${calcCounter}`].num2 = "";
        calcStorage[`${calcCounter}`].operator = "";
        display.style.fontSize = "18vh";
        displayContent("0"); 
    } if (display.textContent == tempNum.num) {
        tempNum.num = tempNum.num.slice(0, -1);
        display.textContent = tempNum.num;
        updateNum();
        if (tempNum.num == "") {displayContent("0");}
    } 
}

function onNumber(event){
    //avoid two dots in one string
    if ((event.target.id == "dot" && tempNum.num.includes(".")) ){ return;}
   //make sure the input stays below the calculator display width while also auto-trunctating possible long decimals without the need for rounding
   updateDisplayByWidth(event);
}

function onPlusMinus() {
    if (!plusMinus){
        tempNum.num = "-" + tempNum.num;
     }if (plusMinus){
        tempNum.num = tempNum.num.slice(1);
    }
    displayContent(tempNum.num );
    updateNum();
    plusMinus = !plusMinus;
}

function onOperator(event){
    if (phaseCounter == 1) {
        calcStorage[`${calcCounter}`].operator = event.target.id;
        if (tempResult == display.textContent) { //if used on result screen, asign result to num1 and operator as operator of the next calculation object
             calcStorage[`${calcCounter}`].num1 = tempResult;}
        if (calcStorage[`${calcCounter}`].num1 == "") {calcStorage[`${calcCounter}`].num1 = "0";}
        phaseCounter = 2;
        plusMinus = false;
    }
    else if (phaseCounter == 2) { //if operator button is used a second time, behave as a = button and store the result for a new calculation
        if ((calcStorage[`${calcCounter}`].operator != "") && (calcStorage[`${calcCounter}`].num2 == "")) {return;}//checks if an operator has already been asigned to the calculation;
        if ((calcStorage[`${calcCounter}`].operator == "/" && calcStorage[`${calcCounter}`].num2 == 0)) {return divZero();}
        calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        displayContent(calcStorage[`${calcCounter}`].result);
        generateCalcs();
        calcStorage[`${calcCounter}`].num1 = tempResult;
        calcStorage[`${calcCounter}`].operator = event.target.id;
        phaseCounter = 2;
    }
}

function onPercent(event){
    //on pressing the % button: if % is added to the first number, divide it by 100, if it is added to the second number, treat is as part of the number and immediately execute calculation.
    if (tempNum.num == ".") {return;}
    if (tempNum.num == "") {return};
    let divide100 = parseFloat(calcStorage[`${calcCounter}`].num1) / 100;
    if (phaseCounter == 1){
         calcStorage[`${calcCounter}`].result = divide100.toString();
         displayContent(calcStorage[`${calcCounter}`].result);
         calcStorage[`${calcCounter}`].num1 += event.target.id;
         generateCalcs();
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].result = operate(divide100, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        displayContent(calcStorage[`${calcCounter}`].result);
        generateCalcs();
    }
}

function onEqual(){
    if (tempNum.num == "") {return};
    if (tempNum.num == ".") {return;}
    if ((calcStorage[`${calcCounter}`].operator == "/" && calcStorage[`${calcCounter}`].num2 == 0)) {return divZero();}
    calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
    displayContent(calcStorage[`${calcCounter}`].result);
    generateCalcs();
}

function divZero(){
        calcStorage[`${calcCounter}`].num1 = "";
        calcStorage[`${calcCounter}`].num2 = "";
        calcStorage[`${calcCounter}`].operator = "";
        phaseCounter = 1;
        displayContent("/0? RLY?"); 
        
}

//calculation functions

function operate(num1, operator, num2) {

    if (operator == "*"){return multiply(num1, num2);}
    if (operator == "/"){return divide(num1, num2);}
    if (operator == "+"){return summ(num1, num2);}
    if (operator == "-"){return substract(num1, num2);}
}

function multiply(num1, num2) {
    let result = parseFloat(num1) * parseFloat(num2);
    return sliceAfterDot(result);
}

function divide(num1, num2) {
    let result = parseFloat(num1) / parseFloat(num2);
    return sliceAfterDot(result);
}

function summ(num1, num2) {
    let result = parseFloat(num1) + parseFloat(num2);
    return sliceAfterDot(result);
}

function substract(num1, num2) {
    let result = parseFloat(num1) - parseFloat(num2);
    return sliceAfterDot(result);
}

function sliceAfterDot(result) {
    result = result.toString();
    result = (result.indexOf(".") > 0 && result.indexOf("e") < 0) ? result.slice(0, result.indexOf(".") + 3) : result; 
    return result;
}

//displaying results function to shrink displayed depending on screen size to fit "display". 

function displayContent(content) {
    display.textContent = content;
    tempResult = calcStorage[`${calcCounter}`].result;
    if (content.length > 3 &&  width < 600) {
        if (content.length > 15) {
            display.style.fontSize = "2vh";
        }else if (content.length > 10) {
            display.style.fontSize = "3vh";
        }else if (content.length > 6) {
            display.style.fontSize = "5vh";
        } else {
        display.style.fontSize = "8vh";  
    }}
    else if (content.length > 4 && width >=600 &&  width < 800) {
        if (content.length > 8) {
            display.style.fontSize = "3vh";
        }else if (content.length > 6) {
            display.style.fontSize = "8vh";
        } else {
        display.style.fontSize = "10vh";
    }}
    else if (content.length > 4 && width >=800 && width < 1200) {
        if (content.length > 8) {
            display.style.fontSize = "3vh";
        }else if (content.length > 7) {
            display.style.fontSize = "8vh";
        }else if (content.length > 5) {
            display.style.fontSize = "9vh";
        } else {
        display.style.fontSize = "12vh"; 
    }} else if (content.length > 5 && width >=1200 && width < 1600) {
        if (content.length > 14) {
            display.style.fontSize = "4.25vh";
        }else if (content.length > 7) {
            display.style.fontSize = "9vh";
        } else {
        display.style.fontSize = "12vh"; 
    }}
    else if (content.length > 7 &&  width >= 1600 && width < 1900) {
        if (content.length > 15 && width >= 1600 && width < 1900) {
            display.style.fontSize = "6vh";
        } else {
            display.style.fontSize = "9vh";
    }}
    else if (content.length > 7 &&  width >= 1900) {
        if (content.length > 15 && width >= 1900) {
            display.style.fontSize = "6vh";
        } else {
            display.style.fontSize = "9vh";
    }}
}

//updating the calculator's "display" to update input font size on new input and limit input lenghth
function updateDisplayByWidth(event) {
    if (tempNum.num.length <= 7) {
    tempNum.num += event.target.textContent;
    display.style.fontSize = "18vh";
    displayContent(tempNum.num);
    updateNum();
}}

let smallScreenDivs = 2; 

//for every succesfull calculation create a div displaying that calculation. Implement a cap on divs on small mobile screens. 
function calcToDiv(num1, operator, num2, result){
    if ((width < 800 && smallScreenDivs == 5)) {
        smallScreenDivs = 0;
        divs.forEach((div) => {
            div.textContent = "";
        });
    }
    let divId = randomNumber(1, divs.length);
    let div = document.querySelector(`#div${divId}`);
    div.textContent = num1 + " " + operator + " " + num2 + " = " + result; 
    div.setAttribute("class", "newdivs");
    smallScreenDivs++;
}

//on site initialization: div population functions
//make a layout depending on screen size

let id = 0;

const pageData = {};
function getPageData() {
    if (width < 1000) {
        pageData.rowCount = 5;
        pageData.rowBasis = `${100 / 5}%`;
        pageData.rowHeight = `${100 / 10}%`;
        pageData.sideCount = 8;
        pageData.sideBasis = `100%`;
        pageData.sideHeight = `${100 / 8}%`;
    } 
    else {
    pageData.rowCount = 9;
    pageData.rowBasis = `${100 / 9}%`;
    pageData.rowHeight = `${100 / 10}%`;
    pageData.sideCount = 24;
    pageData.sideBasis = `${100 / 3}%`;
    pageData.sideHeight = `${100 / 8}%`;
}
};

function makeDivs() {
    const rC = pageData.rowCount;
    const rB = pageData.rowBasis;
    const rH = pageData.rowHeight;
    const sC = pageData.sideCount;
    const sB = pageData.sideBasis;
    const sH = pageData.sideHeight;
    populateRow(rC, rB, rH);
    populateSideContainer(sC, sB, sH);
    const calculator = document.querySelector("#calculator");
    allContainer.appendChild(calculator);
    populateSideContainer(sC, sB, sH);
    populateRow(rC, rB, rH);
}


function populateRow(rowCount,rowBasis, rowHeight) {
    for (let i = 1; i <= rowCount; i++) {
        const div = document.createElement("div");
        id ++;
        div.setAttribute("class", "divs");
        div.setAttribute("id", "div" + id);
        div.style.flexBasis = rowBasis;
        div.style.height = rowHeight;
        allContainer.appendChild(div);  
        
    }
}

function populateSideContainer(sideCount, sideBasis, sideHeight){
    const sideContainer = document.createElement("div");
    sideContainer.setAttribute("class", "sideContainer");
    allContainer.appendChild(sideContainer);
    for (let i = 1; i <= sideCount; i++) {
        const div = document.createElement("div");
        id ++;
        div.setAttribute("class", "divs");
        div.setAttribute("id", "div" + id);
        div.style.flexBasis = sideBasis;
        div.style.height = sideHeight;
        sideContainer.appendChild(div);    
    } 
}

getPageData();
makeDivs();

//seed some dummy divs to make the design graspable to the user
const divs = document.querySelectorAll(".divs");
function createDummyCalcs(){
    if (width < 1000) {
        for (i = 0; i < 2; i++){
            assembleDiv();
        }
    } else {
    for (i = 0; i < 5; i++){
        assembleDiv();
    }}}

function assembleDiv(){
    let divId = randomNumber(1, divs.length);
        let randomObj = createRandomObj();
        randomObj.result = operate(randomObj.num1, randomObj.operator, randomObj.num2);
        randomObj.result = randomObj.result.indexOf(".") > 0 ? randomObj.result.slice(0, randomObj.result.indexOf(".") + 3) : randomObj.result; 
        let div = document.querySelector(`#div${divId}`);
        div.textContent = randomObj.num1 + " " + randomObj.operator + " " + randomObj.num2 + " = " + randomObj.result;}

function createRandomObj(){
    const randomObj = {};
    randomObj.num1 = randomNumber(-100, 99);
    randomObj.operator = getRandomOperator();
    randomObj.num2 = randomNumber(-100, 99);
    return randomObj;
}

function getRandomOperator(){
    let randomN = randomNumber(1,5);
    if (randomN == 1) {return "/";}
    if (randomN == 2) {return "*";}
    if (randomN == 3) {return "-";}
    if (randomN == 4) {return "+";}
}
createDummyCalcs();

function randomNumber(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }