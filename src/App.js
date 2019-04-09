import React, { Component } from 'react';
import Question from './Question/Question';
import SubmitForm from './SubmitForm/SubmitForm';
import Menu from './Menu/Menu'
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);

    this.colors = ["#D0021B","#F5A623","#7ED321","#50E3C2","#4A90E2","#9013FE"];

    this.getQ = this.getQ.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('questions');

    this.state = {
      questions: [],
      currentQuestion: {}
    }
  }

  componentDidMount(){
    this.getQ()
  }

  getQ(){
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
        //console.log(this.state.questions);
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

  render() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    document.body.style.backgroundColor = this.colors[randomIndex];

    return (
      <div className="questionWrapper">
          <div className="questionBody" id="questionBody">
            <button onClick={this.getQ}><i className="fas fa-sync-alt" id="refresh-button"/></button>
        {
            <Question questionContent={this.state.currentQuestion.questionContent} 
            questionId={this.state.currentQuestion.id} 
            key={this.state.currentQuestion.id}
            />}

            <LikeOrDislike tempID={this.state.currentQuestion.id} key={"l"+this.state.currentQuestion.id}/>

        </div>

          <div className="submitForm">
            <SubmitForm addQuestion={this.addQuestion}/>
          </div>
            <div className="info" href="#"><Menu /></div>
      </div>
    );
  }

}

class LikeOrDislike extends Component {
  constructor(props) {
    super(props);

    this.likeQuestion = this.likeQuestion.bind(this);
    this.dislikeQuestion = this.dislikeQuestion.bind(this);

    this.state = {
      liked: false,
      disliked: false
    }
  }

  likeQuestion(){
    this.setState({liked:true,disliked:false});
  }
  dislikeQuestion(){
    this.setState({disliked:true,liked:false});
  }

  componentWillUnmount(){
    var tempFieldName = '';
    if(this.state.liked)
      tempFieldName = "/likes";
    if(this.state.disliked)
      tempFieldName = "/dislikes";

    if(tempFieldName){
      const questionRef = firebase.database().ref("questions/" + this.props.tempID + tempFieldName);
      questionRef.transaction(function (current_value) {
        return (current_value || 0) + 1;
      });
      // alert(tempFieldName);
    }
  }


  render() {
    return (
      <div className="like-or-dislike">
        How was this question?
        <button className={"thumb-up"+(this.state.liked ? " active" : '')} onClick={this.likeQuestion}><i className="fas fa-thumbs-up"></i></button>
        <button className={"thumb-down"+(this.state.disliked ? " active" : '')} onClick={this.dislikeQuestion}><i className="fas fa-thumbs-down"></i></button>
      </div>
      );
  }
}


export default App;
