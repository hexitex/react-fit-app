import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Exersise extends React.Component {
        state = {
            error: undefined
        };
        componentDidMount(prevProps, prevState) {
         
               if(this.props.isLast)
               {
                   try{
                       this.props.scrollToMe(this.lastOption);
                   }catch(e){}
               }
           }

    render()
    {
    return( 
        <div>
    <div className='option' ref={el => {if (this.props.isLast) {this.lastOption=el} }}>
        <div className="option__icon-overlay-wrapper">
            <img className='option__img' src={this.props.img}/>
            <span className="option__icon-overlay">
                {this.props.useWeight &&  <FontAwesomeIcon icon="dumbbell" className="option__icon" size="xs"/> }
                {this.props.useSet && <FontAwesomeIcon icon="clipboard-list" className="option__icon" size="xs"/>}
            </span> 
        </div>
        <div  className='option__text'>
        <span> {this.props.exerciseText}</span>
        {this.props.exerciseDesc && <p className="option__desc">{this.props.exerciseDesc.substring(0,40)}..</p>}
    </div>
    
   
       
   
    <button className='button--link' onClick={(e)=> {
       this.props.handleEditExercise(this.props.index,this.props.img,this.props.exerciseText,this.props.useWeight,this.props.useSet,this.props.exerciseDes,this.props.muscleGroups);
       e.target.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    
       }
    }
    >
    <FontAwesomeIcon icon="edit" /></button>
    <button className='button--link' onClick={(e)=> {
        e.target.parentElement.className='option dele';
        {var thisprops=this.props;}
        setTimeout(function(){
        thisprops.removeSingle(thisprops.exerciseText);
        },300)
        
    }}
    >
    <FontAwesomeIcon icon="trash" color="pink"/></button>
    </div>
    
    </div>
    )
    }
}


