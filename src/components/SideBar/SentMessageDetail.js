import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { PiPrinterDuotone } from "react-icons/pi";
import { IoArrowUndo } from "react-icons/io5";
import { TiArrowRightThick } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import classes from "./SentMessageDetail.module.css";

const SentMessageDetail = () => {
  const { id } = useParams();
  const sentMessages = useSelector((state) => state.sent.sentItem);
  const selectedMessage = sentMessages.find((message) => message.id === id);

  if (!selectedMessage) {
    return <p>Loading...</p>;
  }

  return (
    <Card className={classes.card}>
      <Row>
        <Row>
          <Col xs="10">
            <h3>{selectedMessage.sub}</h3>
            <p>To:{selectedMessage.to}</p>
          </Col>
          <Col xs="2">
            <div style={{ display: "flex" }}>
              <PiPrinterDuotone className={classes.icon} />
              <p>
                {new Date(selectedMessage.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <FaStar className={classes.icon} />
            </div>
          </Col>
        </Row>
        <Row>
          <div>
            <p>{selectedMessage.description}</p>
          </div>
        </Row>
        <div className="align-items-center mt-2 mb-2 mx-auto">
          <Card
            style={{
              display: "flex",
              width: "120px",
              alignItems: "center",
              margin: "auto",
              borderRadius: "12px",
            }}
          >
            <div style={{ color: "gray" }}>
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

export default SentMessageDetail;
