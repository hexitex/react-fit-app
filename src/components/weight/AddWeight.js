import React from 'react';

export default class AddWeight extends React.Component{
    state={  
        error:undefined
    };
    
    handleWeightChange = (e) => {
        this.props.handleWeightChange(e.target.value)
    };
    handleFreqChange = (e) => {
        this.props.handleFreqChange(e.target.value)
    };
    handleWeightValueChange = (e)=> {
        this.props.handleWeightValueChange(e.target.Value)
    };
    
    handleAddEditWeight=(e)=>{
        e.preventDefault();
        const error =this.props.handleAddEditWeight();
        this.setState(()=>({error}));
        if(!error)
        {
           
        }
    }
  
    render(){
        return(
            
        <div>
            {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
            <form >
                <div className="form-container">
                  
                        <input 
                        className="add-option__input" 
                        placeholder="Weight Instruction" 
                        autoComplete="off" 
                        type="text" 
                        name="weight" 
                        value={this.props.weight}
                        onChange={this.handleWeightChange}
                        />
                        <div className="form-row">
                            <label className="form-label">Frequency of Weight being used</label> 
                            <input className="form-range" 
                            type="range" 
                            name="freq" 
                            min="1" 
                            max="10" 
                            defaultValue={this.props.freq} 
                            onChange={this.handleFreqChange}
                            />
                        </div>
                        <div className="form-row">
                            <label className="form-label">Value to Add/Remove from last Weight</label> 
                            <input 
                            className="form-number" 
                            type="number" 
                            name="weightValue" 
                            defaultValue={this.props.weightValue} 
                            onChange={this.handleWeightValueChange}
                            />
                        </div>
                </div>
            </form>
        </div>
        )
    }
}