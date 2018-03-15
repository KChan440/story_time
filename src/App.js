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
    this.likeQuestion = this.likeQuestion.bind(this);
    this.dislikeQuestion = this.dislikeQuestion.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('questions');

    this.state = {
      questions: [],
      currentQuestion: {}
    }
  }

  componentWillMount(){
    const colors = ["red", "green", "blue", "purple", "yellow", "brown"];
    const randomIndex = Math.floor(Math.random() * colors.length);

    document.body.style.backgroundColor = colors[randomIndex];;

    const previousQuestions = this.state.questions;
    this.database.on('child_added', snap => {
        previousQuestions.push({
          id: snap.key,
          questionContent: snap.val().questionContent,
        })

        this.setState({
          questions: previousQuestions,
          currentQuestion: this.getRandomQuestion(previousQuestions)
       })
        console.log(this.state.questions);
      })
  }

  getRandomQuestion(previousQuestions){
    var randomIndex = Math.floor(Math.random() * previousQuestions.length);
    var question = previousQuestions[randomIndex];
    if (question === this.state.currentQuestion){
      this.getRandomQuestion(previousQuestions)
    }

    return(question)
  }

  addQuestion(question){
    this.database.push().set({questionContent:question,
      likes: 0,
      dislikes: 0 
    });
  }

  likeQuestion(question){
    const tempID = this.state.currentQuestion.id; 
    const questionRef = firebase.database().ref("questions/" + tempID + "/likes");
    console.log(questionRef);
    questionRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    this.componentWillMount();
  }

  dislikeQuestion(question){
    const tempID = this.state.currentQuestion.id;
    const questionRef = firebase.database().ref("questions/" + tempID + "/dislikes");
    questionRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    this.componentWillMount();
  }



  render() {

    return (
      <div className="questionWrapper">
      <div className="questionBody">
      {
        <Question questionContent={this.state.currentQuestion.questionContent} 
        questionId={this.state.currentQuestion.id} 
        key={this.state.currentQuestion.id}/>
      }
      <div className="like-or-dislike">
      <button className="thumb-up" onClick={this.likeQuestion}><i className="fas fa-thumbs-up"></i></button>
      <button className="thumb-down" onClick={this.dislikeQuestion}><i className="fas fa-thumbs-down"></i></button>
      </div>
      </div>

      <div className="submitForm">
      <SubmitForm addQuestion={this.addQuestion}/>
      </div>
      </div>
    );
  }

}

export default App;
