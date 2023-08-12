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
  return <div className="">
    <BrowserRouter>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Habit Journal</Navbar.Brand>
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
              <Navbar.Text>
                <Link to="/login">Not Signed In</Link>
              </Navbar.Text>
            </NavbarCollapse>
        </Container>
      </Navbar>
      <Routes>
        <Route element={<AllPosts/>} path="/" exact />
        <Route element={<Login/>} path="/login" />
        <Route element={<SignUp/>} path="/sign-up" />
        <Route element={<Profile/>} path="/profile/:username" />
        <Route element={<Search/>} path="/search" />
        <Route element={<CreatePost/>} path="/create-post" />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
