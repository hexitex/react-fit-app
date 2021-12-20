import React from 'react';
import Exercises from './Exercises';
import AddExercise from './AddExercise';
import OptionModal from '../OptionModal';
import {resizeImg,newImgEvent} from '../../resizebase64';

export default class ExerciseSetup extends React.Component {

    state = {
            // used for local storage
            exercises: [],
          
            
            //Modal Values
            modalHeader: undefined, // used for random selection
            modalMessage: undefined, // used for random selection
            modalImage:undefined,
            modalCancelButtonText:undefined,
            modalOkayButtonText:undefined,
            modalOpen:false,
            modalLabel:'label',
            modalAnimatedContent:false,
            modalComponent:undefined,
            modalCloseFunction:undefined,
            modalOkayFunction:undefined,
            //main exercise
            selectedFile: './img/img.png', // used for selecting an image for an exercise
            exercise:'',
            exerciseDesc:'',
            useWeight:true,
            useSet:true,
            muscleGroups:[],
            isExerciseEdit:false,
            editExerciseIndex:undefined,
            updatedExercise:false,
            compToMount:undefined
        };
        
        handleExerciseChange = (opt) => {this.setState({exercise: opt})};
        handleExerciseDescChange = (opt) => {this.setState({exerciseDesc: opt})};
        handleUseWeightChange = (opt) => {this.setState({useWeight: opt})};
        handleUseSetChange = (opt) => {this.setState({useSet: opt})};
        handleMuscleChange= (opt) => {this.setState({muscleGroups:opt})};
       
       
        // ok for random display
       
        handleModalClose=()=>{
            this.setState({
                modalOpen:false,
                modalMessage: undefined,
                modalDescription:undefined,
                modalImage:undefined,
                modalHeader:undefined,
                modalAnimatedContent:false,
                modalShowCloseButton:false,
                modalShowOkayButton:false,
                modalOkayButtonText:undefined,
                modalCancelButtonText:undefined,
                modalCloseFunction:undefined,
                modalOkayFunction:undefined,
              
                compToMount:undefined
            });
        }
        resetExerciseEditState=()=>{
            this.setState(()=>({
                isExerciseEdit:false,
                editExerciseIndex:undefined,
                updatedExercise:false,
                exercise:'',
                exerciseDesc:'',
                selectedFile:'./img/img.png',
                useWeight:true,
                useSet:true,
                muscleGroups:[]
                }))
        }
      
        removeSingleExercise = (opt) => {
            this.setState((prevState) => ({
                exercises: prevState.exercises.filter((exercise) => opt !== exercise[1])
            }));
        }
      
         handleEditExercise=(index,img,exerciseText,useWeight,useSet,exerciseDesc,muscleGroups)=>{
                       
                this.setState({
                editExerciseIndex:index,
                isExerciseEdit:true,
                exercise:exerciseText,
                exerciseDesc:exerciseDesc,
                selectedFile:img,
                useWeight:useWeight,
                useSet:useSet,
                muscleGroups:muscleGroups,
                modalHeader:'Update Exercise',
                modalAnimatedContent:true,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Update',
                modalCloseButtonText:'Cancel',
                modalCloseFunction:this.handleModalClose,
                modalOkayFunction:this.handleAddEditExercise,
                compToMount:'AddExercise',
                modalOpen:true
                })
        };

        handleAddEditExercise = () => {
          
            if (!this.state.exercise) {
                return 'Enter Valid Item!'
            }
            
            if (!this.state.isExerciseEdit) {
                const checkArr = this.state.exercises.filter((op) => op[1].toLowerCase() === this.state.exercise.trim().toLowerCase());

                if (checkArr.length > 0) {
                    return 'That Exercise already exists!'
                }
                const newExercise=[[this.state.selectedFile,this.state.exercise.trim(),this.state.useWeight,this.state.useSet,this.state.exerciseDesc,this.state.muscleGroups]];
                this.setState((prevState) => ({
                    exercises: prevState.exercises.concat(newExercise)
                }));
            
            } else {
              
                const editExercise=[this.state.selectedFile,this.state.exercise.trim(),this.state.useWeight,this.state.useSet,this.state.exerciseDesc,this.state.muscleGroups];
                console.log('updating..')
                this.setState((prevState)=>({
                    exercises:prevState.exercises.splice(this.state.editExerciseIndex, 1, editExercise) && prevState.exercises,
                    updatedExercise:true
                })); 
            }
            this.handleModalClose();
           
           
        }
        handleImg = (img) => {
      
            if (!img) {
                return 'Not a Valid Image'
            }

            const reader = new FileReader();
            var thisScope = this; //bodge - there must be a better way of doing this

            reader.addEventListener("load", function (e) {
                resizeImg(reader.result, undefined, 64);
            }, false);

            newImgEvent.on('imgready', function (newimg) {
                thisScope.setState((prevState) => ({
                    selectedFile: newimg
                }));
            });

            reader.readAsDataURL(img);
        }

        scrollToMe(element){
            setTimeout(function(){
            element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            //console.log('scrooling',element)
        },300)
        }
       
        handleAddExercise=()=>{
            this.setState({
                editExerciseIndex:undefined,
                isExerciseEdit:false,
                exercise:'',
                exerciseDesc:'',
                muscleGroups:[],
                selectedFile:'./img/img.png',
                useWeight:true,
                useSet:true,
                modalHeader:'Add New Exercise',
                modalAnimatedContent:false,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Add',
                modalCloseButtonText:'Cancel',
                modalCloseFunction:this.handleModalClose,
                modalOkayFunction:this.handleAddEditExercise,
                compToMount:'AddExercise',
                modalOpen:true
                })
        }


        componentDidMount(prevProps,prevState) {
            // main exercises either form storage of defaults from default.props
            try {
                if (localStorage.getItem('exercises') &&
                    JSON.parse(localStorage.getItem('exercises')).length > 0) {
                    const exercises = JSON.parse(localStorage.getItem('exercises'));
                    this.setState(() => ({
                        exercises: exercises
                        
                    }))
                } else {
                    this.setState(() => ({
                        exercises: this.props.exercises
                    }));
                    const json = JSON.stringify(this.state.exercises)
                    localStorage.setItem('exercises', json);
                }
            } catch (e) {
                console.log(e)
            }
        }
        // shouldComponentUpdate(nextProps, nextState) {
        //    // return false;
        //  }
        componentDidUpdate(prevProps, prevState) {
                if (prevState.exercises.length !== this.state.exercises.length || this.state.updatedExercise) {
                const json = JSON.stringify(this.state.exercises)
                localStorage.setItem('exercises', json);

                console.log('saved exercise data')
                
                try{this.state._mainLastComponent.scrollIntoView(false);}catch(e){}
                this.resetExerciseEditState();
            }
        }
        componentWillUnmount() {
            console.log('comp will unmount')
        }
        
       
    render(){
        
        return(
            <div>
                <div className='container'>
                    <div className='widget'>
                        <Exercises 
                        scrollToMe={this.scrollToMe}
                        exercises={this.state.exercises} 
                        removeAll={this.removeAllExercises}
                        removeSingle={this.removeSingleExercise}
                        scrollIntoView={this.scrollIntoView}
                        handleEditExercise={this.handleEditExercise}
                      
                        />
                    <button className='form-add-button button' onClick={this.handleAddExercise}>Add Exercise</button>
                    </div>
                </div>
               
                <OptionModal 
                    modalShowCloseButton={this.state.modalShowCloseButton} 
                    modalShowOkayButton={this.state.modalShowOkayButton} 
                    modalHeader={this.state.modalHeader}
                    modalAnimatedContent={this.state.modalAnimatedContent}
                    modalLabel={this.state.modalLabel}
                    modalMessage={this.state.modalMessage} 
                    modalDescription={this.state.modalDescription} 
                    modalImage={this.state.modalImage} 
                    handleOkay={this.state.modalOkayFunction}
                    handleClose={this.state.modalCloseFunction}
                    modalOpen={this.state.modalOpen}
                    modalCloseButtonText={this.state.modalCloseButtonText}
                    modalOkayButtonText={this.state.modalOkayButtonText}
                    
                    ModalComponent={<AddExercise 
                        handleAddEditExercise={this.handleAddEditExercise}
                        handleImg={this.handleImg}
                        exercise={this.state.exercise}
                        exerciseDesc={this.state.exerciseDesc}
                        useWeight={this.state.useWeight}
                        useSet={this.state.useSet}
                        selectedFile={this.state.selectedFile}
                        isExerciseEdit={this.state.isExerciseEdit}
                        muscleGroups={this.state.muscleGroups}
                        editExerciseIndex={this.state.editExerciseIndex}
                        handleExerciseChange={this.handleExerciseChange}
                        handleExerciseDescChange={this.handleExerciseDescChange}
                        handleUseWeightChange={this.handleUseWeightChange}
                        handleUseSetChange={this.handleUseSetChange}
                        handleMuscleChange={this.handleMuscleChange}
                        muscleGroups={this.state.muscleGroups}
                        />}
                />
            </div>
        );
    }
}

ExerciseSetup.defaultProps={
    exercises:[// image, exercise , can use weight, can use set,description, muscle groups inner array
        ['./img/bench.jpg','Bench press',true,true,'',[]],
        ['./img/squat.jpg','Squat',true,true,'',[]],
        ['./img/shoulderpress.jpg','Shoulder press',true,true,'',[]],
        ['./img/skipping.jpg','Skipping',false,true,'',[]],
        ['./img/deadlift.jpg','Deadlift',true,true,'',[]],
        ['./img/inclinebench.jpg','Incline bench',true,true,'',[]],
        ['./img/pressup.jpg','Press-ups',false,true,'',[]],
        ['./img/rest.jpg','Rest for a while',false,true,'',[]], 
        ['./img/pullup.jpg','Pull-ups',false,true,'',[]], 
        ['./img/chinup.jpg','Chin-ups',false,true,'',[]],
        ['./img/curls.jpg','Curls',true,true,'',[]],
        ['./img/dumbbellonearmrow.jpg','Dumbell one arm row',true,true,'',[]],
        ['./img/abroller.jpg','Use the Ab roller',false,true,'',[]],
        ['./img/widelatpulldown.jpg','Wide lat pulldown',true,true,'',[]],
        ['./img/rowing.jpg','Do some Rowing',true,true,'',[]],
        ['./img/triceprope.jpg','Tricep pope pulldown',true,true,'',[]],
        ['./img/romaniandeadlift.jpg','Romanain deadlift',true,true,'',[]],
        ['./img/situps.jpg','Do some Sit-ups',false,true,'',[]],
        ['./img/dips.jpg','Do some Dips',false,true,'',[]],
        ['./img/bike.jpg','Get going on that bike',false,true,'',[]]
     ]
}