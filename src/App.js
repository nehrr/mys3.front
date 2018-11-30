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
    isConnected: true,
    name: "Shepard"
  };

  buckets = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
    { id: 5, name: "test5" }
  ];

  _menu = array => {
    const { isConnected, name } = this.state;
    return (
      <Router>
        <Fragment>
          <div>
            <TabNavigation>
              {array.map((tab, index) => (
                <Tab key={tab.name} href={tab.url} id={tab.name}>
                  <Link to={tab.url}> {tab.name}</Link>
                </Tab>
              ))}
            </TabNavigation>
          </div>
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} isConnected={isConnected} name={name} />
            )}
          />
          <Route path="/register" component={Register} />
          <Route
            path="/dashboard"
            render={props => <Dashboard {...props} buckets={this.buckets} />}
          />
          <Route path="/profile" component={Profile} />
        </Fragment>
      </Router>
    );
  };

  render() {
    const { isConnected } = this.state;
    if (!isConnected) {
      return this._menu(tab);
    } else {
      return this._menu(tabCo);
    }
  }
}

export default App;
