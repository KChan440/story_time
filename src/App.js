import React, { Component } from 'react';
import Question from './Question/Question';
import SubmitForm from './SubmitForm/SubmitForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('questions');

    this.state = {
      questions: [],
    }
  }

  componentWillMount(){
    const previousQuestions = this.state.questions;


    this.database.on('child_added', snap => {
      previousQuestions.push({
        id: snap.key,
        questionContent: snap.val().questionContent,
      })

      this.setState({
        questions: previousQuestions
      })
    })


  }

  addQuestion(question){
    this.database.push().set({questionContent:question});

    // const previousQuestions = this.state.questions;
    // previousQuestions.push({id: previousQuestions.length + 1, questionContent: question});
    // this.setState({
    //   questions: previousQuestions
    // });
  }

  render() {
    console.log(this.state.questions);
    console.log(this.state.questions[Math.floor(Math.random()*this.state.questions.length)])
    return (
        <div className="questionWrapper">

            <div className="questionBody">
              {
                this.state.questions.map((question) => {
                  return (
                    <Question questionContent={question.questionContent} 
                    questionId={question.id} 
                   key={question.id}/>
                  )
                })
              }

            </div>

            <div className="reactionBody">
              Like or Dislike
            </div>

            <div className="submitForm">
              <SubmitForm addQuestion={this.addQuestion}/>
            </div>
        </div>
    );
  }

}

export default App;
