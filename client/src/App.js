import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.component";
import LinksList from "./components/links-list.component";
import EditLink from "./components/edit-link.component";
import CreateLink from "./components/create-link.component";
import CreateUser from "./components/create-user.component";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{ width: "100%" }}>
        <Navbar />
        <br />
        <Route path="/" exact component={LinksList} />
        <Route path="/edit/:id" component={EditLink} />
        <Route path="/create" component={CreateLink} />
        <Route path="/user" component={CreateUser} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
