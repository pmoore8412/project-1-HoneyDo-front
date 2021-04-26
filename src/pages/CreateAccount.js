import axios from 'axios';
import React, { Component } from 'react';

class CreateAccount extends Component {

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
        axios.post('http://localhost:8181/main/createUser', JSON.stringify({
            email: this.state.user.email,
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            password: this.state.user.password,
            userClass: this.state.user.userClass
        }))
            .then(response => {
                console.log('user added');
                this.props.history.push('main')
            })
            .catch(error => {
                console.log('an error has happened')
            })
    }



    render() {
        return (
            <div>
                <div className="container text-center">
                    <h2 className="mb-3">Register for a HoneyDo acount</h2>
                    <button type="button" className="btn btn-outline-dark btn-back-color" data-toggle="modal" data-target="#myModal">Disclaimer</button>

                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title text-overide">Disclaimer</h4>
                                    <button type="btn-close" className="button" data-dismiss="modal">X</button>
                                </div>
                                <div className="modal-body text-overide">
                                    <p>The assigned: By signing up for HoneyDo you are giving your signinificat other authorization to assign you tasks
                            which you must compleate of face their wrath.</p>
                                    <p>The assigner: By signing up for HoneDo you are agreeing to accept the responsablilty of assigning tasks to your significat
                            other that they must compleate by the date that you set forth. Go easy on them, Okay.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-dark btn-back-color" data-dismiss="modal">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container bg-over">
                    <form onSubmit={this.handleSubmit} className="container">
                        <div className="form-label-group container col-5 bg-over">
                            <label className="form-label" htmlFor="email">Email:</label>
                            <input onChange={this.handleChange} value={this.state.user.email} className="form-control" type="email" name="email" id="email" placeholder="youremail@email.com" />
                        </div>
                        <br />
                        <div className="form-label-group container col-5 bg-over">
                            <label className="form-label" htmlFor="firstName">First Name:</label>
                            <input onChange={this.handleChange} value={this.state.user.firstName} className="form-control" type="text" name="firstName" id="firstName" placeholder="First Name" />
                        </div>
                        <br />
                        <div className="form-label-group container col-5 bg-over">
                            <label className="form-label" htmlFor="lastName">Last Name:</label>
                            <input onChange={this.handleChange} value={this.state.user.lastName} className="form-control" type="text" name="lastName" id="lastName" placeholder="Last Name" />
                        </div>
                        <br />
                        <div className="form-label-group container col-5 bg-over">
                            <label className="form-label" htmlFor="password">Password:</label>
                            <input onChange={this.handleChange} value={this.state.user.password} className="form-control" type="password" name="password" id="password" />
                        </div>
                        <br />
                        <div className="form-label-group container col-5 bg-over">
                            <label className="form-label" htmlFor="userClass">Assigner/Assigned:</label>
                            <input onChange={this.handleChange} value={this.state.user.userClass} className="form-control" type="text" name="userClass" id="userClass" />
                        </div>
                        <br />
                        <div className="form-label-group container col-5 bg-over">
                            <button type="submit" className="btn btn-outline-dark btn-back-color">Submit</button>
                        </div>
                    </form>
                    <br />
                </div>
            </div>
        );
    }
}

export default CreateAccount;