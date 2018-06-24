import React, {Component} from 'react';
import Modal from 'react-modal';
import './SubmitForm.css';

const modalCSS = {
    content : {
        height: '50vh',
    }
}

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
        console.log(this.state.newQuestionContent);
        if(this.state.newQuestionContent && this.state.newQuestionContent.trim()){
            //call method that sets questionContent for question to
            //value of input
//            this.props.addQuestion(this.state.newQuestionContent);
            //set back to empty string after add.
            this.setState({
                status: "success",
                newQuestionContent: '',
            })
            
        }else{
            this.setState({ status: "error" });
        }
    }
    
    handleOpen(){
        this.setState( {isOpen : true});
    }
    handleClose(){
        this.setState({
            newQuestionContent: null,
            status: "open",
            isOpen:false,
        });
    }
    
    render(){
        var {newQuestionContent, isOpen, status} = this.state;
        return( <div>
            <a onClick={this.handleOpen}>Have a good submit</a>
            
            <Modal isOpen={isOpen} onRequestClose={this.handleClose} className="submitModal" overlayClassName="submitModalOverlay">
                
                <span id="close" onClick={this.handleClose}><i className="fas fa-times"></i></span>

            {(status === "open" || status === "error") && (<div>
                <textarea className="questionInput"
                value={newQuestionContent}
                placeholder="Submit your own question here..."
                onChange={this.handleUserInput}/>
                
                {(status === "open") && (<button className="submitButton"
            onClick={this.writeQuestion}>Submit</button>)}
                    {(status === "error") && <p>There was an error submitting your question :(</p>}
                </div>)}
            
            {(status === "success") && (<div>
                <p>Submission Succesfull!</p><a>submit another one</a>
                </div>)}
                    
                    
                </Modal>
            </div>
        );
    }
}

export default SubmitForm;
