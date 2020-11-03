import React, {Component} from "react";
import { LoadScript } from '@react-google-maps/api';
import Maps from './map'
import Liste from './liste'
//import dataJSON from './resource/restaurant.json'    //Importer fichier JSON dans la variables dataJSON et remplacer les valeurs ligne 87 et 88


class App extends Component{
    constructor(props) {
        super(props);
        this.state ={
            userLocation : {lat: 48.8534, lng: 2.3488},
            restaurantLocation : [],
            lib : ['drawing'],
            data: [],
            dataTrier: [],
            newR: {}
        }

        this.addRestaurant = this.addRestaurant.bind(this)
        this.setLocation = this.setLocation.bind(this)
        this.setData = this.setData.bind(this)
        this.setDataTrier = this.setDataTrier.bind(this)
        this.moveLocation = this.moveLocation.bind(this)
        this.setRestaurantLocation = this.setRestaurantLocation.bind(this)


    }

    componentDidMount() {
        this.setLocation();

    }

    setDataTrier(tabR){
        this.setState({
            dataTrier:tabR,
        }, () => this.setRestaurantLocation())
    }


    setRestaurantLocation(){
        let tabR = [];
        this.state.dataTrier.forEach(x => tabR.push({lat:x.lat,lng:x.long}) )
        this.setState({restaurantLocation : tabR})
    }


   setData(){
       let tab2 =[]
       let url2 = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&rankby=distance&type=restaurant&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY";
       fetch(url2)
       .then((response) => {
           return response.json()
       })
       .then((data) => {
           let tab1 =  data.results
           tab1.forEach(x =>
               tab2.push({
                   place_id : x.place_id,
                   restaurantName: x.name,
                   address: x.vicinity,
                   lat: x.geometry.location.lat,
                   long: x.geometry.location.lng,
                   ratings:[],
                   average: x.rating,
               })
           );

           tab2.forEach( (e,index) => {
               let url3 = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+e.place_id+"&key=AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY";
               fetch(url3)
               .then((response) =>{
                   return response.json()
               })
               .then( (data)=>{
                   let tab3 = [];
                   if (data.result.reviews !== undefined){
                       data.result.reviews.map(x =>
                           tab3.push({
                               stars: x.rating,
                               comment: x.text,
                           })
                       );
                       e.ratings = tab3;
                       this.setState({
                           data : tab2,                    //Pour utiliser le fichier json remplacer tab2 par dataJSON
                           dataTrier : tab2                 //Pour utiliser le fichier json remplacer tab2 par dataJSON
                       }, () => this.setRestaurantLocation())
                   }
               })
               .catch(function (error){
                    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message, url3);
               });

           })
       })
       .catch(function (error){
           console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
       });
    }



    setLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState( {userLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                },() =>  this.setData());

            },() =>{
                alert("La géolocalisation n'est pas activé sur votre navigateur internet")
                this.setState( {userLocation: {
                        lat: 48.8534,
                        lng: 2.3488
                    }
                },() =>  this.setData());
            })
        }
    }

    addRestaurant(newR){
        let tabR = this.state.dataTrier
        tabR.push(newR)
        this.setState({
            dataTrier : tabR
        },() => this.setDataTrier(tabR))
    }

    moveLocation(location){
        this.setState( {
            userLocation: location
        },() =>  this.setData());
    }

    render() {
        const {data, restaurantLocation, userLocation, lib} = this.state
        return(

                <LoadScript
                    googleMapsApiKey="AIzaSyAj-TZ0NWkI3FuhyEV_EEEBeHxbPzE9WkY"
                    libraries={lib}
                >
                    <div id="list">
                        <Liste restaurant={data} tridata={this.setDataTrier} />
                    </div>

                    <div id="map"><Maps move={this.moveLocation} restaurantLocation={restaurantLocation} location={userLocation} addRestaurant={this.addRestaurant} /></div>


                </LoadScript>

        )
    }
}


export default App
