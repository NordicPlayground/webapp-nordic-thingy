import React, {Component} from "react";
import DashboardContainer from "./containers/DashboardContainer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <DashboardContainer />
        </MuiThemeProvider>
    );
  }
}

export default App;
