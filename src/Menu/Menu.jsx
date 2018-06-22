import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import '../App.css'
import './Menu.css'

class Menu extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { isOpen : false };
    }
    
    toggle(){
        this.setState({ isOpen : !this.state.isOpen });
    }
    
    render(){
        var isOpen = this.state.isOpen;
                console.log(this.state.isOpen);

        return (<span>
            <button className={"hamburger hamburger--squeeze "+(isOpen&&"is-isOpen")} id="menubutton" type="button" onClick={this.toggle}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
                

            <CSSTransition classNames="caption" timeout={200} in={isOpen} >
                <div className="caption">
                    <div className="caption-inner">
                        <h2>About</h2>
                        <p>TMAYL is an open source project created to help make meaningful conversations. We hope that together, we can facilitate meaningful connections with those around us.</p>
                        <hr/>
                        <p><a href="#">Inquiry</a> | <a href="https://github.com/KChan440/story_time">Github</a></p>
                </div></div>
            </CSSTransition>
                
            <CSSTransition classNames="menu" timeout={200} in={isOpen} >
                    <div className="menu"></div>
            </CSSTransition>
                
    </span>);
}
}


export default Menu;