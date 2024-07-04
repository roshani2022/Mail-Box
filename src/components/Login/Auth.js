import React, { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  Form,
  Card,
  FloatingLabel,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Auth = () => {
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  console.log(isLogin);
  const history = useHistory();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword((prevState) => !prevState);
  };

  const switchAuthModeHandler = () => {
    dispatch(authActions.setLogin());
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
        console.log(data);
        dispatch(authActions.login({ idToken: data.idToken, email: email }));
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
    <Container className="d-flex flex-column align-items-center mt-5 mx-auto">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card
            className="d-flex flex-column p-4 shadow-sm mb-4"
            style={{ width: "25rem" }}
          >
            <h1 className="text-center mb-4">
              {" "}
              {isLogin ? "Login" : "Signup"}
            </h1>
            <Form className="d-flex flex-column" onSubmit={submitHandler}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  ref={emailRef}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-4"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />
                <Button
                  variant="light"
                  onClick={togglePasswordVisibility}
                  className="password-toggle-btn"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </Button>
              </FloatingLabel>
              {!isLogin ? (
                <FloatingLabel
                  controlId="floatingConfirmPassword"
                  label="ConfirmPassword"
                   className="mb-4"
                >
                  <Form.Control
                    type={confirmShowPassword ? "text" : "password"}
                    placeholder="ConfirmPassword"
                    required
                    ref={confirmPasswordRef}
                  />
                  <Button
                    variant="light"
                    onClick={toggleConfirmPasswordVisibility}
                    className="password-toggle-btn"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    {confirmShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </Button>
                </FloatingLabel>
              ) : (
                ""
              )}

              <Button type="submit">{isLogin ? "Login" : "SignUp"}</Button>
              {isLogin ? <Button variant="Link">Forget Password</Button> : ""}
            </Form>
          </Card>

          <Button className="w-50" onClick={switchAuthModeHandler}  style={{ marginLeft: "50px" }}>
            {/* {isLogin ? "Have an account?Login" : "Dont Have an account?Signup"} */}
            {isLogin
              ? "Don't Have an account?Signup"
              : " Have an account?Login"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Auth;
