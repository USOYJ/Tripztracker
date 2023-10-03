import { Row } from "react-bootstrap";
import VacayCard from "./VacayCard";
function Grid() {
  return (
    <div className="col-11 mx-auto">
      {/* //size and spacing of the cards row of two default based on bootstrap react */}

      <Row xs={1} md={1} className="g-4 mt-4">
        <h1 className="home-title">Tripztracker</h1>
        <VacayCard />
      </Row>
    </div>
  );
}
export default Grid;
