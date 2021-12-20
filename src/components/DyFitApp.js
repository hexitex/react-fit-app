import React from 'react';

import ExerciseSetup from './exercise/ExerciseSetup';
import SetSetup from './set/SetSetup';
import WeightSetup from './weight/WeightSetup';
import Action from './Action';
import Settings from './Settings';
import Header from './Header';
import OptionModal from './OptionModal';
import FlashMassage from 'react-flash-message'


export default class DyFitApp extends React.Component {

    state = {
            // used for local storage
            exercises: [],
            weights: [],
            sets: [],
            //Modal Values
            modalHeader: undefined, // used for random selection
            modalMessage: undefined, // used for random selection
            modalImage:undefined,
            modalCancelButtonText:undefined,
            modalOkayButtonText:undefined,
            modalOpen:false,
            modalLabel:'label',
            modalAnimatedContent:true,
            modalComponent:undefined,
            modalCloseFunction:undefined,
            modalOkayFunction:undefined,
            display:'settings'

        };
        showExercises=()=>{
            this.setState({display:'settings/exercise'})
        }
        showWeights=()=>{
            this.setState({display:'settings/weight'})
        }
        showSets=()=>{
            this.setState({display:'settings/set'})
        }



        // ok for random display
       
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
            });
        }
       
        handlePick = () => { // select random element in array unless don't repeat is on, don't repeat is stored in expiring cookie in case of refresh
            const rndOpt = this.state.exercises[Math.floor(Math.random() * this.state.exercises.length)];
            let rndPre = undefined;
            let rndSuf = undefined;
            let weight = '';
            let set = '';

            // should use weight and set

            if (rndOpt[2]) //weight
            {
                if (this.state.weightOptions.length > 0) {

                    rndPre = this.state.weightOptions[Math.floor(Math.random() * this.state.weightOptions.length)];

                    //freq of weight being used
                    if (Math.floor(Math.random() * 10) <= rndPre[1]) {
                        weight = rndPre[0]+' ';
                    }
                }
            }
            if (rndOpt[3]) //set
            {
                if (this.state.setOptions.length > 0) {
                    rndSuf = this.state.setOptions[Math.floor(Math.random() * this.state.setOptions.length)];
                    if (Math.floor(Math.random() * 10) <= rndSuf[1]) {
                        set = ' '+rndSuf[0];
                    }
                }
            }
          //  console.log(rndOpt[0])
            this.setState(() => ({
                modalHeader:'Computer Says',
                modalMessage: weight + ' ' + rndOpt[1] + ' ' + set,
                modalDescription:rndOpt[4],
                modalImage: rndOpt[0],
                modalAnimatedContent:true,
                modalShowCloseButton:true,
                modalShowOkayButton:true,
                modalOkayButtonText:'Accept',
                modalCloseButtonText:'Decline',
                modalCloseFunction:this.handleModalClose,
                modalOkayFunction:this.handleModalClose,
                modalOpen:true,
            }));
        }
        scrollToMe(element){
            setTimeout(function(){
            element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
            //console.log('scrooling',element)
        },300)
        }
       
        componentDidMount(prevProps,prevState) {
            // main exercises either form storage of defaults from default.props
           
        }
        componentDidUpdate(prevProps, prevState) {
          
        }

        componentWillUnmount() {
            console.log('comp will unmount')
        }
       
    render(){
        const title="DyFit";
        const subtitle="Put your fitness and wellbeing in the hands of a computer";
        
        return(
            <div>
            <FlashMassage duration={3000}>
                <strong>{this.state.flashMessage}</strong>
            </FlashMassage>
            {this.state.display.indexOf('.')>-1 && <Header subtitle={subtitle} title={title}/>}
                <div className='container'>
                {this.state.display==='.action' &&     
                <Action 
                hasExercises={this.state.exercises.length>0}
                handlePick={this.handlePick}/>}
            
                {this.state.display==='settings' && 
                <Settings
                showExercises={this.showExercises}
                showWeights={this.showWeights}
                showSets={this.showSets}/>}
               
                {this.state.display==='settings/exercise' && <ExerciseSetup/>}
                {this.state.display==='settings/weight' && <WeightSetup/>}
                {this.state.display==='settings/set' && <SetSetup/>}
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
                handleOkay={this.state.modalOkayFunction}
                handleClose={this.state.modalCloseFunction}
                modalOpen={this.state.modalOpen}
                modalCloseButtonText={this.state.modalCloseButtonText}
                modalOkayButtonText={this.state.modalOkayButtonText}
                />
            </div>
        );
    }
}