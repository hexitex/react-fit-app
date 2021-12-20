import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Weight extends React.Component {
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
                <div className='option__text'>
                    <span>
                        <FontAwesomeIcon icon="dumbbell" padding="2px" size="lg"/> {this.props.weightText}
                        <span className="option__freq">{this.props.freq}</span>
                        <span className="option__value">{this.props.weightValue}</span>
                    </span>
                </div>

                <button className='button--link' onClick={(e)=> {
                this.props.handleEditWeight(this.props.index,this.props.weightText,this.props.freq,this.props.weightValue);
                //  e.target.scrollIntoView({ block: 'end',  behavior: 'smooth' });
                    }
                }
                >
                    <FontAwesomeIcon icon="edit" />
                </button>
                <button className='button--link' onClick={(e)=> {
                e.target.parentElement.className='option dele';
                {var thisprops=this.props;}
                setTimeout(function(){
                thisprops.removeSingle(thisprops.weightText);
                },300)
                }}
                >
                    <FontAwesomeIcon icon="trash" color="pink"/>
                </button>
        </div>
    </div>
    )
    }
}


