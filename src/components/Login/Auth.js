import React, { useRef} from "react";
import { Form, Card, FloatingLabel, Button,Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import classes from "./Auth.module.css";
import { useDispatch ,useSelector} from "react-redux";
import { authActions } from "../../store/auth-slice";


const Auth = () => {
  const isLogin = useSelector(state=>state.auth.isAuthenticated)

  console.log(isLogin)
  const history = useHistory();
  const dispatch = useDispatch()

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  
  const switchAuthModeHandler = () => {
   dispatch(authActions.setLogin())
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = isLogin ? "" : confirmPasswordRef.current.value;

    if (password.length < 5) {
      alert("Password must be at least 5 characters long.");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAl3Vl8-L9QhEYGPI_lJsIGevwOexaPkP0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl3Vl8-L9QhEYGPI_lJsIGevwOexaPkP0";
    }

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
      }

      if (isLogin) {
        const data = await res.json();
        console.log(data)
        dispatch(authActions.login( {idToken: data.idToken,email:email}));
        history.replace("/welcome");
        console.log("Login Sucessfully");
      } else {
        console.log("User registerd successfully");
        alert("User registerd successfully");
      }
    } catch (error) {
      console.log("Error during authentication:", error);
      alert(error.message);
    }

  
  };

  return (
    <Container  className="d-flex flex-column align-items-center mt-5">
      <Card className={classes.card}>
        <h1 className="text-center mb-4"> {isLogin ? "Login" : "Signup"}</h1>
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
          {!isLogin ? (
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
          ) : (
            ""
          )}

          <Button type="submit">{isLogin ? "Login" : "SignUp"}</Button>
          {isLogin ? <Button variant="Link">Forget Password</Button> : ""}
        </Form>
      </Card>
      <Button className="mt-3" onClick={switchAuthModeHandler}>
        {isLogin ? "Have an account?Login" : "Dont Have an account?Signup"}
      </Button>
    </Container>
  );
};
export default Auth;
