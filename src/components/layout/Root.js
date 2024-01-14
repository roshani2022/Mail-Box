import { Fragment } from "react";
import Welcome from "../Pages/WelCome";
import SideBar from "../SideBar/SideBar";
import { Container, Row, Col } from "react-bootstrap";

const Root = (props) => {
  return (
    <Fragment>
      <Welcome />

      <Container fluid>
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
      </Container>
    </Fragment>
  );
};

export default Root;
