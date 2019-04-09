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
    const colors = ["#D0021B","#F5A623","#7ED321","#50E3C2","#4A90E2","#9013FE"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    document.title = "tmayl.";
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

  likeQuestion(question){
    const tempID = this.state.currentQuestion.id; 
    const questionRef = firebase.database().ref("questions/" + tempID + "/likes");
    //console.log(questionRef);
    questionRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    // this.componentWillMount();
    alert("yee");
  }

  dislikeQuestion(question){
    const tempID = this.state.currentQuestion.id;
    const questionRef = firebase.database().ref("questions/" + tempID + "/dislikes");
    questionRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
    // this.componentWillMount();
    alert("yee");
  }

  render() {
    return (
      <div className="questionWrapper">
          <div className="questionBody" id="questionBody">{
            <Question questionContent={this.state.currentQuestion.questionContent} 
            questionId={this.state.currentQuestion.id} 
            key={this.state.currentQuestion.id}
            />}
            
            <div onClick={this.componentWillMount}>refresh</div>

            <LikeOrDislike likeQuestion={this.likeQuestion} dislikeQuestion={this.dislikeQuestion} tempID={this.state.currentQuestion.id}/>

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
    // this.props.likeQuestion;
  }
  dislikeQuestion(){
    this.setState({disliked:true,liked:false});
    // this.props.dislikeQuestion;
  }

  componentWillUnmount(){
    alert("saaaaave meeeee");

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
