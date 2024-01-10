import React, { useState } from "react";
import { Button, Container, Modal, Form, InputGroup } from "react-bootstrap";
import classes from "./Welcome.module.css";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import SideBar from "../SideBar/SideBar";

const Welcome = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.email);

  const sentEmail = auth.replace(/[.@]/g, "");

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");
  const [description, setDescription] = useState("");

  const onEditorStateChange = (event) => {
    setDescription(event.blocks[0].text);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  const showComposeBox = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setShow(false);

    const composeEmail = {
      email,
      sub,
      description,
    };

    console.log(composeEmail);
    if (email.length === 0 || sub.length === 0 || description.length === 0) {
      alert("please fill detail");
      return;
    } else {
      try {
        const res = await fetch(
          `https://mail-box-a393b-default-rtdb.firebaseio.com/${sentEmail}/SenDEmail.json`,
          {
            method: "POST",
            body: JSON.stringify({ ...composeEmail }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Mail Compose Successfuly");
        } else {
          const data = await res.json();
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }

      setEmail("");
      setSub("");
      setDescription("");
    }
  };

  return (
    <Container fluid>
      <header className={classes.header}>
        Welcome To Your MailBox!!!
        <Button onClick={() => logoutHandler()}>Logout</Button>
      </header>
      <Button className="mt-2" onClick={showComposeBox}>
        Compose
      </Button>
      <SideBar />
      <main>
        <Container className="d-flex flex-column align-items-center w-600px mt-5">
          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header
              closeButton
              style={{ fontSize: "10px", padding: "5px" }}
            />

            <Form onSubmit={handleSend} className="mt-0">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
                <Form.Control
                  placeholder="Enter Recipent Email"
                  aria-label="UserEamil"
                  aria-describedby="basic-addon1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ border: "none", borderBottom: "1px solid #ccc" }}
                />
              </InputGroup>
              <InputGroup controlId="formSubject">
              <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="subject"
                  aria-label="Subject"
                  aria-describedby="basic-addon2"
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  style={{ border: "none", borderBottom: "1px solid #ccc" }}
                />
              </InputGroup>
              <InputGroup className="mb-3" controlId="textArea">
                <Editor
                  value={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onChange={onEditorStateChange}
                />
              </InputGroup>
              <Modal.Footer>
                <Button variant="primary" type="submit" className="mb-1 ms-1">
                  Send
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </main>
    </Container>
  );
};

export default Welcome;
