import React from "react";
import {  ListGroup, Badge, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { BsPlus } from "react-icons/bs";


const SideBar = (props) => {
  const unreadMessagesCount = useSelector(
    (state) => state.inbox.unreadMessagesCount
  );

  return (
    <Container className={classes.container}>
      <Button className="mt-2 mb-4 w-=" onClick={props.handleShowCompose}>
        Compose
      </Button>

      <ListGroup   className={classes.listGroup}>
        <ListGroup.Item >
          <Link to="/Inbox">
            Inbox
            {unreadMessagesCount >= 0 && (
              <Badge variant="primary" style={{ marginLeft: "100px" }}>
                {unreadMessagesCount}
                {
                  <BsPlus
                    style={{
                      marginLeft: "1px",
                      color: "white",
                      fontSize: "15px",
                    }}
                  />
                }
              </Badge>
            )}
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/Unread">Unread</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/SentMail">SentMail</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/Draft">Draft</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/Delete">Delete</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/Archieve">Archieve</Link>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default SideBar;
