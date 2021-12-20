// install->import->use
import React from 'react';
import ReactDOM from 'react-dom';
import DyFitApp from './components/DyFitApp'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core'

// import the font awesome icons we need
import { faEdit, faTrash, faDumbbell, faList, faClipboardList } from '@fortawesome/free-solid-svg-icons'
// add them to the FA library for access  
library.add(faEdit, faTrash, faDumbbell, faClipboardList)

ReactDOM.render(<DyFitApp/>, document.getElementById('app'))
