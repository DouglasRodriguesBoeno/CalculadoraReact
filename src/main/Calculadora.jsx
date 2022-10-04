import React, { Component } from 'react'
import './Calculadora.css'

import Button from '../components/button'
import Display from '../components/display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculadora extends Component {

    state = initialState

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.setDigit = this.setDigit.bind(this)

    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({
                operation, current: 1, clearDisplay: true
            })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try {
                //USANDO O EVAL POR SER UM PROOJETO SOMENTE PARA PORTIFÓLIO
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }

            } catch (e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    setDigit(d) {
        if (d === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + d
        this.setState({
            displayValue, clearDisplay: false
        })

        if (d !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)

            const values = [...this.state.values]
            values[i] = newValue
            this.setState({
                values
            })

            console.log(values)
        }
    }

    render() {

        return (
            <div className='calculadora' >
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.setDigit} />
                <Button label="8" click={this.setDigit} />
                <Button label="9" click={this.setDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.setDigit} />
                <Button label="5" click={this.setDigit} />
                <Button label="6" click={this.setDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.setDigit} />
                <Button label="2" click={this.setDigit} />
                <Button label="3" click={this.setDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.setDigit} double />
                <Button label="." click={this.setOperation} />
                <Button label="=" click={this.setOperation} />
            </div>
        )
    }
}