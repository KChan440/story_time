import React, {Component} from 'react';
import Modal from 'react-modal';
import {CSSTransition} from 'react-transition-group';
import './SubmitForm.css';

class SubmitForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newQuestionContent: '',
            isOpen: false,
            status: "open",
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeQuestion = this.writeQuestion.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newQuestionContent: e.target.value,
            status: "open",
        })
    }

    writeQuestion(){
        //check for null & empty string
        if(this.state.newQuestionContent && this.state.newQuestionContent.trim()){
            //call method that sets questionContent for question to
            //value of input
            this.props.addQuestion(this.state.newQuestionContent);
            //set back to empty string after add.
            this.setState({
                status: "success",
                newQuestionContent: '',
            })
            
        }else{
            this.setState({ status: "error" });
        }
    }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }
    
    handleOpen(){
        this.setState( {isOpen : true});
    }
    handleClose(){
        this.setState({
            newQuestionContent: '',
            status: "open",
            isOpen:false,
        });
    }
    
    render(){
        var {newQuestionContent, isOpen, status} = this.state;
        var succ = status==="success" ? true : false ;
        return( <div>
            <a onClick={this.handleOpen}>Submit Your Own</a>
            
            <Modal isOpen={isOpen} onRequestClose={this.handleClose} className="submitModal" overlayClassName="submitModalOverlay">
                
                <span id="close" onClick={this.handleClose}><i className="fas fa-times"></i></span>

                {(status === "open" || status === "error") && 
                    <textarea className="questionInput"
                    value={newQuestionContent}
                    placeholder="Submit your own question here..."
                    onChange={this.handleUserInput}/>}
                
                {(status === "open") && (<button className="submitCaption"
            onClick={this.writeQuestion}>Submit</button>)}
                
                {(status === "error") && <span className="submitCaption">There was an error submitting your question <span style={{whitespace:"nowrap"}}>:(</span></span>}
            
                <CSSTransition in={succ} timeout={150} classNames="checkmark" onEnter={()=>console.log("aaa")} exit={false} mountOnEnter unmountOnExit><span className="checkmark">
                        <span><i className="fas fa-check-circle"></i></span>
                        <p>Submission Succesfull!</p>
                        <button className="submitCaption" onClick={()=> this.setState({status: "open" })}>submit another one</button>
                    </span></CSSTransition>
                
                {/*(status === "success") && <div>
                    
                    <p>Submission Succesfull!</p>
                    <button className="submitCaption" onClick={()=> this.setState({status: "open" })}>submit another one</button>
                    </div>*/}
                
                    
                    
                </Modal>
            </div>
        );
    }
}

export default SubmitForm;
