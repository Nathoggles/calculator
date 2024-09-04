function CreateCalc(calcId, num1, operator, num2, result) {
    this.name = calcId;
    this.num1 = num1;
    this.operator = operator;
    this.num2 = num2;
    this.result = result;
}


const calc1 = new CreateCalc("calc1", 2, 2, 3);
console.log(calc1);
