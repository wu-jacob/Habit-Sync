import React, { useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AllHabits from "./AllHabits";
import AlertDismissible from "./AlertDismissible";
import CreateHabit from "./CreateHabit";
import Login from "./Login";
import Profile from "./Profile";
import Search from "./Search";
import SignUp from "./SignUp";
import '../css/App.css';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";


// Returns main app component
function App() {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState("");

  return <div className="fill-parent">
    <BrowserRouter>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Habit Sync</Navbar.Brand>
          </LinkContainer>
          <NavbarToggle />
          <NavbarCollapse>
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Feed</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/search">
                  <Nav.Link>Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create-habit">
                  <Nav.Link>New Habit</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                {user ? (
                    <Navbar.Text>
                      Signed in as: <Link to={"/profile/" + user}>{user}</Link> | {" "}
                      <Button 
                        type="button" 
                        variant="primary" 
                        onClick={() => setUser("")}>
                          Logout
                        </Button></Navbar.Text>
                  ) : (
                    <Navbar.Text>
                    <Link to="/login">Not Signed In</Link>
                    </Navbar.Text>
                  )}
              </Nav>
            </NavbarCollapse>
        </Container>
      </Navbar>
      {alert ? (
          <AlertDismissible {...alert} deleteAlert={() => setAlert(null)} />
        ) : null}
      <Routes>
        <Route element={<AllHabits/>} path="/" exact />
        <Route element={<Login setUser={setUser}/>} path="/login" />
        <Route element={<SignUp setAlert={setAlert} setUser={setUser}/>} path="/sign-up" />
        <Route element={<Profile/>} path="/profile/:username" />
        <Route element={<Search/>} path="/search" />
        <Route element={<CreateHabit user={user}/>} path="/create-habit" />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
