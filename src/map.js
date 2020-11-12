import React, {Component} from "react";
import {GoogleMap, Marker, DrawingManager} from '@react-google-maps/api';
import Modal from "react-bootstrap/Modal";
import {FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";





class Maps extends Component{

    constructor(props){
        super(props)
        this.state = {
            newPos : null,
            locationCenter : {},
            restaurantLocation : [],
            showAdd : false,
            drawing : 'marker',
            newR : {
                restaurantName:"",
                address:"",
                lat:0,
                long:0,
                ratings:[],
                average: 1,
                place_id: "New Restaurant"
            }

        }
        this.handleSend = this.handleSend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLoad = this.handleLoad.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
        this.handleCenterChanged = this.handleCenterChanged.bind(this)




    }

    static getDerivedStateFromProps(props, state) {
        if ((props.location !== state.locationCenter) || (props.restaurantLocation !== state.restaurantLocation)) {
            return {
                locationCenter: props.location,
                restaurantLocation: props.restaurantLocation
            };
        }
        return null;
    }

    handleClose = () => this.setState({
        showAdd:false,
        drawing : 'marker',
        newR : {}
    })


    handleShow = marker => {
        let R = this.state.newR
        R.lat = marker.getPosition().lat()
        R.long = marker.getPosition().lng()
        this.setState({
            drawing : null,
            showAdd:true,
            mapRef : null,
            newR : R
        })
    }

    handleChange(event) {
        let R = this.state.newR
        if (event.target.name === 'name'){
            R.restaurantName =  event.target.value
            this.setState({
                newR : R
            })
        }else if (event.target.name === 'address'){
            R.address = event.target.value
            this.setState({
                newR : R
            })
        }
    }

    handleSend(){
        this.props.addRestaurant(this.state.newR)
        this.setState({
            drawing : 'marker',
            showAdd:false,
            newR : {
                restaurantName:"",
                address:"",
                lat:0,
                long:0,
                ratings:[],
                average: 1,
                place_id: "New Restaurant"
            }
        })


    }

    handleLoad(map) {
        this.setState({
            mapRef: map
        })
    }

    handleCenterChanged() {
        if (!this.state.mapRef) return;
        this.setState({
            newPos: this.state.mapRef.getCenter().toJSON()
        })
    }

    handleMouseOut(e){
        if (this.state.newPos !== null){
            this.props.move(this.state.newPos)
            this.setState({
                newPos : null
            })
        }

    }



    render() {
        const containerStyle = {
            width: '1250px',
            height: '685px'
        }
        const {locationCenter, restaurantLocation, drawing, showAdd} = this.state
        return (
            <div>
                <GoogleMap
                    onLoad={this.handleLoad}
                    onCenterChanged={this.handleCenterChanged}
                    onMouseOut={this.handleMouseOut}
                    mapContainerStyle={containerStyle}
                    center={locationCenter}
                    zoom={13}
                >

                    {restaurantLocation.map((x,index) =>
                        <Marker
                            key={index}
                            position={x}
                            zIndex={index}
                            icon={require("./resource/img/icons8-tableware-64.png")}
                        />
                        )
                    }
                    <Marker
                        position={locationCenter}
                        icon={require("./resource/img/icons8-home-address-64.png")}
                        zIndex={this.state.restaurantLocation.length} //permet de placer le marker au dessus des autres
                    />
                    <DrawingManager

                        onMarkerComplete= {this.handleShow}
                        options = {
                            {
                                drawingMode:drawing,
                                drawingControl: false,
                                markerOptions: {
                                    visible: false
                                },
                            }
                        }
                    />

                </GoogleMap>


                <Modal show={showAdd} onHide={this.handleClose}  size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter un restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form>
                            <FormGroup>
                                <FormLabel>Nom du restaurant : </FormLabel>
                                <Form.Control as="input" type='text' name='name' paceholder="Nom du restaurant" onChange={this.handleChange} />
                                <FormLabel>Adresse du restaurant  : </FormLabel>
                                <Form.Control as="input" type='text' name='address' paceholder="Adresse du restaurant" onChange={this.handleChange} />
                            </FormGroup>
                            <Button variant="success" onClick={this.handleSend}>Ajouter</Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>


        )
    }


}

export default Maps