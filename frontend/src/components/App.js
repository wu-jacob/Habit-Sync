import React, { useState } from "react";
import { BrowserRouter, Router, Routes, Link, Route } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AllPosts from "./AllPosts";
import AlertDismissible from "./AlertDismissible";
import CreatePost from "./CreatePost";
import EditProfile from "./EditProfile";
import Login from "./Login";
import Profile from "./Profile";
import ProfileItem from "./ProfileItem";
import Search from "./Search";
import SignUp from "./SignUp";
import '../css/App.css';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

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
                <LinkContainer to="/create-post">
                  <Nav.Link>Post</Nav.Link>
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
        <Route element={<AllPosts/>} path="/" exact />
        <Route element={<Login setUser={setUser}/>} path="/login" />
        <Route element={<SignUp setAlert={setAlert} setUser={setUser}/>} path="/sign-up" />
        <Route element={<Profile/>} path="/profile/:username" />
        <Route element={<Search/>} path="/search" />
        <Route element={<CreatePost user={user}/>} path="/create-post" />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
