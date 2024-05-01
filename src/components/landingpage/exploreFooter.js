import { Container, Row, Col } from "react-bootstrap";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../../assets/images/logos/images/Logo-removebg-preview.png";


export const exploreFooter = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-right">
          {/* <Col size={12} sm={6}> */}
            <img src={logo} alt="Logo" />
          {/* </Col> */}
        </Row>
      </Container>
    </footer>
  )
}
