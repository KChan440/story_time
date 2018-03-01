import React, {Component} from 'react';
import './SubmitForm.css';

class SubmitForm extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className="submitWrapper">
                <input className="questionInput"
                placeholder="Have a good question?"/>
                <button className="submitButton">Add</button>
            </div>
        )
    }
}

export default SubmitForm;
