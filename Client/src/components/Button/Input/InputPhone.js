import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {Form} from "react-bootstrap";
import "./InputPhone.scss";

export default function InputPhone({name, value, setValue}) {
  return (
    <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
      <Form.Label className="fw-bold">No. Handphone</Form.Label>
      <PhoneInput
        className="input-phone"
        defaultCountry="ID"
        placeholder="Enter Phone Number"
        value={value}
        onChange={setValue}
        name={name}
      />
    </Form.Group>
  );
}
