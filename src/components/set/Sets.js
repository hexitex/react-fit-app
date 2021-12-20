import React from 'react';
import Set from './Set';

const Sets=(props)=>(
   
    <div>
        <div className='widget-header'>
            <h3>Sets,Reps and Rest</h3>
            <button 
            className='button--link' 
            onClick={(e)=>{
                e.target.parent().className='dele';
                setTimeout(function(){
                props.removeAll();
                e.target.parent().className='widget-container';
                },500)}
            }
            >
            Remove All
            </button>
        </div>
        <div className='widget-container'>
        {!props.sets.length>0 && <div className='widget--message'><p>Add some set options to change training patterns</p></div>}
        
        {
            props.sets.map((set,index,sets)=>(
            <Set 
            scrollToMe={props.scrollToMe} 
            isLast={index===sets.length-1}
            key={set[0]} 
            setText={set[0]}
            freq={set[1]}
            setUseTime={set[2]}
            setTime={set[3]}
            setSets={set[4]}
            setReps={set[5]}
            index={index}
            handleEditSet={props.handleEditSet}
            removeSingle={props.removeSingle}
            />
            ))
        }
        </div>
    </div>
);

export default Sets;