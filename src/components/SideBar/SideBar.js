import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideBar = () => {
 return(
    <Container className="d-flex flex-coloumn">
        <ul className="">
            <li>
            <Link to = "/Inbox"> Inbox </Link>
            <Link to = "/SentMail"> SentMail</Link>
              
            </li>
            
        </ul>
       

    </Container>
 )
}

export default SideBar