import { useState } from "react";
import Welcome from "../Pages/WelCome";
import SideBar from "../SideBar/SideBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiSpamFill } from "react-icons/ri";
import classes from './Root.module.css'

const Root = (props) => {
  const [showCompose, setShowCompose] = useState(false);

  const handleShowCompose = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };
  return (
    <Container fluid className={classes.container}>
      <Welcome
        showCompose={showCompose}
        handleCloseCompose={handleCloseCompose}
      />
      <Row>
        <Col xs={3} className={classes.col}>
          <SideBar handleShowCompose={handleShowCompose} />
        </Col>
        <Col>
          <Card.Title>
            <div>
              <AiFillDelete />
              Delete
              <RiInboxArchiveFill />
              Archieve
              <RiSpamFill />
              Spam
            </div>
          </Card.Title>
          <Card>{props.children}</Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Root;
