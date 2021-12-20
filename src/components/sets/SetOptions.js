import React from 'react';
import SetOption from './SetOption';

const SetOptions=(props)=>(
    <div>
        <div className='widget-header'>
            <h3>Sets</h3>
            <button 
            className='button--link' 
            onClick={(e)=>{
                document.getElementById('sufops').className='dele';
                setTimeout(function(){
                props.removeAllSets();
                document.getElementById('sufops').className='set-container';
                },500)}
            }
            >
            Remove All Sets
            </button>
        </div>
        <div id="sufops" className='set-container'>
        {!props.setOptions.length>0 && <div className='widget--message'><p className=''>Add some setes to spice it up</p></div>}
        {
            props.setOptions.map((option,index,setOptions)=>(
            <SetOption 
           
            scroll={function()
                {const myDiv=document.getElementById('sufops');
            myDiv.scrollTop = myDiv.scrollHeight;}
            }
            key={option[0]} 
            optionText={option[0]}
            count={index+1}
            removeSingleSet={props.removeSingleSet}
            />))
        }
        </div>
    </div>
);

export default SetOptions;