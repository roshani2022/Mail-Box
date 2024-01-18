import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inbox-slice";
import { Table, Form } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Inbox = () => {
  const history = useHistory();
  const inboxItem = useSelector((state) => state.inbox.inboxItem);
  const dispatch = useDispatch();
  const authEmail = useSelector((state) => state.auth.email);
  const receivedId = authEmail.replace(/[.@]/g, "");

  useEffect(() => {
    dispatch(inboxActions.addItems([]));
  }, [receivedId, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://mail-box-a393b-default-rtdb.firebaseio.com//${receivedId}/RecieveEmail.json`
        );

        if (res.ok) {
          console.log("request sent successfully");
          const data = await res.json();
          console.log(data);

          if (data) {
            const items = Object.entries(data).map(([id, innerData]) => ({
              id,
              ...innerData,
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

  const openMessage = async (emailId) => {
    const email = inboxItem.find((item) => item.id === emailId);
    console.log(email);

    if (email && email.unRead) {
      const updatedItems = inboxItem.map((item) =>
        item.id === emailId ? { ...item, unRead: false } : item
      );

      dispatch(inboxActions.addItems(updatedItems));

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
          alert("Read msg request sent successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }

    history.replace(`/Message/inbox/${emailId}`);
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
        throw new Error("Failed to delete expense");
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
