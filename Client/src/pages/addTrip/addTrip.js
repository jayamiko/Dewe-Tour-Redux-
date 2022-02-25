// Import React
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CurrencyFormat from "react-currency-format";

// Import Components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {Spinner} from "../../components/atoms/Spinner/Spinner";

// Import Style
import "./addTrip.scss";
import {Form, Button} from "react-bootstrap";
import Attach from "../../img/attach.png";

// Import API
import {API_Country} from "../../config/api";
import {addTrip} from "../../actions/TripsActions";

const AddTripPage = ({addTrip}) => {
  let navigate = useNavigate();
  const [preview, setPreview] = useState([]);
  const [countries, setCountries] = useState([]);

  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSkeleton(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [input, setInput] = useState({
    title: "",
    country: "Indonesia",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "1",
    night: "0",
    dateTrip: "",
    price: "",
    quota: "1",
    description: "",
    image: [],
  });

  const handleChange = (event) => {
    const {
      title,
      country,
      accomodation,
      transportation,
      eat,
      day,
      night,
      dateTrip,
      price,
      quota,
      description,
      image,
    } = input;
    const updateForm = {...input};
    updateForm[event.target.name] =
      event.target.type === "file" ? event.target.files : event.target.value;
    setInput(updateForm);

    if (event.target.name === "image") {
      const target = event.target.files;
      const formArr = Array.from(target).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview((item) => item.concat(formArr));
    }
  };

  const konvertPricetoNumber = (number) => {
    let splitPrice = number.split("Rp. ").toString();
    let removeComma = splitPrice.replace(/[^\w\s]/gi, ""); //Hapus Koma dalam String
    return parseInt(removeComma);
  };

  let priceResult = konvertPricetoNumber(input.price);

  const restCountries = async () => {
    try {
      const response = await API_Country.get("/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    restCountries();
  }, []);

  const redirect = () => {
    navigate(`/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTrip(input, redirect, priceResult);
  };

  return loadingSkeleton ? (
    <div>
      <Spinner customText={"Loading.."} />
    </div>
  ) : (
    <div>
      <Navbar />
      <div className="area-add-form">
        <Form className="form-add-trip">
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Title Trip</b>
            </Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Country</b>
            </Form.Label>
            <Form.Control
              className="input-field"
              as="select"
              onChange={handleChange}
              name="country"
              placeholder="Selection Countries"
            >
              {countries.map((item) => (
                <option value={item.name.common}>{item.name.common}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Accomodation</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input-field"
              name="accomodation"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Transportation</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input-field"
              name="transportation"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Eat</b>
            </Form.Label>
            <Form.Control
              type="text"
              className="input-field"
              name="eat"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Label>
            <b>Duration</b>
          </Form.Label>
          <div className="d-flex ">
            <div>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  className="input-field"
                  name="day"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div>
              <p className="mx-2" style={{marginTop: "5px", marginLeft: "5px"}}>
                <b>Day</b>
              </p>
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  className="input-field"
                  name="night"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div>
              <p className="ml-2" style={{marginTop: "5px", marginLeft: "5px"}}>
                <b>Night</b>
              </p>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Date Trip</b>
            </Form.Label>
            <Form.Control
              type="date"
              className="input-field"
              name="dateTrip"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Price</b>
            </Form.Label>
            <div>
              <CurrencyFormat
                thousandSeparator={true}
                prefix={"Rp. "}
                className="input-field-price"
                name="price"
                onChange={handleChange}
                value={input.price}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Quota</b>
            </Form.Label>
            <Form.Control
              type="number"
              className="input-field"
              name="quota"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <b>Description</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="input-field"
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Label>
            <b>Image</b>
          </Form.Label>
          <Form.Group controlId="formFile" className="mb-3">
            <label className="ml-3">
              {preview &&
                preview.map((item) => (
                  <img
                    style={{
                      width: "220px",
                      height: "150px",
                      marginTop: "20px",
                      marginBottom: "30px",
                      marginRight: "10px",
                    }}
                    src={item}
                    alt="receipt"
                  />
                ))}
              <div className="container-image rounded">
                <div>
                  <p style={{fontSize: "15px"}}>
                    <b>Attach Here</b>
                  </p>
                </div>

                <div>
                  <img
                    src={Attach}
                    className="image-style"
                    fluid
                    alt="attach file"
                  />
                </div>
              </div>

              <input
                type="file"
                hidden
                name="image"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.svg"
                required
                multiple
              />
            </label>
          </Form.Group>
        </Form>
        <Button
          variant="warning"
          className="button-style"
          onClick={handleSubmit}
        >
          <b>Add Trip</b>
        </Button>
      </div>
      <Footer />
    </div>
  );
};

AddTripPage.propTypes = {
  addTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.trips,
});

export default connect(mapStateToProps, {addTrip})(AddTripPage);
