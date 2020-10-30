import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import mapStoreToProps from '../redux/mapStoreToProps'
import {Grommet, List, Box, Card, CardHeader, CardBody, CardFooter, Heading} from 'grommet'

function EquationsList(props) {

    const dispatch = useDispatch();

    useEffect((props) => {
        dispatch({type: 'GET_EQUATIONS'})
    }, [])

    return(
        <Box style={{paddingTop: 20}}>
            <Card style={{width:500}}>
                <CardHeader pad="small" background="light-2"><Heading level="3">Equations</Heading></CardHeader>
                <CardBody pad="small" background="light-1">
                    <ol>
                        {props.store.equations.map(equation => (
                            <Heading level="5" key={equation.id}><li>{equation.equation} = {equation.answer}</li></Heading>
                        ))}
                    </ol>
                </CardBody>
                <CardFooter pad="small" background="light-2">
                    <Heading level="6">By: Sam Maus</Heading>      
                </CardFooter>
            </Card>
        </Box>
    )
}

export default connect(mapStoreToProps)(EquationsList)