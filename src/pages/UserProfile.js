import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends Component {

    state = {
        user: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            userClass: ''
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempUser = { ...this.state.user };
        tempUser[name] = value;
        this.setState({
            user: tempUser
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8181/main/updateUser', JSON.stringify({
            email: localStorage.getItem("loggedInUser"),
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            password: this.state.user.password,
        }))
            .then(response => {
                console.log('user updated');
                alert('Profile successfully updated');
                window.location.reload();
            })
            .catch(error => {
                console.log('an error has happened')
            })
    }

    handleDelete = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8181/main/deleteUser', JSON.stringify({
            email: localStorage.getItem("loggedInUser"),
            userClass: localStorage.getItem("userClass")
        }))
            .then(response => {
                console.log('user deleted');
                alert('Profile successfully deleted');
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("userClass");
                this.props.history.push("/main");
            })
            .catch(error => {
                console.log('an error has happened')
            })
    }
    

    componentDidMount() {
        axios.post('http://localhost:8181/main/getUser', JSON.stringify({
            email: localStorage.getItem("loggedInUser")
        }))
        .then(response => {
            this.setState({
                user: response.data
            });
        })
        .catch(error => {
            // display error message
            console.log('an error has happened');
        })
    }

    renderUpdateForm = () => {
        return <form onSubmit={this.handleSubmit} style={{float: 'left', display: 'block'}}>
            <p>when updating your profile, please re-enter your password (unless you are changing that too)</p>
            <div className="form-label-group col-5 bg-over">
                <label htmlFor="firstName">First Name:</label>
                <input onChange={this.handleChange} value={this.state.user.firstName} className="form-control" type="text" name="firstName" id="firstName" placeholder="First Name" />
            </div>
            <br />
            <div className="form-label-group col-5 bg-over">
                <label htmlFor="lastName">Last Name:</label>
                <input onChange={this.handleChange} value={this.state.user.lastName} className="form-control" type="text" name="lastName" id="lastName" placeholder="Last Name" />
            </div>
            <br />
            <div className="form-label-group col-5 bg-over">
                <label htmlFor="password">Password:</label>
                <input onChange={this.handleChange} value={this.state.user.password} className="form-control" type="password" name="password" id="password" />
            </div>
            <br/>
            <div className="form-label-group col-5 bg-over">
                <button type="submit" className="btn btn-outline-dark btn-back-color">Update</button>
            </div>
        </form>
    }

    render() {

        let header = (
            <h1>Welcome to the User Profile Page</h1>
        )

        let notLogedIn = (
            <p>You need to be logged in to properly view this page</p>
        )

        let buttonsDelete = null

        let buttonsUpdate = null

        let updatePro = null

        if (localStorage.getItem("loggedInUser") != null) {
            header = (
                <h1>Welcome {this.state.user.firstName} {this.state.user.lastName}</h1>
            );

            if(localStorage.getItem("userClass") === "Assigner") {
                notLogedIn = (
                    <Link className="btn btn-outline-dark btn-back-color" to="/tasks">Tasks</Link>
                )
            }

            if(localStorage.getItem("userClass") === "Assigned") {
                notLogedIn = (
                    <Link className="btn btn-outline-dark btn-back-color" to="/list">Tasks</Link>
                )
            }

            buttonsUpdate = (
                <button type="submit" className="btn btn-outline-dark btn-back-color">Update Profile</button>
            )
            buttonsDelete = (
                <button onClick={this.handleDelete} type="submit" className="btn btn-outline-dark btn-back-color">Delete Profile</button>
            )
            updatePro = this.renderUpdateForm()
        }

        return (
            <div>
                {header}
                <div>
                    {notLogedIn} 
                    {buttonsUpdate}
                    {buttonsDelete}
                    <br/>
                    <br/>
                    {updatePro}
                </div>
            </div>
        );
    }
}

export default UserProfile;