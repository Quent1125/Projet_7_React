import React, {Component} from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from 'react-bootstrap/Form'
import {Accordion, AccordionCollapse, AccordionToggle, FormGroup} from "react-bootstrap";


class Trie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            //restaurant : this.props.restaurant,
            valueMax : 5,
            valueMin : 0,
        }
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(event) {
        let word = event.target.className.split(" ")
        if (word[0]==="max"){
            if (event.target.value >= this.state.valueMin){
                this.setState({valueMax:event.target.value},() => this.props.tri(this.state.valueMax,this.state.valueMin));
            }
        }else if (word[0] === "min"){
            if (event.target.value <= this.state.valueMax){
                this.setState({valueMin:event.target.value},() => this.props.tri(this.state.valueMax,this.state.valueMin));

            }
        }else {
            alert("Erreur dans le select")
        }
    }




    render() {
        return (
            <>
                <Accordion>
                    <AccordionToggle as={Button} variant="primary" eventKey="0">Tri</AccordionToggle>
                    <AccordionCollapse eventKey="0">
                        <Form>
                            <FormGroup>
                                <Form.Label>Afficher les restaurant avec une note compris entre </Form.Label>
                                <Form.Control as="select" value={this.state.valueMin} custom className="min"  onChange={this.handleChange}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Form.Control>
                                <Form.Label> et </Form.Label>
                                <Form.Control as="select" value={this.state.valueMax} custom className="max" onChange={this.handleChange}>
                                    <option  value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Form.Control>
                            </FormGroup>
                        </Form>
                    </AccordionCollapse>
                </Accordion>


            </>
        )

    }


}

export default Trie
