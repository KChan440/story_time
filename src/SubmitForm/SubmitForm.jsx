import React, {Component} from 'react';
import './SubmitForm.css';

class SubmitForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newQuestionContent: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeQuestion = this.writeQuestion.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newQuestionContent: e.target.value,
        })
    }

    writeQuestion(){
        if(this.state.newQuestionContent && this.state.newQuestionContent.trim()){
            //call method that sets questionContent for question to
            //value of input
            this.props.addQuestion(this.state.newQuestionContent);
            //set back to empty string after add.
            this.setState({
                newQuestionContent: '',
            })
        }
    }
    render(){
        return(
            <div className="submitWrapper">
                <input className="questionInput"
                placeholder="Have a good question?"
                value={this.state.newQuestionContent}
                onChange={this.handleUserInput} />
                <button className="submitButton"
                onClick={this.writeQuestion}>Add</button>
                
            </div>
        )
    }
}

export default SubmitForm;
