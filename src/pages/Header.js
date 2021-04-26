import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import honeydoLogo from '../images/Honeydo_font_logo_edit.png'

class Header extends Component {

    state = { 
        user: {
            email: '',
            password: '',
            userClass: ''
        }
    }

    signOut = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userClass");
        this.props.history.push("/main");
    }

    render() {

        let loginOutButton = (
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
        )

        let createAccountButton = (
            <Link to="/createaccount" className="btn btn-warning">Sign-up</Link>
        )

        let taskListElement = (
            <Link to="/tasks" className="nav-link px-2 text-white">Tasks</Link>
        )

        if(localStorage.getItem("loggedInUser") != null) {
            loginOutButton = (
                <button onClick={this.signOut} className="btn btn-outline-light me-2" type="submit">Logout</button>
            );
            createAccountButton = null;
        }
        
        if (localStorage.getItem("userClass") === "Assigned") {
            taskListElement = (
                <Link to="/list" className="nav-link px-2 text-white">Tasks</Link> 
            )
        }

        return (
            <div>
                <header className="p-3 bg-dark text-white">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <img src={honeydoLogo} alt="HoneyDo Logo" width="250px" height="50px" />

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
                            <li><Link to="/profile" className="nav-link px-2 text-white">Profile</Link></li>
                            <li>{taskListElement}</li>
                            <li><Link to="" className="nav-link px-2 text-white">FAQs</Link></li>
                            <li><Link to="" className="nav-link px-2 text-white">About</Link></li>
                        </ul>

                        <div className="text-end">
                            {loginOutButton}
                            {createAccountButton}
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default withRouter(Header);