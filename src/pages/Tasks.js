import React, { Component } from 'react';
import axios from 'axios';


class Tasks extends Component {

    state = {
        tasks: {
            taskID: '',
            doDate: '',
            taskTitle: '',
            taskDiscription: '',
            assinedTo: ''
        },
        user: {}
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempTask = { ...this.state.tasks };
        tempTask[name] = value;
        this.setState({
            tasks: tempTask
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8181/main/createTask', JSON.stringify({
            taskID: this.state.tasks.taskID,
            doDate: this.state.tasks.doDate,
            taskTitle: this.state.tasks.taskTitle,
            taskDiscription: this.state.tasks.taskDiscription,
            assinedTo: this.state.tasks.assinedTo
        }))
            .then(response => {
                console.log('task added');
                alert('Task successfully added');
                window.location.reload();
            })
            .catch(error => {
                console.log('an error has happened');
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


    renderTaskForm = () => {
        return <form onSubmit={this.handleSubmit} className="container">
            <div className="form-label-group container col-5 bg-over">
                <label className="form-label" htmlFor="taskID">Task ID:</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskID} className="form-control" type="number" name="taskID" id="taskID" />
            </div>
            <br/>
            <div className="form-label-group container col-5 bg-over">
                <label className="form-label" htmlFor="doDate">Task Do Date:</label>
                <input onChange={this.handleChange} value={this.state.tasks.doDate} className="form-control" type="text" name="doDate" id="doDate" placeholder="any date format" />
            </div>
            <br/>
            <div className="form-label-group container col-5 bg-over">
                <label className="form-label" htmlFor="taskTitle">Task Title:</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskTitle} className="form-control" type="text" name="taskTitle" id="taskTitle" />
            </div>
            <br/>
            <div className="form-label-group container col-5 bg-over">
                <label className="form-label" htmlFor="taskDiscription">Task Discription</label>
                <input onChange={this.handleChange} value={this.state.tasks.taskDiscription} className="form-control" type="text" name="taskDiscription" id="taskDiscription" />
            </div>
            <br/>
            <div className="form-label-group container col-5 bg-over">
                <label className="form-label" htmlFor="assinedTo">Assigned To:</label>
                <input onChange={this.handleChange} value={this.state.tasks.assinedTo} className="form-control" type="text" name="assinedTo" id="assinedTo" placeholder="assignedToEmail@emai.com"/>
            </div>
            <br />
            <div className="form-label-group container col-5 bg-over">
                <button type="submit" className="btn btn-outline-dark btn-back-color">Submit</button>
            </div>
        </form>
    }


    render() {

        let header = (
            <h1>Welcome to the Tasks Page</h1>
        )

        let notLogedIn = (
            <p>You need to be logged in to properly view this page</p>
        )

        let taskListForm = null

        if (localStorage.getItem("loggedInUser") != null) {
            header = (
                <h1>Hi {this.state.user.firstName} {this.state.user.lastName}</h1>
            )
        }

        if (localStorage.getItem("userClass") === "Assigner") {
            notLogedIn = (
                <p>Who do you want to assign a task to?</p>
            )
            taskListForm = this.renderTaskForm()
        }

        return (
            <div>
                {header}
                {notLogedIn}
                {taskListForm}
            </div>
        );
    }
}

export default Tasks;