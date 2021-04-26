import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import honeydoLogo from '../images/Honeydo_font_logo_edit.png'

class Landing extends Component {

    state = { 
        user: {
            email: '',
            password: '',
            userClass: ''
        }
    }

    signOut = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userClass');
        this.props.history.push('/main');
    }

    render() {

        let loginOutButton = (
            <Link className="btn btn-outline-dark btn-back-color" to="login">Login</Link>
        );

        let signUpProfile = (
            <Link className="btn btn-outline-dark btn-back-color" to="/createaccount">Sign up</Link>
        );

        if(localStorage.getItem("loggedInUser") != null) {
            loginOutButton = (
            <button onClick={this.signOut} className="btn btn-outline-dark btn-back-color" type="submit">Logout</button>
            );
            signUpProfile = (
                <Link className="btn btn-outline-dark btn-back-color" to="profile">User Profile</Link>
            );
        }

        return (
            <div>
                <h1>Welcome to <img className="hdo-back" src= {honeydoLogo} width="250px" height="50px" alt="honeydo_logo"/></h1>
                <p>The place to keep track of your spouses tasks</p>
                <p>and they can keep up with theirs</p>
                {loginOutButton}
                {signUpProfile}
            </div>
        );
    }
}

export default Landing;