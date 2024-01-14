// Inbox.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inbox-slice";
import { Table, Form } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
const Inbox = () => {
  const inboxItem = useSelector((state) => state.inbox.inboxItem);

  const dispatch = useDispatch();

  const authEmail = useSelector((state) => state.auth.email);

  const receivedId = authEmail.replace(/[.@]/g, "");

  console.log(receivedId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://mail-box-a393b-default-rtdb.firebaseio.com//${receivedId}/RecieveEmail.json`
        );

        if (res.ok) {
          console.log("request sent successfulyy");
          const data = await res.json();
          console.log(data);
          if (data) {
            const items = Object.entries(data).map(([id, item]) => ({
              id,
              ...item,
            }));
            dispatch(inboxActions.addItems(items));
          }
        } else {
          console.log("Failed to fetch received emails");
        }
      } catch (error) {
        console.error("Error fetching received emails", error);
      }
    };

    fetchData();
  }, [receivedId, dispatch]);

  return (
    // <Card style={{ width: "800px" }} className="me-auto mt-3">
    <Table striped bordered={false} hover>
      {/* <thead>
          <tr>
          <th>From</th>
          <th>Subject</th>
          <th>Description</th>
          <th>Date</th>
          </tr>
        </thead> */}
      <tbody>
        {inboxItem.map((email, index) => (
          <tr key={index}>
            {/* <td>{email.from}</td> */}
            <td>
              <div style={{ display: "flex", alignItems: "center",  }}>
                <Form.Check type="checkbox" />
                <FaCircle style={{ color: "#0000ff" ,marginLeft: "10px"}} />
              </div>
            </td>
            <td> {email.sub}</td>
            <td>{email.description}</td>
            <td>{new Date(email.date).toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    // </Card>
  );
};

export default Inbox;
