import React, { Component } from 'react';
import "./NavigateBottomBar.modul.css"



class NavigateBottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_nav: 1
        }
    };
    render() {
        return <div>
            <nav className="bottom-nav">
                
                <div className={this.state.active_nav === 0 ? "active" : ""}>
                    <i className="fas fa-search"></i>
                    Поиск
                </div>
                <div className={this.state.active_nav === 1 ? "active" : ""}>
                    <i className="fa-solid fa-house"></i>
                    Главная
                </div>
                <div className={this.state.active_nav === 2 ? "active" : ""}>
                    <i className="fas fa-user"></i>
                    Профиль
                </div>
            </nav>

        </div>
    }
}


export default NavigateBottomBar;