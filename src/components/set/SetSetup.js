import React from 'react';
import Sets from './Sets';
import AddSet from './AddSet';
import OptionModal from '../OptionModal';

export default class SetSetup extends React.Component {

    state = {
            // used for local storage
            sets: [],

            //Modal Values
            modalOpen:false,
            modalLabel:'label',
            compToMount:undefined,
          
            //main set
            setText:undefined,
            useTimer:true,
            time:60,
            freq:3,
            setSets:3,
            setReps:5,
            isSetEdit:false,
            editSetIndex:undefined,
            updatedSet:false,
        };
        
        handleSetTextChange = (opt) => {this.setState({setText: opt})};
        handleUseTimerChange = (opt) => {this.setState({useTimer: opt})};
        handleFreqChange = (opt) => {this.setState({freq: opt})};
        handleTimeChange = (opt) => {this.setState({time: opt})};
        handleSetSetsChange = (opt) => {this.setState({setSets: opt})};
        handleSetRepsChange = (opt) => {this.setState({setReps: opt})};
       
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
        resetSetEditState=()=>{
            this.setState(()=>({
                isSetEdit:false,
                editSetIndex:undefined,
                updatedSet:false,
                setText:undefined,
                useTimer:true,
                time:60,
                freq:3,
                setSets:3,
                setReps:5
                }))
        }
        removeAllSets = () => {
            this.setState(() => ({
                sets: []
            }));
        }
      
        removeSingleSet = (opt) => {
            this.setState((prevState) => ({
                sets: prevState.sets.filter((set) => opt !== set[1])
            }));
        }
      
         handleEditSet=(index,setText,freq,useTimer,time,setSets,setReps)=>{
                       
                this.setState({
                editSetIndex:index,
                isSetEdit:true,
                setText:setText,
                useTimer:useTimer,
                time:time,
                freq:freq,
                setSets:setSets,
                setReps:setReps,
                modalHeader:'Change Set Instruction',
                modalAnimatedContent:false,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Change',
                modalCloseButtonText:'Cancel',
                modalHandleOkay:this.handleAddEditSet,
                modalHandleClose:this.handleModalClose,
                modalOpen:true,
                compToMount:'editSet'
                })
        };

        handleAddEditSet = () => {
          
            if (!this.state.setText) {
                return 'Enter Valid Item!'
            }
            
            if (!this.state.isSetEdit) {
                const checkArr = this.state.sets.filter((op) => op[1].toLowerCase() === this.state.set.trim().toLowerCase());

                if (checkArr.length > 0) {
                    return 'That Set already exists!'
                }
                const newSet=[[this.state.setText.trim(),this.state.freq,this.state.setUseTimer,this.state.time,this.state.setSets,this.state.setReps]];
                this.setState((prevState) => ({
                    sets: prevState.sets.concat(newSet)
                }));
            
            } else {
              
                const editSet=[this.state.setText.trim(),this.state.freq,this.state.setUseTimer,this.state.time,this.state.setSets,this.state.setReps];
                console.log('updating set..')
                this.setState((prevState)=>({
                    sets:prevState.sets.splice(this.state.editSetIndex, 1, editSet) && prevState.sets,
                    updatedSet:true
                })); 
            }
            this.handleModalClose();
            this.resetSetEditState();
           
        }
        
        scrollToMe(element){
            setTimeout(function(){
            element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            //console.log('scrooling',element)
        },300)
        }
       
        handleAddSet=()=>{
            resetSetEditState();
            this.setState({
               
                modalHeader:'Add New Set',
                modalAnimatedContent:false,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Add',
                modalCloseButtonText:'Cancel',
                compToMount:'editSet',
                modalHandleOkay:this.handleAddEditSet,
                modalHandleClose:this.handleModalClose,
                modalOpen:true
                })
        }


        componentDidMount(prevProps,prevState) {
            // main sets either form storage of defaults from default.props
            try {
                if (localStorage.getItem('sets') &&
                    JSON.parse(localStorage.getItem('sets')).length > 0) {
                    const sets = JSON.parse(localStorage.getItem('sets'));
                    this.setState(() => ({
                        sets: sets
                    }))
                } else {
                    this.setState(() => ({
                        sets: this.props.sets
                    }));
                    const json = JSON.stringify(this.state.sets)
                    localStorage.setItem('sets', json);
                }
            } catch (e) {
                console.log(e)
            }
        }

        componentDidUpdate(prevProps, prevState) {
                if (prevState.sets.length !== this.state.sets.length || this.state.updatedSet) {
                const json = JSON.stringify(this.state.sets)
                localStorage.setItem('sets', json);

                console.log('saved set data')
                
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
                        <Sets 
                        scrollToMe={this.scrollToMe}
                        sets={this.state.sets} 
                        removeAll={this.removeAllSets}
                        removeSingle={this.removeSingleSet}
                        scrollIntoView={this.scrollIntoView}
                        handleEditSet={this.handleEditSet}
                        />
                    <button className='form-add-button button' onClick={this.handleAddSet}>Add Set</button>
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
                    
                    ModalComponent={this.state.compToMount==='editSet' ? <AddSet 
                        handleAddEditSet={this.handleAddEditSet}
                        setText={this.state.setText}
                        setValue={this.state.setValue}
                        freq={this.state.freq}
                        isSetEdit={this.state.isSetEdit}
                        editSetIndex={this.state.editSetIndex}
                        handleSetChange={this.handleSetChange}
                        handleSetValueChange={this.handleSetValueChange}
                        handleFreqChange={this.handleFreqChange}
                      />:undefined}
                />
            </div>
        );
    }
}

SetSetup.defaultProps={  
    sets:[
        //option,freq of selection,use rest timer,time for rest,sets,reps
       ['3 X 5, Rest for 1 Mins',3,true,60,3,5],
       ['3 X 10, Rest for 2 Mins',3,true,120,3,10],
    ]
}