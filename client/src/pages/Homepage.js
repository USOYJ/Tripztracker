import React from "react";
import Button from "react-bootstrap/Button";
import "../index.css";
import Auth from "../utils/auth";
function HomePage() {
  if (Auth.loggedIn()) {
    return (
      <>
        <div className="text-center">
          {" "}
          {/* <VacayForm />
          <VacayGrid /> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="text-center">
          {" "}
          <h1 className="home-title mt-4 mb-3">Welcome to Trip Tracker!</h1>
          <Button
            className="button m-2"
            href="/login"
            size="lg"
            style={{ width: "10%" }}>
            Login
          </Button>
          <Button
            className="button m-2"
            href="/signup"
            size="lg"
            style={{ width: "10%" }}>
            Sign Up
          </Button>
        </div>
      </>
    );
  }
}

export default HomePage;