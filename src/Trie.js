import React, {Component} from "react";
import Restaurant from "./restaurant";
import Button from "react-bootstrap/cjs/Button";
import Form from 'react-bootstrap/Form'
import {Accordion, AccordionCollapse, AccordionToggle, FormGroup} from "react-bootstrap";


class Trie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            restaurant : this.props.restaurant,
            restaurantTrie : this.props.restaurant,
            valueMax : 5,
            valueMin : 0,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    averageStars(ratings){
        let average = 0;
        ratings.map( x => average += x.stars);
        average =  average/(ratings.length);
        return(average)
    }

    handleChange(event) {
        let word = event.target.className.split(" ")
        if (word[0]==="max"){
            if (event.target.value >= this.state.valueMin){
                this.setState({valueMax:event.target.value});
                this.trieRestaurant();
            }
        }else if (word[0] === "min"){
            if (event.target.value <= this.state.valueMax){
                this.setState({valueMin:event.target.value});
                this.trieRestaurant();
            }
        }else {
            alert("Erreur dans le select")
        }
    }

    trieRestaurant(){
        let tabR = this.state.restaurant.filter(x => (this.state.valueMax>= this.averageStars(x.ratings)) && ((this.averageStars(x.ratings)) >=this.state.valueMin))
        this.setState({restaurantTrie:tabR})
    }


    render() {
        return (
            <>
                <Accordion>
                    <AccordionToggle as={Button} variant="primary" eventKey="0">Trie</AccordionToggle>
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

                <div id="tableList">
                    {this.state.restaurantTrie.map( (x,index) =>
                        <Restaurant key={index} name = {x.restaurantName} address= {x.address}  ratings={x.ratings} lat={x.lat} lng={x.long} />
                    )}
                </div>
            </>
        )

    }


}

export default Trie
