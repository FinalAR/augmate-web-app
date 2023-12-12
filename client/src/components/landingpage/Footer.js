import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../../assets/images/logos/images/Logo-removebg-preview.png";
import navIcon1 from "../../assets/images/img/nav-icon1.svg";
import navIcon2 from "../../assets/images/img/nav-icon2.svg";
import navIcon3 from "../../assets/images/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* <MailchimpForm /> */}
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>Copyright 2023. All Rights Reserved</p>
          </Col>
          {/* <h5>UNLEASH YOUR IMAGINATION</h5> */}
        </Row>
      </Container>
    </footer>
  )
}
