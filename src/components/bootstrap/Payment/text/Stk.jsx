import React, { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

// const Stk = () => {
//   const [show, setShow] = useState("stk");

//   return (
//     <Container className="bs">
//       <Card className="mpesa-card p-4">
//         {/* {show === "stk" ? (
//           <>
//             <Card.Title className="mb-4 mpesa-card-title">
//               STK Push Payment
//             </Card.Title>
//             <p>
//               Please use the STK push option on your mobile device to complete
//               the payment.
//             </p>
//             <p>Follow the instructions on your phone to proceed.</p>
//           </>
//         ) : show === "mpesa" ? (
//           <>
//             <Card.Title className="mb-4 mpesa-card-title">
//               Follow the Steps Below. Once you receive a successful reply from
//               Mpesa, click the complete button below.
//             </Card.Title>
//             <ul className="mpesa-steps-1 mb-4">
//               <li>Go to M-PESA on your phone</li>
//               <li>
//                 Select <strong>Pay Bill</strong> option
//               </li>
//               <li>
//                 Enter Business Number: <strong>222222</strong>
//               </li>
//               <li>
//                 Enter Account Number: <strong>CUST001</strong>
//               </li>
//               <li>
//                 Enter the Amount: <strong>KES 250,000</strong>
//               </li>
//               <li>
//                 Enter your M-PESA PIN and press <strong>Send</strong>
//               </li>
//               <li>
//                 You will receive a confirmation SMS from <strong>MPESA</strong>
//               </li>
//             </ul>
//           </>
//         ) : null} */}

//         <Card.Title className="mb-4 mpesa-card-title">
//           STK Push Payment adasdasdsadsa
//         </Card.Title>
//         <p>
//           Please use the STK push option on your mobile device to complete the
//           payment.
//         </p>
//         <p>Follow the instructions on your phone to proceed.</p>

//         {/* <Row className="mpesa-steps-1-footer mt-4">
//           <Col xs={12} md="auto" className="mb-2">
//             <Button className="custom-complete-button">Complete</Button>
//           </Col>
//           {show === "stk" && (
//             <Col xs={12} md="auto">
//               <span
//                 className="link"
//                 onClick={() => setShow("mpesa")}
//                 role="button"
//               >
//                 Back to MPESA Instructions
//               </span>
//             </Col>
//           )}
//         </Row> */}
//       </Card>
//     </Container>
//   );
// };
const Stk = () => {
  // const [show, setShow] = useState("stk");

  return (
    <Container className="bs ">
      <Card.Title className="mb-4 mpesa-card-title">
        Follow the Steps Below. Once you receive a successful reply from Mpesa,
        click the complete button below.
      </Card.Title>
      <ListGroup as="ul" className="mpesa-steps-1 mb-4">
        <ListGroup.Item as="li">
          Enter your Safaricom Mobile Phone Number to pay with below and click{" "}
          <strong>Pay</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          When prompted, enter your <strong>MPESA PIN</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Click <strong>'Complete'</strong> Button once you receive MPESA
          confirmation
        </ListGroup.Item>
      </ListGroup>
      <Form className="mb-4 w-100">
        <Form.Group controlId="formPhoneNumber" className="w-100">
          <InputGroup className="w-100 h">
            <Form.Control
              type="tel"
              placeholder="e.g. 254712345678"
              aria-label="Phone number"
              className="w-100 border border-white  p-2"
            />
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Stk;
