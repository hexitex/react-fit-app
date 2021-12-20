// install->import->use
import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseSetup from './components/exercise/ExerciseSetup'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core'

// import the font awesome icons we need
import { faEdit, faTrash, faDumbbell, faClipboardList } from '@fortawesome/free-solid-svg-icons'
// add them to the FA library for access  
library.add(faEdit, faTrash, faDumbbell, faClipboardList)


ReactDOM.render(<ExerciseSetup/>, document.getElementById('app'))
