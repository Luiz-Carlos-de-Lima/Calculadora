import React , { Component }  from "react";
import './Calculator.css'

import Button from "./Button";
import Display from "./Display";
import Header from "./Header";

const initialState = {
    displayValue: '0',
    value: [""],
    operation: [""],
    currentIndice: 0
}

class Calculator extends Component{

    state = {...initialState}

    constructor(props) {
        super(props)
        this.renderValueInDisplay = this.renderValueInDisplay.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.resetCalculator = this.resetCalculator.bind(this);
        this.generateResult = this.generateResult.bind(this);
    }
    
    renderValueInDisplay() {
        
        //passando uma função ao setState, de tal forma que seu comportamento passa a ser parecido como se fosse sincrono
        this.setState((state) => {
            let result = '';
            let value = state.value;
            let operation = state.operation;
            let sizeValue = value.length;

            for(let i = 0; i < sizeValue; i++) {
                result += value[i];
                if(operation[i]) {
                    result += operation[i];
                }
            }
            
            return { displayValue: result}
        });
    }

    setValue(value) {
        
        let indice = this.state.currentIndice;
        let newValue = [...this.state.value];
        
        if(newValue[indice] === undefined) {
            newValue[indice] = "";
        }

        if(value === '.' && newValue[indice].includes('.')) {
            return
        }
        
        newValue[indice] += value;
        this.setState({ value: newValue });
        this.renderValueInDisplay();
    }

    setOperation(operation) {
        let indice = this.state.currentIndice;
        let newValue = [...this.state.operation];
        let display = this.state.displayValue;
        let displaySize = display.length - 1;
        let operations = ["+", "-", "*", "/"];

        //verificando se o ultimo elemento que foi inserido é alguma operação,
        //caso seja a função vai ser retornada.
        for(let i = 0; i < operations.length; i++) {
            if((display[displaySize] === operations[i] && operation === operations[i]) || display[displaySize] === operations[i]) {
                return
            }
        }
        
        if(newValue[indice] === undefined) {
            newValue[indice] = "";
        }
        
        newValue[indice] += operation;
        this.setState({ operation: newValue});
        this.renderValueInDisplay();
        indice++;
        this.setState({ currentIndice: indice });
    }

    resetCalculator() {
        this.setState({...initialState});
    }

    generateResult() {
        let values = this.state.value;
        let operations = this.state.operation;
        let result = values[0];
        let totOperation = values.length - 1;

        //verificando se os arrays estão vazios
        if(values[0] === "" && operations[0] === "") {
            this.resetCalculator();
            return;
        }

        for(let i = 0; i < totOperation; i++) {
            result += operations[i] + values[i + 1]; 
        }

        this.resetCalculator();
        
        try{
            values = [];
            values[0] = eval(result);

            if(!isFinite(values[0])) {
                values[0] = '0';
            }

            this.setState({ displayValue: values[0], value: values });
        }catch(e) {
            this.resetCalculator();
        }
    }

    render(){
        return (
            <div className="calculator">
                <Header />
                <Display value={ this.state.displayValue }/>
                <div className="button-area">
                    <Button label="7" click={this.setValue}/>
                    <Button label="8" click={this.setValue}/>
                    <Button label="9" click={this.setValue}/>
                    <Button label="C" click={this.resetCalculator} red small/>
                    
                    <Button label="4" click={this.setValue}/>
                    <Button label="5" click={this.setValue}/>
                    <Button label="6" click={this.setValue}/>
                    <Button label="+" click={this.setOperation}/>

                    <Button label="1" click={this.setValue}/>
                    <Button label="2" click={this.setValue}/>
                    <Button label="3" click={this.setValue}/>
                    <Button label="-" click={this.setOperation}/>

                    <Button label="." click={this.setValue}/>
                    <Button label="0" click={this.setValue}/>
                    <Button label="/" click={this.setOperation}/>
                    <Button label="*" click={this.setOperation}/>

                    <Button label="(" click={this.setValue} small blue/>
                    <Button label=")" click={this.setValue} small blue/>
                    <Button label="=" click={this.generateResult} double small red/>
                </div>
            </div>
        );
    }
}


export default Calculator;