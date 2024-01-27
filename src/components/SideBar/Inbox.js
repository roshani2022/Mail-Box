import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inbox-slice";
import { Table, Form } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useFetch from "../hook/useFetch";

const Inbox = () => {
  const history = useHistory();
  const inboxItem = useSelector((state) => state.inbox.inboxItem);
  const dispatch = useDispatch();
  const authEmail = useSelector((state) => state.auth.email);
  const receivedId = authEmail.replace(/[.@]/g, "");
  let unreadMessagesCount = useSelector(
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

      dispatch(inboxActions.addItems(items));

      // const intervalId = setInterval(() => {
      //   dispatch(inboxActions.addItems(items));
      // }, 2000);

      // return () => clearInterval(intervalId);
    } else {
      alert("Failed to fetch recieve Email");
    }
  }, [data, dispatch, unreadMessagesCount]);


 
  
  const openMessage = async (emailId) => {
    dispatch(inboxActions.markRead(emailId));
    const email = inboxItem.find((item) => item.id === emailId);
    if (email && email.unRead) {
      try {
        const res = await fetch(
          `https://mail-box-a393b-default-rtdb.firebaseio.com//${receivedId}/RecieveEmail/${emailId}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...email,
              unRead: false,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (res.ok) {
          console.log("msg read successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
    history.replace(`/receive/${emailId}`);
  };

  const deleteMessage = async (emailId) => {
    dispatch(inboxActions.removeMessage(emailId));

    try {
      const res = await fetch(
        `https://mail-box-a393b-default-rtdb.firebaseio.com//${receivedId}/RecieveEmail/${emailId}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Email deleted successfully");
      } else {
        throw new Error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email", error);
    }
  };

  return (
    <Table striped bordered={false} hover>
      <tbody>
        {inboxItem.map((email, index) => (
          <tr key={index} style={{ cursor: "pointer" }}>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Check type="checkbox" />
                {email.unRead ? (
                  <FaCircle style={{ color: "#0000ff", marginLeft: "10px" }} />
                ) : null}
              </div>
            </td>
            <td> {email.sub}</td>
            <td onClick={() => openMessage(email.id)}>{email.description}</td>
            <td>
              {new Date(email.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td>
              {
                <MdDelete
                  onClick={() => deleteMessage(email.id)}
                  style={{ fontSize: "25px" }}
                />
              }
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Inbox;



