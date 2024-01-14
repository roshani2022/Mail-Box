import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import  classes from"./SideBar.module.css"

const SideBar = () => {
  return (
    <Card className={classes.card}>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Link to="/Inbox">Inbox</Link>
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
      </Card.Body>
    </Card>
  );
};

export default SideBar;

