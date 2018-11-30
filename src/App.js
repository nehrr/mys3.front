import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TabNavigation, Tab } from "evergreen-ui";

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
    isConnected: false
  };

  _menu = array => {
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
