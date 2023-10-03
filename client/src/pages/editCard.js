import "../App.css";
import "../index.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_THOUGHT } from "../utils/mutations";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function FormSubmit() {
  const [location, setLocation] = useState("");
  const [departure, setDeparture] = useState("");
  const { thoughtId } = useParams();
  const [edit, { error }] = useMutation(UPDATE_THOUGHT);
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await edit({
        variables: {
          thoughtId: thoughtId,
          location: location,
          departure: departure,
        },
      });
      console.log(data);
      alert("Edit Successful");
      <Navigate to="/" />;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form className="col-8 mx-auto m-4" onSubmit={handleEdit}>
      <h1 className="home-title">Edit MyTrip</h1>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>
          <h2>Destination:</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="Name"
          placeholder="Update Destination"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="lg"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <h2>Date:</h2>
        </Form.Label>
        <Form.Control
          className="input-field"
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          size="lg"
        />
        <Form.Text className="text-muted mx-auto">Previous Date: </Form.Text>
      </Form.Group>
      <Button
        className="button mb-3"
        variant="primary"
        type="submit"
        size="lg"
        style={{ width: "100%" }}
      >
        Update
      </Button>
    </Form>
  );
}

export default FormSubmit;
