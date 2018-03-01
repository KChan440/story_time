import React, { Component } from 'react';
import './Question.css';
import PropTypes from 'prop-types';

class Question extends Component{

    constructor(props){
        super(props);
        this.questionContent = props.questionContent;
        this.questionId = props.questionId;
    }

    render(props){
        return(
            <div className="question fade-in">
                <p className="questionContent">{ this.questionContent }</p>
            </div>
        )
    }
}

Question.propTypes = {
    questionContent: PropTypes.string
}

export default Question;
