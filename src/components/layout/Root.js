import { useState } from "react";
import Welcome from "../Welcome/WelCome";
import SideBar from "../SideBar/SideBar";
import { Row, Col, Card, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { RiInboxArchiveFill, RiSpamFill } from "react-icons/ri";

const Root = (props) => {
  const [showCompose, setShowCompose] = useState(false);

  const handleShowCompose = () => {
    setShowCompose(true);
  };

  const handleCloseCompose = () => {
    setShowCompose(false);
  };
  return (
    <>
      <Welcome
        showCompose={showCompose}
        handleCloseCompose={handleCloseCompose}
      />
      <div className="mt-3">
        <Row>
          <Col xs={12} md={3} className="bg-light min-vh-100">
            <SideBar handleShowCompose={handleShowCompose} />
          </Col>
          <Col xs={12} md={9} className="p-3">
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex flex-wrap justify-content-between mb-3">
                  <Button variant="light" className="mb-2">
                    <AiFillDelete className="me-1" />
                    Delete
                  </Button>
                  <Button variant="light" className="mb-2">
                    <RiInboxArchiveFill className="me-1" />
                    Archive
                  </Button>
                  <Button variant="light" className="mb-2">
                    <RiSpamFill className="me-1" />
                    Spam
                  </Button>
                </div>
                {props.children}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Root;
