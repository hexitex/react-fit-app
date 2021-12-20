import React from 'react';
import Exercise from './Exercise';

const Exercises=(props)=>(
   
    <div>
        <div className='widget-header'>
            <h3>Activities/Exercises</h3>
        </div>
        <div className='widget-container'>
        {!props.exercises.length>0 && <div className='widget--message'><p className=''>Add exercises to get started</p></div>}
        
        {
            props.exercises.map((exercise,index,exercises)=>(
            <Exercise 
            scrollToMe={props.scrollToMe} 
            isLast={index===exercises.length-1}
            key={exercise[1]} 
            img={exercise[0]}
            exerciseText={exercise[1]}
            useWeight={exercise[2]}
            useSet={exercise[3]}
            exerciseDesc={exercise[4]}
            muscleGroups={exercise[5]}
            index={index}
            handleEditExercise={props.handleEditExercise}
            removeSingle={props.removeSingle}
            handleMuscleChange={props.handleMuscleChange}
            
            />
            ))
        }
      
        </div>
    </div>
);

export default Exercises;