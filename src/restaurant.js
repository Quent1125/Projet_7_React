import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/cjs/Button";
import {GoogleMap, StreetViewPanorama} from "@react-google-maps/api";
import {Accordion, AccordionCollapse, AccordionToggle, FormGroup, FormLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";


class Restaurant extends Component{

    constructor(props){
        super(props);
        this.state = {
            showInfo :false,
            ratings : [],
            new : {
                stars:undefined,
                comment:undefined
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.addNewRatings = this.addNewRatings.bind(this);
        this.defStar = this.defStar.bind(this)
    }

    componentDidMount() {
        this.setState({
            ratings: this.props.ratings
        })
    }


    static getDerivedStateFromProps(props, state) {
        if (props.ratings !== state.ratings) {
            return {
                ratings: props.ratings
            };
        }
        // Renvoie `null` si aucune mise à jour de l’état n’est nécessaire.
        return null;
    }

    handleClose = () => this.setState({showInfo:false});


    handleShow = () => this.setState({showInfo:true});

    addNewRatings(){
        if ((this.state.new.comment !== undefined) && (this.state.new.stars !== undefined)){
            let tbR = this.state.ratings
            tbR.push(this.state.new)
            this.setState({
                ratings : tbR,
                new : {
                    stars:undefined,
                    comment:undefined
                }
            })
            document.getElementById('selectStars').value = ""
            document.getElementById('textComment').value = ""
        }
    }


    handleChange(event) {
        if (event.target.type === 'select-one'){
             let s =  event.target.value;
            this.setState({new: {
                    stars: parseInt(s),
                    comment : this.state.new.comment
                }
            })
        }else if (event.target.type === 'textarea'){
             let co = event.target.value;
            this.setState({new: {
                    stars : this.state.new.stars,
                    comment : co
                }
            })
        }

    }

    defStar(average){
        let a = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]
        if (a.includes(average)  ){
            return average
        }else if (isNaN(average)){
            return 0
        } else {
            return Math.round(average)
        }
    }

    render() {
        const mapContainerStyle = {
            height: "400px",
            width: "750px"
        };
        let av = this.defStar(this.props.average)
        const location = {
            lat: this.props.lat,
            lng: this.props.lng
        }
       return(
           <div id="case" >
               <h3>{this.props.name}</h3>
               <p>
                   {this.props.address}<br/>
                   <img  alt="etoiles" src={require(`./resource/img/${av}star.png`)}/><br />
                   <Button variant="outline-primary" className={this.props.name} onClick={this.handleShow}>En voir plus</Button>
               </p>
               <Modal show={this.state.showInfo} onHide={this.handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                   <Modal.Header closeButton>
                       <Modal.Title>{this.props.name}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body >
                       <h1>Avis :</h1>
                       <div id="boxRatings">
                           {this.state.ratings.map((x,index) =>
                               <ul key={index}>
                                   <li><img key={index} id="littleStar" alt="étoiles" src={require(`./resource/img/${x.stars}star.png`)}   /> <br />
                                       {x.comment}</li>
                               </ul>
                           )}
                       </div><br/>

                       <Accordion>
                           <AccordionToggle as={Button} variant="primary" eventKey="0">Ajouter un avis</AccordionToggle>
                           <AccordionCollapse eventKey="0">
                               <Form>
                                   <FormGroup>
                                       <FormLabel>Note : </FormLabel>
                                       <Form.Control as="select" id="selectStars"  custom className="min"  onChange={this.handleChange}>
                                           <option value={0}>0</option>
                                           <option value={1}>1</option>
                                           <option value={2}>2</option>
                                           <option value={3}>3</option>
                                           <option value={4}>4</option>
                                           <option value={5}>5</option>
                                       </Form.Control>
                                       <FormLabel>Commentaire:</FormLabel>
                                       <Form.Control as="textarea" id="textComment" rows="2"  onChange={this.handleChange}/>
                                   </FormGroup>
                                   <Button variant="success" onClick={this.addNewRatings}>Ajouter</Button>
                               </Form>
                           </AccordionCollapse>
                       </Accordion> <br/>



                           <GoogleMap
                               mapContainerStyle={mapContainerStyle}
                               zoom={7}
                               center={location}
                           >
                               <StreetViewPanorama
                                   position={location}
                                   visible={true}
                               />
                           </GoogleMap>


                   </Modal.Body>
                   <Modal.Footer>
                       <Button variant="secondary" onClick={this.handleClose}>
                           Fermer
                       </Button>
                   </Modal.Footer>
               </Modal>
           </div>
       )
    }


}

export default Restaurant