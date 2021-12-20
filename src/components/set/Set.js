import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Set extends React.Component {
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
                        <FontAwesomeIcon icon="clipboard-list" padding="2px" size="lg"/> {this.props.setText}
                        <span className="option__freq">{this.props.freq}</span>
                        {this.props.setUseTimer && <span className="option__time">{this.props.time}</span>}
                    </span>
                </div>

                <button className='button--link' onClick={(e)=> {
                this.props.handleEditSet(this.props.index,this.props.setText,this.props.freq,this.props.setUseTimer,this.props.time,this.props.sets,this.props.reps);
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
                thisprops.removeSingle(thisprops.setText);
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


