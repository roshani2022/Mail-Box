import React from "react";
import { Button,Container } from "react-bootstrap";
import classes from "./Welcome.module.css";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const Welcome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  return (
    <Container fluid >
      <header className={classes.header}>
        Welcome To Your MailBox!!!
        <Button onClick={() => logoutHandler()}>Logout</Button>
      </header>
    </Container>
  );
};
export default Welcome;
