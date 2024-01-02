import React, { useRef } from "react";
import { Form, Card, FloatingLabel, Button } from "react-bootstrap";
import classes from "./Auth.module.css";

const Auth = () => {
  const emailRef = useRef({ current: "" });
  const passwordRef = useRef({ current: "" });
  const confirmPasswordRef = useRef({ current: "" });

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password.length < 5) {
      alert("Password must be at least 5 characters long.");
      return;
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl3Vl8-L9QhEYGPI_lJsIGevwOexaPkP0";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        let errorMessage = data.error?.message || "Unknown error";
        throw new Error(errorMessage);
      } else {
        console.log("User has signed up successfully");
        alert("User has signed up successfully");
      }
    } catch (error) {
      console.log("Error during authentication:", error);
      alert(error.message);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <>
      <Card className={classes.card}>
        <h1>SignUp</h1>
        <Form className={classes.form} onSubmit={submitHandler}>
          <FloatingLabel controlId="floatingInput" label="Email address">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              ref={emailRef}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="ConfirmPassword"
           
          >
            <Form.Control
              type="password"
              placeholder="ConfirmPassword"
              required
              ref={confirmPasswordRef}
            />
          </FloatingLabel>
          <Button type="submit">SignUp</Button>
        </Form>
      </Card>
      <Button className="mt-3" >Have an account?Login</Button>
    </>
  );
};
export default Auth;
