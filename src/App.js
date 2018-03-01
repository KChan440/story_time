import React, { Component } from 'react';
import fire from './fire';
import Question from './Question/Question';
import SubmitForm from './SubmitForm/SubmitForm';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);



    this.state = {
      questions: [
        { id: 1, questionContent: "When was the last time you tried something new?"},
        { id: 69, questionContent: "What gives your life meaning?"},
      ],
    }
  }

  render() {
    const randomQuestion = this.state.questions[Math.floor(Math.random()*this.state.questions.length)];
    return (
        <div className="questionWrapper">

            <div className="questionBody">
              {
                <Question questionContent={randomQuestion.questionContent}
                          questionId={randomQuestion.questionId}
                          key={randomQuestion.questionId}/>
              }
            </div>

            <div className="reactionBody">
              Like or Dislike
            </div>

            <div className="submitForm">
              <SubmitForm />
            </div>
        </div>
    );
  }

}

export default App;
