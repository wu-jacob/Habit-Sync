import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// Component that displays all habits as images
export default function AllHabits({ user }) {
  const [allHabitsData, setAllHabits] = useState(null);

  useEffect(() => {
    fetch("/habits")
    .then((res) => res.json())
    .then((data) => setAllHabits(data))
    .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="center mt-3">
      {allHabitsData ? (
        allHabitsData.map((habit, index) => (
          <div
            className="center m-2"
            style={{ min_width: "30%", maxWidth: "400px" }}
            key={index}
          >
            <Card>
              <div className="d-flex align-items-center flex-column">
                <Card.Img
                  variant="top"
                  src={habit.photo.asset.url}
                  style={{ width: "100%" }}
                ></Card.Img>
              </div>
              <Card.Body>
                <Link to={"/profile/" + habit.display_name}>
                  <Card.Title>@{habit.display_name}</Card.Title>
                </Link>
                <Card.Text>{habit.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                {habit.created_at}
              </Card.Footer>
            </Card>
          </div>
        ))
      ) : (
        <p>No habits to display.</p>
      )}
    </div>
  );
}
