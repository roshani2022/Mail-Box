import React,{useEffect} from "react";
import {  ListGroup, Badge, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./SideBar.module.css";
import { useSelector,useDispatch} from "react-redux";
import { BsPlus } from "react-icons/bs";
import useFetch from "../hook/useFetch";
import { inboxActions } from "../../store/inbox-slice";


const SideBar = (props) => {
  const authEmail = useSelector((state) => state.auth.email);
  const receivedId = authEmail.replace(/[.@]/g, "");
  const dispatch = useDispatch();
  const unreadMessagesCount = useSelector(
    (state) => state.inbox.unreadMessagesCount
  );

 
  const { data } = useFetch(
    `https://mail-box-a393b-default-rtdb.firebaseio.com//${receivedId}/RecieveEmail.json`
  );
  
  useEffect(() => {
    if (data) {
      const items = Object.entries(data).map(([id, innerData]) => ({
        id,
        ...innerData,
      }));

      const intervalId = setInterval(() => {
        dispatch(inboxActions.addItems(items));
      
      }, 2000);

      return () => clearInterval(intervalId);
    } else {
      alert("Failed to fetch recieve Email");
    }
  }, [data, dispatch,unreadMessagesCount]);


  return (
    <Container className={classes.container}>
      <Button className="mt-3 mb-4 ms-5 w-120" size="lg" onClick={props.handleShowCompose}>
        Compose
      </Button>

      <ListGroup   className={classes.listGroup}>
        <ListGroup.Item >
          <Link to="/Inbox">
            Inbox
            {unreadMessagesCount > 0 && (
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
