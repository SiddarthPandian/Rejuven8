import React, { Component } from "react";
import InputForm from "./components/Note/InputForm";
//import { DB_CONFIG } from "./Config/config";
import "firebase/database";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: []
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="notesWrapper">
          <div className="notesHeader">American Airlines</div>
          <InputForm />
          <div className="notesBody"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
