import React from 'react'
import ReactDOM from 'react-dom'

import Maps from './map'
import Liste from "./liste";
import data from "./resource/restaurant.json";
import registerServiceWorker from './registerServiceWorker'

import './index.css'





ReactDOM.render(<Maps data={data} />, document.getElementById('map'))
ReactDOM.render(<Liste data={data} />, document.getElementById('list'))
registerServiceWorker()