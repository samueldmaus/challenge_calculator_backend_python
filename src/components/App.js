import React, {Component} from 'react'
import {Grommet, Heading} from 'grommet'
import Calculator from './Calculator.js'
import EquationsList from './EquationsList'

class App extends Component{

    render(){
        return(
            <>
                <Heading level="2">CALCULATOR</Heading>
                <Calculator/>
                <EquationsList />
            </>
        )
    }
}

export default App;