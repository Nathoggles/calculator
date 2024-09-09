//DOM elements
const buttons = document.querySelectorAll("button");
const allContainer = document.querySelector("#allContainer");
const display = document.querySelector("#M");
const width = window.innerWidth;

// Object to store generated objects
const calcStorage = {};
let calcCounter = 0;
let phaseCounter = 1;
let plusMinus = false;
let tempResult;
let tempNum = {};


    // Dynamic generator of calculation objects
    //check if can do without key
    function generateCalcs() {
        phaseCounter = 1;
        calcCounter++;
        plusMinus = false;
            let key = `${calcCounter}`
            calcStorage[key] = {id: calcCounter, num1: '', num2: '', operator: '', result: ''};
             calcStorage[key];
}

//displaying results function that shrinks displayed results' font size if the number is large
//!!don't forget to update div fontsize if result is long!!

function displayResults(result) {
    display.textContent = result;
    tempResult = calcStorage[`${calcCounter}`].result;
    if (result.length > 3 &&  width < 600) {
        display.style.fontSize = "4vh";
        console.log(display.style.fontSize);   
    }
    else if (result.length > 4 &&  width < 800) {
        display.style.fontSize = "6vh";
        console.log(display.style.fontSize);   
    }
    else if (result.length > 5 &&  width < 1300) {
        display.style.fontSize = "9vh";
        console.log(display.style.fontSize);   
    }
   else if (result.length > 6 &&  width >= 1500) {
        display.style.fontSize = "9vh";
        console.log(display.style.fontSize);
    }
}

//set a temporary num each time a button is pressed depending on the current state (before an operator is selected or after), 
//allowing to declump the main input function and reduce if/else statements based on phaseCounter. 
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
//listener uses global phaseCounter to check step of the calculation, generates a new calculation sub-object (calcStorage[`${calcCounter - 1}`]) 
//and fills its keys with corresponding input
buttons.forEach((button) => 
    button.addEventListener("click", (event) => {
    display.style.fontSize = "18vh";
    setTempNum();
    console.log(tempNum.num);
    console.log(calcStorage[`${calcCounter}`].num1);
   if (event.target.id == "C" && (!display.textContent == "")) {//on pressing the C (reset) button
    calcStorage[`${calcCounter}`].num1 = "";
    calcStorage[`${calcCounter}`].num2 = "";
    calcStorage[`${calcCounter}`].operator = "";
    display.textContent = "0";
    phaseCounter = 1;
} if (event.target.id == "back"){ //on pressing the back button: delete the last character, if string is "" - set display to 0, if clicked on the result phase, behave as a C button
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
} if (event.target.classList.contains("calc")) { //on pressing a number or dot button 
    //avoid two dots in one string
    if ((event.target.id == "dot" && (calcStorage[`${calcCounter}`].num1.includes(".")) && phaseCounter !== 2) ||
        (event.target.id == "dot" && (calcStorage[`${calcCounter}`].num2.includes(".")) && phaseCounter == 2)
        ){return;}
   //make sure the input stays below the calculator display width while also auto-trunctating possible long decimals without the need for rounding
    if ((tempNum.num.length <= 3 &&  width < 1100)) {
        console.log(width);
        console.log(tempNum.num.length);
        tempNum.num += event.target.textContent;
        display.textContent = tempNum.num;
        updateNum();
    } else if ((tempNum.num.length <= 4 && width >= 1100 && width < 1500)) {
        console.log(width);
        tempNum.num += event.target.textContent;
        display.textContent = tempNum.num;
        updateNum();
    } else if ((tempNum.num.length <= 6 &&  width >= 1500)) {
    console.log(width);
    tempNum.num += event.target.textContent;
    display.textContent = tempNum.num;
    updateNum();}
} if (event.target.id == "+-") {// on pressing the +- button
    if (phaseCounter == 1) {
        if (!plusMinus){
        calcStorage[`${calcCounter}`].num1 = "-" + calcStorage[`${calcCounter}`].num1;
         }
        if (plusMinus){
        calcStorage[`${calcCounter}`].num1 = calcStorage[`${calcCounter}`].num1.slice(1);
        }
        display.textContent = calcStorage[`${calcCounter}`].num1;
        plusMinus = !plusMinus;
    }
    if (phaseCounter == 2) {
        if (!plusMinus){
            calcStorage[`${calcCounter}`].num2 = "-" + calcStorage[`${calcCounter}`].num2;
             }
            if (plusMinus){
            calcStorage[`${calcCounter}`].num2 = calcStorage[`${calcCounter}`].num2.slice(1);
            }
            display.textContent = calcStorage[`${calcCounter}`].num2;
            plusMinus = !plusMinus;
    }
} if ((event.target.classList.contains("operator"))){ //on pressing an operator button
    if (phaseCounter == 1) {
        calcStorage[`${calcCounter}`].operator = event.target.textContent;
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
} if (event.target.id == "%") { //on pressing the % button: if % is added to the first number, divide it by 100, if it is added to the second number, treat is as part of the number and immediately execute calculation.
    let divide100 = parseFloat(calcStorage[`${calcCounter}`].num1) / 100;
    if (phaseCounter == 1){
         //run calculation
         calcStorage[`${calcCounter}`].result = divide100.toString();
         //display result
         displayResults(calcStorage[`${calcCounter}`].result);
         calcStorage[`${calcCounter}`].num1 += event.target.textContent;
         //delay 0.5 second and add populateDiv animation or do it with next input? 
         generateCalcs();
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].result = operate(divide100, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        console.log(calcStorage[`${calcCounter}`].result);
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        displayResults(calcStorage[`${calcCounter}`].result);
        generateCalcs();
    }
}if (event.target.id == "equal" && phaseCounter == 2) { //on pressing the = button
    //run calculation
    calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
    //display result
    displayResults(calcStorage[`${calcCounter}`].result);
    generateCalcs();
}
}));

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
    //add move result string into operate function and add check that trunct everything after .0;
    let resultString = result.toString();//.slice(0,5);;
    return resultString;
}

function divide(num1, num2) {
    let result = parseFloat(num1) / parseFloat(num2);
    let resultString = result.toString();//.slice(0,5);;
    return resultString;
}

function summ(num1, num2) {
    let result = parseFloat(num1) + parseFloat(num2);
    let resultString = result.toString();//.slice(0,5);;
    return resultString;
}

function substract(num1, num2) {
    let result = parseFloat(num1) - parseFloat(num2);
    let resultString = result.toString();//.slice(0,5);;
    return resultString;
}

 //constructor function, prbly not needed.
 /*
function CreateCalc(name) {
    this.name;
    console.log(this.name);
    this.num1;
    this.operator;
    this.num2;
    this.result;
}
*/

/*const calc1 = new CreateCalc("calc1");
calc1.num1 = 1;
calc1.num2 = 2;*/


/*
generateCalcs();
generateCalcs();
generateCalcs();
console.log(calcStorage);
console.log(calcStorage['1']);
calcStorage['1'].num1 = 2;

console.log(calcStorage['1'].num1);*/
 

///calc functions


function sum(calc) {
    calc.result = calc.num1 + calc.num2;
    calc.operator = "+";
}





//randomize background
function randomNumber() {
    const minCeiled = Math.ceil(0.1);
    const maxFloored = Math.floor(99.9);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

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






    
