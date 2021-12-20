import React from 'react';
import Weight from './Weight';

const Weights=(props)=>(
   
    <div>
        <div className='widget-header'>
            <h3>Weight Instructions</h3>
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
        {!props.weights.length>0 && <div className='widget--message'><p>Add some weight options to change traing patterns</p></div>}
        
        {
            props.weights.map((weight,index,weights)=>(
            <Weight 
            scrollToMe={props.scrollToMe} 
            isLast={index===weights.length-1}
            key={weight[0]} 
            weightText={weight[0]}
            freq={weight[1]}
            weightValue={weight[2]}
            index={index}
            handleEditWeight={props.handleEditWeight}
            removeSingle={props.removeSingle}
            />
            ))
        }
        </div>
    </div>
);

export default Weights;