class Screen {
    constructor() {
        this.currentState = document.getElementById('screen')
    }
    addNumberToScreen(input) {
        this.currentState.innerText += input
    }
    addOperatorToScreen(input) {
        this.currentState.innerText += input
    }
    deleteScreen() {
        this.currentState.innerText = ''
    }
    showTotal(result) {
        this.currentState.innerText = result
    }
}

class Calculator {
    constructor() {
        this.canAddOperator = false
        this.canAddNumber = true
        this.numbersButtons = document.querySelectorAll(".number")
        this.operatorButtons = document.querySelectorAll(".operator")
        this.deleteButton = document.getElementById('delete')
        this.equalButton = document.getElementById('equal-button')
        this.screen = new Screen()
        this.currentOperator = {}
        this.currentNumberInput = new Number()
        this.numbersArr = []
        this.result = 0


        this.numbersButtons.forEach(number => {
            number.addEventListener('click', (e) => {
                if (!this.canAddNumber) return
                const buttonValue = e.currentTarget.innerText
                this.currentNumberInput.value += buttonValue

                this.screen.addNumberToScreen(e.currentTarget.innerText)
                if (!calculator.canAddOperator) {
                    calculator.canAddOperator = true
                }
            })
        })

        this.operatorButtons.forEach(operator => {
            operator.addEventListener('click', (e) => {
                let input = e.currentTarget.innerText
                let symbol = input
                if (input == 'x') symbol = '*'
                if (input == '÷') symbol = '/'
                if (this.canAddOperator) {

                    this.saveNumber(this.currentNumberInput.value)
                    this.currentOperator = new Operator(symbol)
                    if (this.numbersArr.length > 1) {
                        this.calculate(
                            this.numbersArr[0],
                            this.numbersArr[1],
                            this.currentOperator.symbol)
                    }
                    this.screen.addOperatorToScreen(this.currentOperator.symbol)
                    this.canAddOperator = false
                    this.canAddNumber = true
                }
            })
        })
        this.deleteButton.addEventListener('click', (e) => {
            this.canAddNumber = true
            this.screen.deleteScreen()
            this.numbersArr = []
        })

        this.equalButton.addEventListener('click', e => {
            this.saveNumber(this.currentNumberInput.value)
            this.calculate(
                this.numbersArr[0],
                this.numbersArr[1],
                this.currentOperator.symbol)
        })
    }
    saveNumber(numberToSave) {
        if (numberToSave != 0) this.numbersArr.push(numberToSave * 1)
        this.currentNumberInput = new Number()
    }
    calculate(a, b, operator) {
        const operation = new Operation(a, b)
        this.canAddNumber = false

        switch (operator) {
            case '+':
                this.result = operation.add()
                console.log(a, b)
                break;
            case '-':
                this.result = operation.substract()
                break;
            case '*':
                this.result = operation.multiply()
                break;
            case '/':
                this.result = operation.divide()
                break;
        }
        this.screen.showTotal(this.result)
        this.numbersArr = []
        this.saveNumber(this.result)
        this.result = 0
    }
}


class Operator {
    constructor(symbol) {
        this.symbol = symbol
    }
}
class Number {
    constructor(value = '') {
        this.value = value
    }
}

class Operation {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    add() {
        return this.a + this.b
    }
    substract() {
        return this.a - this.b
    }
    multiply() {
        return this.a * this.b
    }
    divide() {
        return this.a / this.b
    }

}

const calculator = new Calculator()