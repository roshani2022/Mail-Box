import React, { useState } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { inboxActions } from "../../store/inbox-slice";

const Welcome = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.email);

  const sentEmail = auth.replace(/[.@]/g, "");

  const [email, setEmail] = useState("");
  const [sub, setSub] = useState("");
  const [description, setDescription] = useState("");

  const onEditorStateChange = (event) => {
    setDescription(event.blocks[0].text);
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(inboxActions.addItems([]));
    history.replace("/");
  };

  const handleSend = async (event) => {
    event.preventDefault();
    props.handleCloseCompose();

    const composeEmail = {
      to: email,
      sub: sub,
      description: description,
      date: new Date(),
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

      const recieveEmail = {
        from: sentEmail,
        sub: sub,
        description: description,
        date: new Date(),
        unRead: true,
      };

      const recievedEmail = email.replace(/[.@]/g, "");
      try {
        const res = await fetch(
          `https://mail-box-a393b-default-rtdb.firebaseio.com/${recievedEmail}/RecieveEmail.json`,
          {
            method: "POST",
            body: JSON.stringify({ ...recieveEmail }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (res.ok) {
          alert("Mail Recive Successfuly");
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
    <>
      <header className="bg-light border-bottom d-flex align-items-center justify-content-between p-3 fixed-top w-100">
        <h6> Welcome To Your MailBox!!! </h6>
        <Button onClick={() => logoutHandler()}>Logout</Button>
      </header>

      <main>
        <Container className="d-flex flex-column align-items-center mt-5">
          <Modal
            show={props.showCompose}
            onHide={props.handleCloseCompose}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Compose Email</Modal.Title>
            </Modal.Header>

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
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="subject"
                  aria-label="Subject"
                  aria-describedby="basic-addon2"
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                />
              </InputGroup>

              <div style={{ height: "200px", overflowY: "auto" }}>
                <Editor
                  value={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onChange={onEditorStateChange}
                />
              </div>

              <Modal.Footer>
                <Button variant="primary" type="submit" className="mb-1 ms-1">
                  Send
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Container>
      </main>
    </>
  );
};

export default Welcome;
