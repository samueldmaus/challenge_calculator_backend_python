import React, {Component} from 'react'
import {Grommet, Button, Box, TextInput} from 'grommet'
import {LinkPrevious} from 'grommet-icons'
import { connect } from 'react-redux'

class Calculator extends Component{
    // state to keep track of what's in the input field
    state = {
        value: '',
    }

    // add clicked value to the input field
    addValue = (event) => {
        // if state is '' then just add the clicked, else add the clicked value to whatever is already present in state
        if(this.state.value === ''){
            this.setState({
                value: event.target.value
            })
        }else{
            this.setState({
                value: this.state.value + event.target.value
            })
        }
    }

    // clear the input field by reseting state
    clearInput = () => {
        this.setState({
            value: '',
        })
    }

    // dispatch the equation to the equations saga and reset input field
    addToEquationPlusCalculate = () => {
        this.props.dispatch({type: "ADD_EQUATION", payload: {equation: this.state.value}});
        this.clearInput();
    }

    // delete the last value from the input field
    deleteInput = () => {
        this.setState({
            value: this.state.value.slice(0, this.state.value.length-1)
        })
    }

    render(){
        return(
            <Box style={{width:308, paddingBottom:15}}border={{color: 'brand', size:'medium'}} direction="column" gap="xsmall">
                <Box style={{padding: 10}} alignContent="center">
                    <TextInput style={{width: 280 }} size= "medium" value={this.state.value}/> 
                </Box>
                <Box style={{paddingLeft:20}} direction="row" gap="medium">
                    <Button size="small" label="Clear" onClick={this.clearInput}/>
                </Box>
                <Box style={{paddingLeft:20}} direction="row" gap="xsmall">
                    <Button value="7" label="7" onClick={this.addValue}/>
                    <Button value="8" label="8" onClick={this.addValue}/>
                    <Button value="9" label="9" onClick={this.addValue}/>
                    <Button value="÷" label="÷" onClick={this.addValue}/>
                </Box>
                <Box style={{paddingLeft:20}} direction="row" gap="xsmall">
                    <Button value="4" label="4" onClick={this.addValue}/>
                    <Button value="5" label="5" onClick={this.addValue}/>
                    <Button value="6" label="6" onClick={this.addValue}/>
                    <Button value="x" label="x" onClick={this.addValue}/>
                </Box>
                <Box style={{paddingLeft:20}} direction="row" gap="xsmall">
                    <Button value="1" label="1" onClick={this.addValue}/>
                    <Button value="2" label="2" onClick={this.addValue}/>
                    <Button value="3" label="3" onClick={this.addValue}/>
                    <Button value="-" label="-" onClick={this.addValue}/>
                </Box>
                <Box style={{paddingLeft:20, paddingBottom:5}} direction="row" gap="xsmall">
                    <Button value="0" label="0" onClick={this.addValue}/>
                    <Button label={<LinkPrevious size='small' color='plain'/>} onClick={this.deleteInput}/>
                    <Button value="=" label="=" onClick={this.addToEquationPlusCalculate}/>
                    <Button value="+" label="+" onClick={this.addValue}/>
                </Box>
            </Box>
        )
    }
}

export default connect()(Calculator);