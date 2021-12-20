import React from 'react'
const SetOption=(props)=>(
    
    <div className='option'>
    
    <p id={props.divID} className='option__text'>{props.optionText}</p>
    <p style={{display:'none'}}>{
        setTimeout(function(){
        props.scroll()},300)
    }</p>
    <button className='button--link' onClick={(e)=> {
        e.target.parentElement.className='option dele';
       setTimeout(function(){
        props.removeSingleSet(props.optionText);
       },600)
        
    }}
    >
    X</button>
    </div>
);
export default SetOption;