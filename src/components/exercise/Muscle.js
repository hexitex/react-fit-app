import React from 'react';

export default class Muscle extends React.Component {
        state = {
            error: undefined,
          
        };
        componentDidMount(prevProps, prevState) {
         
               if(this.props.isLast)
               {
                   try{
                       this.props.scrollToMe(this.lastOption);
                   }catch(e){}
               }
           }
        handleMuscleInfluenceChange=(e)=>{
          
            this.props.handleMuscleInfluenceChange(this.props.index,this.props.muscleText,e.target.value)
          
        }

    render()
    {
    return( 
    
  <div className="rang-wrapper">
  <input type='range' min='1' className="vertical-range" defaultValue={this.props.muscleInfluence} onChange={this.handleMuscleInfluenceChange} max='100' step='1' />
  <span className="sideways-on-top">{this.props.muscleText} - {this.props.muscleInfluence} %</span>
  </div>
    
        )
    }
}


