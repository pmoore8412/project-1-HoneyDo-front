import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    state = {
        user: {
            email: '',
            password: '',
            userClass: ''
        }

    }

    changeHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = {...this.state.user};
        tempUser[name] = value;
        this.setState({
            user: tempUser
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8181/main/userLogin', JSON.stringify({
            email: this.state.user.email,
            password: this.state.user.password
        }))
        .then(response => {
            console.log('logging in user');
            localStorage.setItem("loggedInUser", response.data.email);
            localStorage.setItem("userClass", response.data.classType);
            console.log(response.data.classType);
            console.log(response.data.email)
            this.props.history.push('/profile');            
        })
        .catch(error => {
            //display error message
            console.log('an error has happened')
            alert('Invalid email or password or user account does not exist')
            window.location.reload();
        })
    }


    render() {
        return (
            <div>
                <h1 className="text-center mb-5 text-overide">Login</h1>
                <br />
                <form onSubmit={this.handleSubmit} className="container">
                    <div className="form-label-group container col-2 text-overide">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input onChange={this.changeHandler} value={this.state.user.email} className="form-control col-2" type="email" name="email" id="email" placeholder="youremail@email.com" />
                        <br />
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input onChange={this.changeHandler} value={this.state.user.password} className="form-control col-2" type="password" name="password" id="password" />
                        <br />
                        <button type="submit" className="btn btn-outline-dark btn-back-color">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;