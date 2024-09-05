let multiply = "multiply";
const allContainer = document.querySelector("#allContainer");

function CreateCalc(id) {
    this.name;
    this.num1;
    this.operator;
    this.num2;
    this.result;
}


const calc1 = new CreateCalc("calc1");
calc1.num1 = 1;
calc1.num2 = 2;
console.log(calc1);


function sum(calc) {
    calc.result = calc.num1 + calc.num2;
    calc.operator = "+";
}


sum(calc1);
console.log(calc1);




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
        console.table(pageData);
    } 
    else {
    pageData.rowCount = 9;
    pageData.rowBasis = `${100 / 9}%`;
    pageData.rowHeight = `${100 / 10}%`;
    pageData.sideCount = 24;
    pageData.sideBasis = `${100 / 3}%`;
    pageData.sideHeight = `${100 / 8}%`;

    console.table(pageData);}
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






    
