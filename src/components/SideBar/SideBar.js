import React from "react";
import { Card, ListGroup,Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import  classes from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { BsPlus } from "react-icons/bs";


const SideBar = () => {
  const unreadMessagesCount = useSelector((state) => state.inbox.unreadMessagesCount);
  return (
    <Card className={classes.card}>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Link to="/Inbox">Inbox
            {unreadMessagesCount >= 0 && (
                <Badge variant="primary" style={{marginLeft:"12px"}}>
                  {unreadMessagesCount}{<BsPlus style={{marginLeft:"1px",color:"white",fontSize:"15px"}} />}
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
      </Card.Body>
    </Card>
  );
};

export default SideBar;

