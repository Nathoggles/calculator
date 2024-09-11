// /0
//operator then equal wrong behav
//change percent sign to o/o
//check that div minwidth works on mobile
//check display size on mob and desk, only num1 grows to big.
//newdivs work great but check that have double classes
//two signs after . no longer working

//DOM elements
const buttons = document.querySelectorAll("button");
const allContainer = document.querySelector("#allContainer");
const display = document.querySelector("#M");
const width = window.innerWidth;

// Object to store generated objects
const calcStorage = {};
let calcCounter = 0;
let phaseCounter = 0;
let plusMinus = false;
let tempResult;
let tempNum = {};


    // Dynamic generator of calculation objects
    //check if can do without key
    function generateCalcs() {
        if (phaseCounter != 0){
        calcToDiv(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2, calcStorage[`${calcCounter}`].result);}
        phaseCounter = 1;
        calcCounter++;
        plusMinus = false;
         //   let key = `${calcCounter}`;
            calcStorage[`${calcCounter}`] = {id: calcCounter, num1: '', num2: '', operator: '', result: ''};
             calcStorage[`${calcCounter}`];
}

//displaying results function that shrinks displayed results' font size if the number is large
//!!don't forget to update div fontsize if result is long!!

function displayResults(result) {
    display.textContent = result;
    tempResult = calcStorage[`${calcCounter}`].result;
    if (result.length > 3 &&  width < 600) {
        if (result.length > 8) {
            display.style.fontSize = "3vh";
        }else if (result.length > 5) {
            display.style.fontSize = "5vh";
        } else {
        display.style.fontSize = "8vh";  
    }}
    else if (result.length > 4 && width >=600 &&  width < 800) {
        if (result.length > 8) {
            display.style.fontSize = "8vh";
        } else {
        display.style.fontSize = "10vh";
    }}
    else if (result.length > 5 && width >=800 && width < 1500) {
        if (result.length > 14) {
            display.style.fontSize = "5vh";
        }else if (result.length > 8) {
            display.style.fontSize = "9vh";
        } else {
        display.style.fontSize = "12vh"; 
    }}
    else if (result.length > 6 &&  width >= 1500) {
        if (result.length > 18) {
            display.style.fontSize = "6vh";
        } else {
            display.style.fontSize = "9vh";
    }}
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


//working on input

generateCalcs();






/*
if phasecounter 1 = tempObject.num = num1
if 2 = 2;

*/
//Global button click listener

buttons.forEach((button) => 
    button.addEventListener("click", (event) => {
    display.style.fontSize = "18vh";
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
    display.textContent = "0";
    phaseCounter = 1;
}

function onBack()
    { //on pressing the back button: delete the last character, if string is "" - set display to 0, if clicked on the result phase, behave as a C button
        if ((tempResult == display.textContent) || (tempResult == tempNum.num)) {
            calcStorage[`${calcCounter}`].num1 = "";
            calcStorage[`${calcCounter}`].num2 = "";
            calcStorage[`${calcCounter}`].operator = "";
            display.textContent = "0";  
        } if (display.textContent == tempNum.num) {
            tempNum.num = tempNum.num.slice(0, -1);
            display.textContent = tempNum.num;
            updateNum();
            if (tempNum.num == "") {display.textContent = "0";}
        } 
}

function onNumber(event){
    //avoid two dots in one string
    if ((event.target.id == "dot" && tempNum.num.includes(".")) ){ return;}
   //make sure the input stays below the calculator display width while also auto-trunctating possible long decimals without the need for rounding
    if ((tempNum.num.length <= 3 &&  width < 1100) || (tempNum.num.length <= 4 && width >= 1100 && width < 1500) || (tempNum.num.length <= 6 &&  width >= 1500)) {
        tempNum.num += event.target.textContent;
        display.textContent = tempNum.num;
        updateNum();
    } 
}

function onPlusMinus() {
    if (!plusMinus){
        tempNum.num = "-" + tempNum.num;
     }
    if (plusMinus){
        tempNum.num = tempNum.num.slice(1);
    }
    display.textContent = tempNum.num 
    updateNum();
    plusMinus = !plusMinus;
}

function onOperator(event){
    if (phaseCounter == 1) {
        calcStorage[`${calcCounter}`].operator = event.target.id;
        if (tempResult == display.textContent) { //if used on result screen, asign result to num1 and operator as operator of the next calculation object
            calcStorage[`${calcCounter}`].num1 = tempResult;
        }
        phaseCounter = 2;
        plusMinus = false;
    }
    else if (phaseCounter == 2) { //if operator button is used a second time, behave as a = button and store the result for a new calculation
        if ((calcStorage[`${calcCounter}`].operator != "") && (calcStorage[`${calcCounter}`].num2 == "")) {return;}//checks if an operator has already been asigned to the calculation;
        calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        displayResults(calcStorage[`${calcCounter}`].result);
        generateCalcs();
        calcStorage[`${calcCounter}`].num1 = tempResult;
        calcStorage[`${calcCounter}`].operator = event.target.id;
        phaseCounter = 2;
        console.table(calcStorage[`${calcCounter}`]);
    }
}

function onPercent(event){
    //on pressing the % button: if % is added to the first number, divide it by 100, if it is added to the second number, treat is as part of the number and immediately execute calculation.
    let divide100 = parseFloat(calcStorage[`${calcCounter}`].num1) / 100;
    if (phaseCounter == 1){
         calcStorage[`${calcCounter}`].result = divide100.toString();
         displayResults(calcStorage[`${calcCounter}`].result);
         calcStorage[`${calcCounter}`].num1 += event.target.id;
         generateCalcs();
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].result = operate(divide100, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        displayResults(calcStorage[`${calcCounter}`].result);
        generateCalcs();
    }
}

function onEqual(){
    calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
    displayResults(calcStorage[`${calcCounter}`].result);
    generateCalcs();
}



//calculation functions


function operate(num1, operator, num2) {

    // /0 "/0? RLY?" message goes here
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
    result = result.indexOf(".") > 0 ? result.slice(0, result.indexOf(".") + 3) : result; 
    return result;
}

//div population functions


//make a layout depending on screen size

let id = 0;

const pageData = {};
function getPageData() {
    if (width < 600) {
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

function calcToDiv(num1, operator, num2, result){
    let divId = randomNumber(1, divs.length);
    let div = document.querySelector(`#div${divId}`);
    if (operator == "*") {operator = "x"};
    div.textContent = num1 + " " + operator + " " + num2 + " = " + result; 
    div.setAttribute("class", "newdivs");
}

const divs = document.querySelectorAll(".divs");
function createDummyCalcs(){
    for (i = 0; i < 5; i++){
        let divId = randomNumber(1, divs.length);
        let randomObj = createRandomObj();
        randomObj.result = operate(randomObj.num1, randomObj.operator, randomObj.num2);
        randomObj.result = randomObj.result.indexOf(".") > 0 ? randomObj.result.slice(0, randomObj.result.indexOf(".") + 3) : randomObj.result; 
        if (randomObj.operator == "*") {randomObj.operator = "x"};
        console.log(randomObj.result.indexOf("."))
        let div = document.querySelector(`#div${divId}`);
        div.textContent = randomObj.num1 + " " + randomObj.operator + " " + randomObj.num2 + " = " + randomObj.result;
    }}

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

