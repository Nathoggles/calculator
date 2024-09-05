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

/*
////div sketching
function populateDivs(crossANumber) {
    for (let i = 1; i <= crossANumber; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "divs");
        const width = allContainer.offsetWidth;
        const height = allContainer.offsetHeight
        console.log({width});
        console.log({height});
        div.style.flexBasis = `${100 / (crossANumber * 2)}%`;
        //div.style.width = width / (6) + "px";
        //div.style.height = height / (4) + "px";
        //`${window.screen.width / (crossANumber / 4)}%`;
        allContainer.appendChild(div);
    }
 //   listener();
}
*/
function populateDivs() {
    for (let i = 1; i <= 66; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "divs");
        //div.setAttribute("id", "div" + i);
        div.style.flexBasis = `${100 / 9}%`;
        div.style.height = `${100 / 10}%`
        allContainer.appendChild(div);     
    }
    const calculator = document.querySelector("#calculator");
    const midDiv = document.querySelector("#div34");
    console.log(midDiv);
    allContainer.insertBefore(calculator, midDiv);
}
populateDivs();

function populateRow() {
    for (let i = 1; i <= 9; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "divs");
        //div.setAttribute("id", "div" + i);
        div.style.flexBasis = `${100 / 9}%`;
        div.style.height = `${100 / 10}%`
        allContainer.appendChild(div);    
    }
}

function populateSideContainer(){
    const sideContainer = document.createElement("div");
    sideContainer.setAttribute("class", "sideContainer");
    div.style.flexBasis = `${100 / 9}%`;
    div.style.height = `${100 / 10}%`
}

function populatePage() {
    populateRow();



    populateRow();
}