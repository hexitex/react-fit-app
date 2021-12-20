import React from 'react';
import Weights from './Weights';
import AddWeight from './AddWeight';
import OptionModal from '../OptionModal';

export default class WeightSetup extends React.Component {

    state = {
            // used for local storage
            weights: [],


            //Modal Values
            modalOpen:false,
            modalLabel:'label',
            compToMount:undefined,
          
            //main weight
            weightText:undefined,
            weightValue:2.5,
            freq:3,
            isWeightEdit:false,
            editWeightIndex:undefined,
            updatedWeight:false,
        };
        
        handleWeightChange = (opt) => {this.setState({weightText: opt})};
        handleWeightValueChange = (opt) => {this.setState({weightValue: opt})};
        handleFreqChange = (opt) => {this.setState({freq: opt})};
       
        handleModalClose=()=>{
            this.setState({
                modalOpen:false,
                modalMessage: undefined,
                modalDescription:undefined,
                modalImage:undefined,
                modalHeader:undefined,
                modalAnimatedContent:false,
                modalShowCloseButton:false,
                modalShowOkayButton:false,
                modalOkayButtonText:undefined,
                modalCancelButtonText:undefined,
                modalCloseFunction:undefined,
                modalOkayFunction:undefined,
                compToMount:undefined,
            });
        }
        resetWeightEditState=()=>{
            this.setState(()=>({
                isWeightEdit:false,
                editWeightIndex:undefined,
                updatedWeight:false,
                weightText:undefined,
                weightValue:2.5,
                freq:3
                }))
        }
        removeAllWeights = () => {
            this.setState(() => ({
                weights: []
            }));
        }
      
        removeSingleWeight = (opt) => {
            this.setState((prevState) => ({
                weights: prevState.weights.filter((weight) => opt !== weight[1])
            }));
        }
      
         handleEditWeight=(index,weightText,freq,weightValue)=>{
                       
                this.setState({
                editWeightIndex:index,
                isWeightEdit:true,
                weightText:weightText,
                weightValue:weightValue,
                freq:freq,
                modalHeader:'Change Weight Instruction',
                modalAnimatedContent:false,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Change',
                modalCloseButtonText:'Cancel',
                modalHandleOkay:this.handleAddEditWeight,
                modalHandleClose:this.handleModalClose,
                modalOpen:true,
                compToMount:'editWeight'
                })
        };

        handleAddEditWeight = () => {
          
            if (!this.state.weight) {
                return 'Enter Valid Item!'
            }
            
            if (!this.state.isWeightEdit) {
                const checkArr = this.state.weights.filter((op) => op[1].toLowerCase() === this.state.weight.trim().toLowerCase());

                if (checkArr.length > 0) {
                    return 'That Instruction already exists!'
                }
                const newWeight=[[this.state.weightText.trim(),this.state.freq,this.state.weightValue]];
                this.setState((prevState) => ({
                    weights: prevState.weights.concat(newWeight)
                }));
            
            } else {
              
                const editWeight=[this.state.weightText.trim(),this.state.freq,this.state.weightValue];
                console.log('updating..')
                this.setState((prevState)=>({
                    weights:prevState.weights.splice(this.state.editWeightIndex, 1, editWeight) && prevState.weights,
                    updatedWeight:true
                })); 
            }
            this.handleModalClose();
            this.resetWeightEditState();
           
        }
        
        scrollToMe(element){
            setTimeout(function(){
            element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            //console.log('scrooling',element)
        },300)
        }
       
        handleAddWeight=()=>{
            this.setState({
                editWeightIndex:undefined,
                isWeightEdit:false,
                weightText:undefined,
                weightValue:2.5,
                freq:3,
                modalHeader:'Add New Weight',
                modalAnimatedContent:false,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Add',
                modalCloseButtonText:'Cancel',
                compToMount:'editWeight',
                modalHandleOkay:this.handleAddEditWeight,
                modalHandleClose:this.handleModalClose,
                modalOpen:true
                })
        }


        componentDidMount(prevProps,prevState) {
            // main weights either form storage of defaults from default.props
            try {
                if (localStorage.getItem('weights') &&
                    JSON.parse(localStorage.getItem('weights')).length > 0) {
                    const weights = JSON.parse(localStorage.getItem('weights'));
                    this.setState(() => ({
                        weights: weights
                    }))
                } else {
                    this.setState(() => ({
                        weights: this.props.weights
                    }));
                    const json = JSON.stringify(this.state.weights)
                    localStorage.setItem('weights', json);
                }
            } catch (e) {
                console.log(e)
            }
        }

        componentDidUpdate(prevProps, prevState) {
                if (prevState.weights.length !== this.state.weights.length || this.state.updatedWeight) {
                const json = JSON.stringify(this.state.weights)
                localStorage.setItem('weights', json);

                console.log('saved weight data')
                
                try{
                this.state._mainLastComponent.scrollIntoView(false);}catch(e){}
            }
        }
        componentWillUnmount() {
            console.log('comp will unmount')
        }
        
       
    render(){
        
        return(
            <div>
                <div className='container'>
                    <div className='widget'>
                        <Weights 
                        scrollToMe={this.scrollToMe}
                        weights={this.state.weights} 
                        removeAll={this.removeAllWeights}
                        removeSingle={this.removeSingleWeight}
                        scrollIntoView={this.scrollIntoView}
                        handleEditWeight={this.handleEditWeight}
                        />
                    <button className='form-add-button button' onClick={this.handleAddWeight}>Add Weight</button>
                    </div>
                </div>
               
                <OptionModal 
                    modalShowCloseButton={this.state.modalShowCloseButton} 
                    modalShowOkayButton={this.state.modalShowOkayButton} 
                    modalHeader={this.state.modalHeader}
                    modalAnimatedContent={this.state.modalAnimatedContent}
                    modalLabel={this.state.modalLabel}
                    modalMessage={this.state.modalMessage} 
                    modalDescription={this.state.modalDescription} 
                    modalImage={this.state.modalImage} 
                    handleOkay={this.state.modalHandleOkay}
                    handleClose={this.state.modalHandleClose}
                    modalOpen={this.state.modalOpen}
                    modalCloseButtonText={this.state.modalCloseButtonText}
                    modalOkayButtonText={this.state.modalOkayButtonText}
                    
                    ModalComponent={this.state.compToMount==='editWeight' ? <AddWeight 
                        handleAddEditWeight={this.handleAddEditWeight}
                        weightText={this.state.weightText}
                        weightValue={this.state.weightValue}
                        freq={this.state.freq}
                        isWeightEdit={this.state.isWeightEdit}
                        editWeightIndex={this.state.editWeightIndex}
                        handleWeightChange={this.handleWeightChange}
                        handleWeightValueChange={this.handleWeightValueChange}
                        handleFreqChange={this.handleFreqChange}
                      />:undefined}
                />
            </div>
        );
    }
}

WeightSetup.defaultProps={  
    weights:[
    //option, freq of selection,weight addition,
    ['Go with more weight for',5,5],
    ['Go with less weight for',5,-2.5]
 ],
}