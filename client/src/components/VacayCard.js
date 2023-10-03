import { Col, Card, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_THOUGHT } from "../utils/mutations";

function VacayCard() {
  
  const { data } = useQuery(ME);
  const user = data?.me || {};
  const [delet, { error }] = useMutation(REMOVE_THOUGHT);
  const handleDelete = async (ids) => {
    try {
      const { data } = await delet({
        variables: { thoughtId: ids },
      });
      console.log(data);
      window.location.reload(false);
    } catch (e) {
      console.error(e);
    }
  };

  return user.thoughts?.map((items) => (
    <div key={items._id}>
      <Col className="mx-auto m-3">
        <Card className="mx-auto col-5 card">
          <Card.Body>
            <Card.Title className="card-text">{items.location}</Card.Title>
            <Card.Text className="card-text">{items.departure}</Card.Text>
            <Button
              href={`/editCard/${items._id}`}
              className="m-1"
              style={{ width: "17%" }}
              variant="primary"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(items._id)}
              className="m-1"
              variant="danger"
              style={{ width: "17%" }}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  ));
}

export default VacayCard;
