function createCalc(calcId, num1, operator, num2, result) {
    const id = {};
    id.name = calcId;
    id.num1 = num1;
    id.operator = operator;
    id.num2 = num2;
    id.result = result;
    return id;
}


const calc1 = (createCalc("calc1", 2, 2, 3));
console.log(calc1);
