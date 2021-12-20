import React from 'react';

export default class AddSetOption extends React.Component{
    state={  
        error:undefined
    };
    
    handleAddSet=(e)=>{
        
        e.preventDefault();
        const error =this.props.handleAddSet([[e.target.elements.setOption.value.trim(),parseInt(e.target.elements.sFreq.value)]])
        this.setState(()=>({error}));
        if(!error)
        {
        e.target.elements.setOption.value='';
        e.target.elements.sFreq.value=3;
        }
    }
    render(){
        return(
            <div>
            {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
            
            <form onSubmit={this.handleAddSet}>
            <div className="form-container">
                <input className="add-option__input" placeholder="Add a prefix to spice it up" autoComplete="off" type="text" name="setOption" />
                <div className="form-row">
                    <label className="form-label">Frequency of Set being used</label> 
                    
                    <input className="form-range" type="range" id="sFreq" name="sFreq" min="1" max="10" defaultValue="3" />
                    <button className='form-add-button button'>Add Set</button>
                </div>
            
            </div>
            </form>
            </div>
        )
    }
}