import React, { Component } from 'react';
import { Route } from 'react-router';
import CreateAccount from './CreateAccount';
import Header from './Header';
import Landing from './Landing';
import ListTasks from './ListTasks';
import Login from './Login';
import Tasks from './Tasks';
import UserProfile from './UserProfile';

class Layout extends Component {
    render() {
        return (
            <div>
                <div className="fixed-top mb-5">
                    <Header {...this.props} />
                </div>
                <br/>
                <br/>
                <br/>
                <div className="container-fluid mb-5 mt-5">
                    <Route exact path="/" component={Landing} />
                    <Route path="/main" component={Landing} />
                    <Route path="/createaccount" component={CreateAccount} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={UserProfile} />
                    <Route path="/tasks" component={Tasks} />
                    <Route path="/list" component={ListTasks} />
                </div>
            </div>
        );
    }
}

export default Layout;