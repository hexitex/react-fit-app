import React from 'react';

export default class AddSet extends React.Component{
    state={  
        error:undefined
    };
    
    handleSetTextChange = (e) => {this.props.handleSetTextChange(e.target.value)};
    handleFreqChange = (e) => {this.props.handleFreqChange(e.target.value)};
    handleUseTimerChange = (e)=> {this.props.handleUseTimerChange(e.target.checked)};
    handleTimeChange = (e) => {this.props.handleTimeChange(e.target.value)};
    handleSetSetsChange = (e) => {this.props.handleSetSetChange(e.target.value)};
    handleSetRepsChange = (e) => {this.props.handleSetRepsChange(e.target.value)};

    handleAddEditSet=(e)=>{
        e.preventDefault();
        const error =this.props.handleAddEditSet();
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
                        placeholder="Set Instruction Text" 
                        autoComplete="off" 
                        type="text" 
                        name="set" 
                        value={this.props.setText}
                        onChange={this.handleSetTextChange}
                        />
                        <div className="form-row">
                            <label className="form-label">Frequency of Set being used</label> 
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
                            <label className="form-label">Value to Add/Remove from last Set</label> 
                            <input 
                            className="form-number" 
                            type="number" 
                            name="setValue" 
                            defaultValue={this.props.setValue} 
                            onChange={this.handleSetValueChange}
                            />
                        </div>
                        <span className="form-check-box">
                            <label> 
                                <input  type="checkbox" name="useTimer" id="usetimer" checked={this.props.useTimer} onChange={this.handleUseTimerChange}/> Use Rest Timer
                            </label>
                           
                        </span>
                        <label>
                        Rest Time in Seconds<input type="number" name="time" defaultValue={this.props.time} disabled={!this.props.useTimer && true}/>
                    </label>
                </div>
            </form>
        </div>
        )
    }
}