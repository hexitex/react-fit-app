import React from 'react';
import Muscle from './Muscle';
import BodyDiagram from './BodyDiagram';
import FlashMassage from 'react-flash-message'

export default class AddExercise extends React.Component{
    state={  
        error:undefined,
        thisMuscleGroups:[],
        muscleText:'',
        muscleIndex:undefined,
        muscleInfluence:50,
        updatedMuscleGroup:undefined,
        flashMessage:''
        
    };
   
    handleExerciseChange = (e) => {this.props.handleExerciseChange(e.target.value)};
    handleExerciseDescChange = (e) => {this.props.handleExerciseDescChange(e.target.value)};
    handleUseWeightChange = (e)=> {this.props.handleUseWeightChange(e.target.checked)};
    handleUseSetChange = (e) => {this.props.handleUseSetChange(e.target.checked)};

    //here we manage the muscle groups array for this state and pass back modded array to global state

    handleMuscleInfluenceChange = (index, text, value) => {
        this.setState({
                muscleIndex: index,
                muscleText: text,
                muscleInfluence: value
            },
            function () {
                const muscleArr = [this.state.muscleText, this.state.muscleInfluence];
                this.setState((prevState) => ({
                    thisMuscleGroups: prevState.thisMuscleGroups.splice(this.state.muscleIndex, 1, muscleArr) && prevState.thisMuscleGroups,
                    updatedMuscleGroup: true
                }), function () {
                  
                    this.props.handleMuscleChange(this.state.thisMuscleGroups)
                });
            })
    }

    handleMuscleAdd = (text) => {
        const muscleArr = [text, 50];
        this.setState((prevState) => ({
            thisMuscleGroups: prevState.thisMuscleGroups.splice(0,0,muscleArr) && prevState.thisMuscleGroups,
            flashMessage:'Added '+text,
        }), function () {
            this.props.handleMuscleChange(this.state.thisMuscleGroups)
        });
    }

    handleMuscleRemove=(opt) => {
        this.setState((prevState) => ({
            thisMuscleGroups: prevState.thisMuscleGroups.filter((mg) => opt !== mg[0]),
            flashMessage:'Removed '+opt,    
        }),function(){this.props.handleMuscleChange(this.state.thisMuscleGroups)}
        );
    }

    handleBodyClick = (e) => {
            e.preventDefault();
            const coll = document.getElementsByClassName(e.target.getAttribute("class"));
            const arr = Array.prototype.slice.call(coll, 0);
            console.log(e.target.style.fill)
            if (e.target.style.fill.indexOf('#RadialGradientPerm')<0) {
                this.handleMuscleAdd(e.target.getAttribute("class"));
                arr.forEach(function (el) {
                    el.style.fill = 'url("#RadialGradientPerm'+e.target.getAttribute("class")+'")';
                })
                
                
            } else {
                arr.forEach(function (el) {
                    el.style.fill = 'black'
                })
                this.handleMuscleRemove(e.target.getAttribute("class"));
            }
    }

    handleBodyMouseOver = (e) => {
        e.preventDefault();
        const coll = document.getElementsByClassName(e.target.getAttribute("class"));
        const arr = Array.prototype.slice.call(coll, 0);
     
        if (e.target.style.fill.indexOf('#Radial')<0 || !e.target.style.fill) {
            arr.forEach(function (el) {
                el.style.fill = 'url("#RadialGradient")';
            })
        }

    }

    handleBodyMouseOut = (e) => {
        e.preventDefault();
        const coll = document.getElementsByClassName(e.target.getAttribute("class"));
        const arr = Array.prototype.slice.call(coll, 0);
        if (e.target.style.fill.indexOf('#RadialGradientPerm')<0) {
            arr.forEach(function (el) {
                el.style.fill = 'black'
            })

        }
    }

    handleAddEditExercise = (e) => {
        e.preventDefault();
        const error = this.props.handleAddEditExercise();
        this.setState(() => ({
            error
        }));
        if (!error) {

        }
    }

    handleImg=(e)=>{    
      this.props.handleImg(e.target.files[0]);
    }

   componentWillMount(prevProps, prevState) {
       this.setState({
           thisMuscleGroups: this.props.muscleGroups
       }, function () {
           this.state.thisMuscleGroups.forEach(function (mg, index) {
               const coll = document.getElementsByClassName(mg[0]);
               const arr = Array.prototype.slice.call(coll, 0);
               arr.forEach(function (el, ind) {
                //   console.log("url('#RadialGradientPerm" + mg[0] + "')")
                   el.style.fill = "url('#RadialGradientPerm" + mg[0] + "')"
               })
           })
       })
   }
   
//    componentDidUpdate(prevProps,prevState)
//    {
//     if (prevState.thisMuscleGroups.length !== this.state.thisMuscleGroups.length || this.state.updatedMuscleGroup) {
        
//         console.log('would save muscle group')
        
//         // try{this.state._mainLastComponent.scrollIntoView(false);}catch(e){}
//         this.resetMuscleState();
//     }
//    }
    render(){ 
        return(
            
        <div>
        <FlashMassage duration={3000}>
        <strong>{this.state.flashMessage}</strong>
        </FlashMassage>
                {this.state.error && <p className='add-exercise-error'>{this.state.error}</p>}
            
            <form >
                <div className="form-container">
                  
                        <input 
                        className="add-option__input" 
                        placeholder="Exercise name" 
                        autoComplete="off" 
                        type="text" 
                        name="exercise" 
                      
                        value={this.props.exercise}
                        onChange={this.handleExerciseChange}
                        
                        />
                        <textarea 
                        className="add-option__text" 
                        placeholder="Description" 
                        autoComplete="off" 
                        name="exerciseDesc" 
                        rows={2}
                      
                        value={this.props.exerciseDesc}
                        onChange={this.handleExerciseDescChange}
                      
                        />
                    
                    <div className="outer ">
                        <div className="inner-left form-row">
                            <label 
                            className="att-each  form-label" id="uploadbutton" style={{backgroundImage:'url('+this.props.selectedFile+')'}} >
                                <input type="file" className="upload-button" onChange={this.handleImg}/>
                            Image
                            </label>
                        </div>
                        <div className="inner-right">
                            
                                <label className="small-height"> 
                                    <input  type="checkbox" name="weight" id="weight" checked={this.props.useWeight} onChange={this.handleUseWeightChange}/> Weights </label>
                           
                                <label className="small-height"> 
                                    <input type="checkbox" name="set" id="set" checked ={this.props.useSet} onChange={this.handleUseSetChange}/> Sets </label>
                         
                        </div>
                       
                    </div>
                   
                   
                        <BodyDiagram 
                        handleBodyClick={this.handleBodyClick} 
                        handleBodyMouseOut={this.handleBodyMouseOut}
                        handleBodyMouseOver={this.handleBodyMouseOver}
                        thisMuscleGroups={this.state.thisMuscleGroups}
                        />    
                </div>
                
                <div className="option__add-body-header">
                <div>Front</div><div>Back</div>
                </div>
                {
                    this.state.thisMuscleGroups.length>0 &&
                    <div>  
                    <span className="legend">Muscle Inpact</span>
                    <div className="fieldset">
                        
                        {this.state.thisMuscleGroups.map((muscle,index,muscles)=>(
                        <Muscle 
                        key={muscle[0]} 
                        muscleText={muscle[0]}
                        muscleInfluence={muscle[1]}
                        index={index}
                        handleMuscleInfluenceChange={this.handleMuscleInfluenceChange}
                        />
                       
                    ))}
                    </div>
                    </div>
                }
                <div className="modal__footer">
                <div className="modal__footer-section">
                    <button className='button' onClick={this.props.handleClose}>Close</button>
                </div>
                <div className="modal__footer-section">
                    <button className='button' onClick={this.handleAddEditExercise}>{this.props.isExerciseEdit ? 'Update': 'Add'}</button>
                </div>
                <div className="modal__footer-section">
                <button className='button' onClick={this.props.handleBack}>Back</button>
                </div>
            </div>  
            </form>
        </div>
        )
    }
}
