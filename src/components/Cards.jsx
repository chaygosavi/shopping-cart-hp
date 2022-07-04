import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import Cardsdata from "../CardsData";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

function Cards() {
  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();

  const send = (cardData) => {
    dispatch(ADD(cardData))
  };
  return (
    <div className="container mt-3">
      <h2 className="text-center">Products</h2>
      <div className="row d-flex justify-content-center align-items">
        {data.map((cardData) => (
          <Card
            className="mx-2 mt-4 card_style"
            key={cardData.id}
            style={{ width: "22rem", border: "none" }}
          >
            <Card.Img
              className="mt-3"
              variant="top"
              src={cardData.imgdata}
              style={{ height: "14.4rem" }}
            />
            <Card.Body>
              <Card.Title>{cardData.rname}</Card.Title>
              <Card.Text>Price: ₹{cardData.price}</Card.Text>
              <div className="button_div d-flex justify-content-center">
                <Button
                  onClick={() => send(cardData)}
                  variant="primary"
                  className="col-lg-12"
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Cards;
