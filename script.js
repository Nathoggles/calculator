let multiply = "multiply";

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