import React from 'react';
import Modal from 'react-modal';
// for dialog use:
// modalMessage as main message
// modalHeader as Top bar Title
// modalOkayButtonText
// modalCloseButtonText
// modalOpen to close it
Modal.defaultStyles.overlay.backgroundColor = '#000'; 


const OptionModal =(props)=>(
   
    <Modal
        isOpen={props.modalOpen} 
        onRequestClose={props.handleClose}
        contentLabel={props.modalLabel}
        closeTimeoutMS={300} 
        className='modal'
        >
        <div className="modal__header">
            
            {props.modalHeader}
           
        </div>
        {props.modalMessage && props.modalAnimatedContent &&
       
         <div className="modal__body modal__body-animated">
            {
            props.modalMessage && <p className='modal__body'> {props.modalImage && <img src={props.modalImage}></img>}
            <br/> 
            {props.modalMessage}
            </p>
            }
        </div>
        }
        {props.modalMessage && !props.modalAnimatedContent &&
       
            <div className="modal__body">
               {
               props.modalMessage && <p > {props.modalImage && <img src={props.modalImage}></img>}
               <br/> 
               {props.modalMessage}
               </p>
               }
           </div>
           }
           <div> {props.ModalComponent && props.ModalComponent}</div>
       
        <div className="modal__footer">
            <div className="modal__footer-section">
                {props.modalShowCloseButton && <button className='button' onClick={props.handleClose}>{props.modalCloseButtonText}</button>}
            </div>
            <div className="modal__footer-section">
            {props.modalShowOkayButton && <button className='button' onClick={props.handleOkay}>{props.modalOkayButtonText}</button>}
            </div>
        </div>
    </Modal>
)

export default OptionModal;