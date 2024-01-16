import { Fragment } from "react";
import Welcome from "../Pages/WelCome";
import SideBar from "../SideBar/SideBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiSpamFill } from "react-icons/ri";


const Root = (props) => {
  return (
    <Fragment>
      <Welcome />

      <Container fluid>
        <Card style={{background:"light gray"}}>
          <Card.Title>
           
            <div className="me-auto mt-2 mb-2" style={{marginLeft:"490px"}}>
            <AiFillDelete/>Delete
            <RiInboxArchiveFill />Archieve
            <RiSpamFill />Spam
            </div>
            
          </Card.Title>
        <Row>
          <Col xs={3} >
            <SideBar />
          </Col>
          <Col > 
            <main
              style={{
                margin: "auto",
                padding: "20px",
                
              }}
            >
              {props.children}
            </main>
          </Col>
        </Row>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Root;
