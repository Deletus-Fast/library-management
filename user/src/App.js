import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Header from "./Components/Header";
import MemberDashboard from "./Pages/Dashboard/MemberDashboard/MemberDashboard";
import Allbooks from "./Pages/Allbooks";
import { AuthContext } from "./Context/AuthContext";
import BookDetails from "./Pages/BookDetails";
import AIBookSearch from "./Pages/AIBookSearch";
import ChatBot from "./Pages/ChatBot";
import Stuff from "./Pages/stuff";
import "./App.css";

function App() {
  const [admissionId, setAdmissionId] = useState("");
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated
  const isAuthenticated = user !== null;

  // Callback function to update admissionId state
  const updateAdmissionId = (id) => {
    setAdmissionId(id);
  };
  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            {isAuthenticated ? (
              <Redirect to="/dashboard@member" />
            ) : (
              <Signin updateAdmissionId={updateAdmissionId} />
            )}
          </Route>
          <Route exact path="/signup">
            {isAuthenticated ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path="/books">
            <Allbooks />
          </Route>
          {/* <Route exact path="/personalinfo">
            {isAuthenticated ? <PersonalInfoPage /> : <Redirect to="/" />}
          </Route> */}
          <Route exact path="/dashboard@member">
            {isAuthenticated && user ? (
              <MemberDashboard user={user} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/dashboard">
            <MemberDashboard />
          </Route>
          <Route exact path="/book">
            <BookDetails />
          </Route>
          <Route exact path="/Search/AI">
            <AIBookSearch />
          </Route>
          <Route exact path="/Chatbot">
            <ChatBot />
          </Route>
          <Route exact path="/stuff">
            <Stuff />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
