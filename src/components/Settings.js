import React from 'react';
const Settings =(props)=>(
        <div className="container">
                <div>
                        <button className='button button--big'
                        onClick={props.showExercises}
                        > 
                        Setup Exercises
                        </button>
                </div>
                <div>
                        <button className='button button--big'
                        onClick={props.showWeights}
                        > 
                        Setup Weights
                        </button>
                </div>
                <div>
                        <button className='button button--big'
                        onClick={props.showSets}
                        > 
                        Setup Sets
                        </button>
                </div>
        </div>
);

export default Settings;