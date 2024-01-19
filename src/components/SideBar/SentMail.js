import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { sentActions } from "../../store/sent-slice";
import useFetch from "../hook/useFetch";

const SentMail = () => {
  const history = useHistory();
  const sentItem = useSelector((state) => state.sent.sentItem);
  const dispatch = useDispatch();
  const authEmail = useSelector((state) => state.auth.email);
  const sendId = authEmail.replace(/[.@]/g, "");
  

  useEffect(() => {
    dispatch(sentActions.addItems([]));
  }, [sendId, dispatch]);

  const { data } = useFetch(
    `https://mail-box-a393b-default-rtdb.firebaseio.com//${sendId}/SenDEmail.json`
  );

  useEffect(() => {
    if (data) {
      const items = Object.entries(data).map(([id, innerData]) => ({
        id,
        ...innerData,
      }));

      dispatch(sentActions.addItems(items));
    } else {
      alert("Failed to fetch sent Email");
    }
  }, [data, dispatch]);

  const openMessage = async (emailId) => {
    history.replace(`/Message/:folder/${emailId}`);
  };

  const deleteMessage = async (emailId) => {
    dispatch(sentActions.removeMessage(emailId));

    try {
      const res = await fetch(
        `https://mail-box-a393b-default-rtdb.firebaseio.com//${sendId}/SenDEmail/${emailId}.json`,
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
        {sentItem.map((email, index) => (
          <tr key={index} style={{ cursor: "pointer" }}>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Check type="checkbox" />
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

export default SentMail;
