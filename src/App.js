import React, { Component, Fragment } from "react";
import jwt from "jsonwebtoken";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { TabNavigation, Tab, toaster } from "evergreen-ui";
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
  { name: "Profile", url: "/profile" }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      user: null
    };

    this.checkUser();
  }

  checkUser = async () => {
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      const uuid = decoded.uuid;
      const token = decoded;

      const data = await fetch(`http://localhost:5000/api/users/${uuid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      // if (data.status === 401) {
      //   toaster.danger("Your session has expired, please login again");
      // } else {
      //   toaster.notify("beep");
      //   // this.props.handleUser(user, token);
      // }

      // JSON = CHECK WITH SERVER IF NO EXPIRATION
      // this.handleUser(json.data.user, json.data.meta);
    }
  };

  handleUser = (user, meta) => {
    console.log("addstorage", meta);
    localStorage.setItem("myS3.app", JSON.stringify(meta));
    this.setState({ isConnected: true, user });
  };

  _logout = () => {
    localStorage.removeItem("myS3.app");
    this.setState({
      isConnected: false,
      user: null
    });

    return <Redirect to="/" />;
  };

  buckets = [
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
    { id: 5, name: "test5" }
  ];

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
              <Tab onSelect={this._logout}>
                <Link to="#"> Logout</Link>
              </Tab>
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
                // buckets={this.buckets}
                // nickname={props.nickname}
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
    const { isConnected } = this.state;
    if (!isConnected) {
      return this._menu(tab);
    } else {
      return this._menu(tabCo);
    }
  }
}

export default App;
