import React from 'react'
import ReactDOM from 'react-dom'

import Maps from './map'
import Liste from "./liste";
import registerServiceWorker from './registerServiceWorker'

import './index.css'





ReactDOM.render(<Maps />, document.getElementById('map'))
ReactDOM.render(<Liste/>, document.getElementById('list'))
registerServiceWorker()