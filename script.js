//DOM elements
const buttons = document.querySelectorAll("button");
const allContainer = document.querySelector("#allContainer");
const display = document.querySelector("#M");

// Object to store generated objects
const calcStorage = {};
let calcCounter = 0;
let phaseCounter = 1;


    // Dynamic generator of calculation objects
    //check if can do without key
    function generateCalcs() {
        phaseCounter = 1;
        calcCounter++;
            let key = `${calcCounter}`
            calcStorage[key] = {id: calcCounter, num1: '', num2: '', operator: '', result: ''};
             calcStorage[key];
}



//working on input

generateCalcs();

//listener uses global phaseCounter to check step of the calculation, generates a new calculation sub-object (calcStorage[`${calcCounter - 1}`]) 
//and fills its keys with corresponding input
buttons.forEach((button) => 
    button.addEventListener("click", (event) => {
   if (event.target.id == "C" && (!display.textContent == "")) {
    calcStorage[`${calcCounter}`].num1 = "";
    calcStorage[`${calcCounter}`].num2 = "";
    calcStorage[`${calcCounter}`].operator = "";
    display.textContent = "0";
    phaseCounter = 1;
} if (event.target.id == "back"){ // delete the last character and set display to zero if string is ""
    /*if (!(calcStorage[`${calcCounter}`].result == "")) {
        calcStorage[`${calcCounter}`].num1 = "";
        calcStorage[`${calcCounter}`].num2 = "";
        calcStorage[`${calcCounter}`].operator = "";
        display.textContent = "0";*/
    } if (phaseCounter == 1 && !(calcStorage[`${calcCounter}`].num1 == "") ){
        calcStorage[`${calcCounter}`].num1 = calcStorage[`${calcCounter}`].num1.slice(0, -1);
        display.textContent =  calcStorage[`${calcCounter}`].num1;
            if (calcStorage[`${calcCounter}`].num1 == ""){display.textContent = "0"};
    }
    if (phaseCounter == 2 && !(calcStorage[`${calcCounter}`].num2 == "")) {
        calcStorage[`${calcCounter}`].num1 = calcStorage[`${calcCounter}`].num2.slice(0, -1);
        display.textContent =  calcStorage[`${calcCounter}`].num2;
        if (calcStorage[`${calcCounter}`].num2 == ""){display.textContent = "0"};
    }
} if (event.target.classList.contains("calc")) {
    //avoid two dots in one string
    if ((event.target.id == "dot" && (calcStorage[`${calcCounter}`].num1.includes(".")) && phaseCounter !== 2) ||
        (event.target.id == "dot" && (calcStorage[`${calcCounter}`].num2.includes(".")) && phaseCounter == 2)
        ){return;}
   //make sure the input stays below the calculator display width while also auto-trunctating possible long decimals without the need for rounding
    if ((phaseCounter == 1) && ((calcStorage[`${calcCounter}`].num1.length <= 5)))    
    {
        calcStorage[`${calcCounter}`].num1 += event.target.textContent;
        console.log(phaseCounter);
        display.textContent =  calcStorage[`${calcCounter}`].num1;
    } if (phaseCounter == 2 && (calcStorage[`${calcCounter}`].num2.length <= 5)) {
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        console.log(phaseCounter);
        display.textContent =  calcStorage[`${calcCounter}`].num2;
    }
} if ((event.target.classList.contains("operator"))){
    if (phaseCounter == 1) {
        calcStorage[`${calcCounter}`].operator = event.target.textContent;
        phaseCounter = 2;
        console.log(phaseCounter);
    } else if (phaseCounter == 2) {
        //run calculation 
        calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        display.textContent = calcStorage[`${calcCounter}`].result;
        let tempResult = calcStorage[`${calcCounter}`].result;
        generateCalcs();
        calcStorage[`${calcCounter}`].num1 = tempResult;
        calcStorage[`${calcCounter}`].operator = event.target.textContent;
        phaseCounter = 2;
        //result of prev calc (if needed in temp const) becomes num1 of new calcStorage[`${calcCounter}`] and operator input becomes new operator
    }
} if (event.target.id == "%") { //if % is added to the first number, divide it by 100, if it is added to the second number, treat is as part of the number and immediately execute calculation.
    let divide100 = parseFloat(calcStorage[`${calcCounter}`].num1) / 100;
    if (phaseCounter == 1){
         //run calculation
         calcStorage[`${calcCounter}`].result = divide100.toString();
         //display result
         display.textContent =  calcStorage[`${calcCounter}`].result;
         calcStorage[`${calcCounter}`].num1 += event.target.textContent;
         //delay 0.5 second and add populateDiv animation or do it with next input? 
         generateCalcs();
         console.log(phaseCounter);
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].result = operate(divide100, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
        console.log(calcStorage[`${calcCounter}`].result);
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        display.textContent =  calcStorage[`${calcCounter}`].result;
        generateCalcs();
        console.log(phaseCounter);
    }
}if (event.target.id == "equal" && phaseCounter == 2) {
    //run calculation
    calcStorage[`${calcCounter}`].result = operate(calcStorage[`${calcCounter}`].num1, calcStorage[`${calcCounter}`].operator, calcStorage[`${calcCounter}`].num2);
    //display result
    display.textContent =  calcStorage[`${calcCounter}`].result;
    generateCalcs();
    console.log(phaseCounter);
}
    //if classList contains operator && phase counter is 2, also give result and reset counter, but also move result into num1 of new obj and operator in its operator.key value
}));

//calculation functions


function operate(num1, operator, num2) {
    if (operator == "*"){return multiply(num1, num2);}
    if (operator == "/"){return divide(num1, num2);}
    if (operator == "+"){return summ(num1, num2);}
    if (operator == "-"){return substract(num1, num2);}
}


function multiply(num1, num2) {
    let result = parseFloat(num1) * parseFloat(num2);
    //add move result string into operate function and add check that trunct everything after .0;
    let resultString = result.toString().slice(0,5);;
    return resultString;
}

function divide(num1, num2) {
    let result = parseFloat(num1) / parseFloat(num2);
    let resultString = result.toString().slice(0,5);;
    return resultString;
}

function summ(num1, num2) {
    let result = parseFloat(num1) + parseFloat(num2);
    let resultString = result.toString().slice(0,5);;
    return resultString;
}

function substract(num1, num2) {
    let result = parseFloat(num1) - parseFloat(num2);
    let resultString = result.toString().slice(0,5);;
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
    const width = window.innerWidth;
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






    
