import React, { Component } from 'react';
import {CSSTransition} from 'react-transition-group';
import '../App.css'
import './Menu.css'

class Menu extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { active : false };
    }
    
    toggle(){
        this.setState({ active : !this.state.active });
    }
    
    render(){
        var active = this.state.active;
                console.log(this.state.active);

        return (<span>
            <button className={"hamburger hamburger--squeeze "+(active&&"is-active")} id="menubutton" type="button" onClick={this.toggle} unmountOnExit>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
                
            <CSSTransition classNames="menu" timeout={200} in={active} onEnter={()=>console.log("called")}>
                    <div className="menu">
                        <div className="caption">
                            <h2>About</h2>
                            <p>TMAYL is an open source project created to help make meaningful conversations. We hope that together, we can facilitate meaningful connections with those around us.</p>
                            <hr/>
                            <p><a href="#">Inquiry</a> | <a href="https://github.com/KChan440/story_time">Github</a></p>
                        </div>
                    </div>
            </CSSTransition>
                

    </span>);
}
}


export default Menu;