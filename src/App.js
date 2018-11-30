import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TabNavigation, Tab } from "evergreen-ui";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const tab = [
  { name: "Home", url: "/" },
  { name: "Register", url: "/register" }
];

const tabCo = [
  { name: "Home", url: "/" },
  { name: "Dashboard", url: "/dashboard" },
  { name: "Profile", url: "/profile" },
  { name: "Logout", url: "/" }
];

class App extends Component {
  state = {
    isConnected: false,
    nickname: "",
    user: {}
  };

  buckets = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
    { id: 5, name: "test5" }
  ];

  handleUser = user => {
    this.setState({ isConnected: true, user });
  };

  _menu = array => {
    const { user } = this.state;
    return (
      <Router>
        <Fragment>
          <>
            <TabNavigation>
              {array.map((tab, index) => (
                <Tab key={tab.name} href={tab.url} id={tab.name}>
                  <Link to={tab.url}> {tab.name}</Link>
                </Tab>
              ))}
            </TabNavigation>
          </>
          <Route
            exact
            path="/"
            render={props => <Home {...props} handleUser={this.handleUser} />}
          />
          <Route path="/register" component={Register} />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                buckets={this.buckets}
                nickname={props.nickname}
              />
            )}
          />
          <Route
            path="/profile"
            render={props => <Profile {...props} user={user} />}
          />
        </Fragment>
      </Router>
    );
  };

  render() {
    console.log(this.state);
    const { isConnected } = this.state;
    if (!isConnected) {
      return this._menu(tab);
    } else {
      return this._menu(tabCo);
    }
  }
}

export default App;
