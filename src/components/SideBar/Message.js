import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { PiPrinterDuotone } from "react-icons/pi";
import { IoArrowUndo } from "react-icons/io5";
import { TiArrowRightThick } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";

const Message = () => {
  const { emailId ,folder} = useParams();
  const inboxMessages =  useSelector((state)=>state.inbox.inboxItem)
  const sentMessages =  useSelector((state)=>state.sent.sentItem)
  
  const selectedMessage = folder === "inbox"
    ? inboxMessages.find((message) => message.id === emailId)
    : sentMessages.find((message) => message.id === emailId);
  

  if (!selectedMessage) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      style={{
        border: "solid blue",
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Row>
        <Row>
          <Col xs="10">
            <h3>{selectedMessage.sub}</h3>
          </Col>
          <Col xs="2">
            <div style={{ display: "flex" }}>
              <PiPrinterDuotone
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "lightgray",
                  marginTop: "3px",
                }}
              />
              <p>
                {new Date(selectedMessage.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <FaStar
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "lightgray",
                  marginTop: "3px",
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <div>
            <p>{selectedMessage.from}</p>
            <p>{selectedMessage.description}</p>
          </div>
        </Row>
           <div className="align-items-center mt-2 mb-2 mx-auto">
          <Card  style={{display: "flex",width:"120px",alignItems: "center",margin:"auto",borderRadius:"12px"}}>
          <div style={{color:"lightgray"}}>
            <IoArrowUndo />
            <IoArrowUndo />
            <TiArrowRightThick /> 
            <BsThreeDots />
            </div>
          </Card>
          </div>
         
        </Row>
     
    </Card>
  );
};

export default Message;
