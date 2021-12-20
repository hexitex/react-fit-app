import React from 'react';
const Action =(props)=>(
        <div>
        <button className='button button--big'
        onClick={props.handlePick}
        disabled={!props.hasExercises}
        > 
        What Should I Do?
        </button>
        </div>
);

export default Action;