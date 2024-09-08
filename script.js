//DOM elements
const buttons = document.querySelectorAll("button");
const allContainer = document.querySelector("#allContainer");
const display = document.querySelector("#M");

// Object to store generated objects
const calcStorage = {};
let calcCounter = 1;
    // Dynamic generator of calculation objects
    //check if can do without key
    function generateCalcs() {
            let key = `${calcCounter}`
            calcStorage[key] = {id: calcCounter, num1: '', num2: '', operator: '', result: ''};
             calcStorage[key];
}



//working on input
let phaseCounter = 0;


//listener uses global phaseCounter to check step of the calculation, generates a new calculation sub-object (calcStorage[`${calcCounter - 1}`]) 
//and fills its keys with corresponding input
buttons.forEach((button) => 
    button.addEventListener("click", (event) => {
       // console.log(event.target);
  if (event.target.classList.contains("calc") && phaseCounter == 0){
        //create obj.
        generateCalcs();
        phaseCounter = 1;
        console.log(phaseCounter);
 } if (event.target.id == "C") {
    calcStorage[`${calcCounter}`].num1 = "";
    calcStorage[`${calcCounter}`].num2 = "";
    calcStorage[`${calcCounter}`].operator = "";
    display.textContent = "0";
    phaseCounter = 0;
} if (event.target.classList.contains("calc")) {
    if (phaseCounter == 0 || phaseCounter == 1)    
    {
        calcStorage[`${calcCounter}`].num1 += event.target.textContent;
        console.log(phaseCounter);
        display.textContent =  calcStorage[`${calcCounter}`].num1;
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        console.log(phaseCounter);
        display.textContent =  calcStorage[`${calcCounter}`].num2;
    }
} if ((event.target.classList.contains("operator"))){
    if (phaseCounter == 0 || phaseCounter == 1) {
        calcStorage[`${calcCounter}`].operator = event.target.textContent;
        phaseCounter = 2;
        console.log(phaseCounter);
    } else if (phaseCounter == 2) {
        //run calculation
        //display result
        calcCounter++;
        console.log(phaseCounter);
        generateCalcs();
        //result of prev calc (if needed in temp const) becomes num1 of new calcStorage[`${calcCounter}`] and operator input becomes new operator
        phaseCounter = 0
    }
} if (event.target.id == "%") { //if % is added to the first number, abort and display 0, if it is added to the second number, treat is as part of the number and immediately execute calculation.
    if (phaseCounter == 0 || phaseCounter == 1);{
        calcStorage[`${calcCounter}`].num1 = "";
        display.textContent = "0";
        phaseCounter = 0;
    } if (phaseCounter == 2) {
        calcStorage[`${calcCounter}`].num2 += event.target.textContent;
        phaseCounter = 0;
        calcCounter ++;
    }
}if (event.target.id == "equal" && phaseCounter == 2) {
    //run calculation
    //display result
    phaseCounter = 0;
    calcCounter ++;
    console.log(phaseCounter);
}
    //if classList contains operator && phase counter is 2, also give result and reset counter, but also move result into num1 of new obj and operator in its operator.key value
}));

//calculation functions
let multiply = "multiply";

function operate(num1, operator, num2) {
    if (operator == "*"){return multiply();}
    if (operator == "/"){return divide();}
    if (operator == "+"){return sum();}
    if (operator == "-"){return substract();}

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






    
