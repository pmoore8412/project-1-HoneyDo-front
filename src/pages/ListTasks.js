import React, { Component } from 'react';
import axios from 'axios';

class ListTasks extends Component {

    state = {
        user: {},
        cTask: {
            taskID: '',
            taskTitle: '',
            completedDate: '',
            assinedTo: ''
        },
        tasks: []
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        const tempTask = { ...this.state.cTask };
        tempTask[name] = value;
        this.setState({
            cTask: tempTask
        });
    }

    componentDidMount() {
        axios.post('http://localhost:8181/main/getTasks', JSON.stringify({
            email: localStorage.getItem("loggedInUser")
        }))
        .then(response => {
            this.setState({
                tasks: response.data
            });
        })
        .catch(error => {
            // display error message
        })
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

    handleComplete = (event) => {
        event.preventDefault();
        let today = new Date().toLocaleDateString();
        axios.post('http://localhost:8181/main/completeTask', JSON.stringify({
            taskID: this.state.cTask.taskID,
            completedDate: today,
            assinedTo: localStorage.getItem("loggedInUser")
        }))
            .then(response => {
                console.log('task completed');
                alert('Task successfully completed');
                window.location.reload();
            })
            .catch(error => {
                console.log('an error has happened');
            })

    }

    renderTasksList = () => {
        let tempTask = this.state.tasks.map((task) => 
        <tr key={task.taskID}>
            <th scope="row">{task.taskID}</th>
            <td>{task.doDate}</td>
            <td>{task.taskTitle}</td>
            <td>{task.taskDiscription}</td>
            <td>{task.assinedTo}</td>
            <td></td>
        </tr>)

        return tempTask
    }

    completingTask = () => {
        return <div style={{float: 'left', display: 'block'}}> 
        <form onSubmit={this.handleComplete} >
            <div className="col-5 bg-over">
                <label htmlFor="taskID">ID of task to be completed:</label>
                <input onChange={this.handleChange} value={this.state.cTask.taskID} type="number" name="taskID" id="taskID" />
                <button type="submit" className="btn btn-outline-dark btn-back-color">Compleate</button>
            </div>
        </form>
        </div>
    }

    renderTable = () => {
        return <table className="table">
            <thead>
                <tr>
                    <th scope="col">Task ID</th>
                    <th scope="col">Task Do Date</th>
                    <th scope="col">Task Title</th>
                    <th scope="col">Task Discription</th>
                    <th scope="col">Task Assigned To</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {this.renderTasksList()}
            </tbody>
        </table>
    }

    render() {

        let header = (
            <h1>Welcome to the Tasks Page</h1>
        )

        let notAutherized = (
            <p>You need to be logged in to properly view this page</p>
        )

        let listAssignedTasks = null

        let showForm = null

        if (localStorage.getItem("loggedInUser") != null) {
            header = (
                <h1>Hi {this.state.user.firstName} {this.state.user.lastName} </h1>
            )
            if (localStorage.getItem("userClass") === "Assigned") {
                if (this.state.tasks.length === 0) {
                    notAutherized = (
                        <p>there are not tasks for you to compleate</p>
                    )
                } else {
                    notAutherized = (
                        <p>Here is the list of tasks assigned to you</p>
                    )
                    showForm = this.completingTask()
                    listAssignedTasks = this.renderTable()
                }
            } else {
                header = (
                    <h1>Hi {this.state.user.firstName} </h1>
                )
                notAutherized = (
                    <p>You are not someone who compleates tasks, you are the one who assigns them</p>
                )
            }
        }

        return (
            <div>
                {header}
                {notAutherized}
                {showForm}
                {listAssignedTasks}
            </div>
        );
    }
}

export default ListTasks;