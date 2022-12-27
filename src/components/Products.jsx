import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { add } from "../actions/actions";

const Products = () => {
  //   const cart = useSelector((state) => state.updateCart);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    setData(response);
  };

  const send = (list) => {
    dispatch(add(list));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="ms-5 mt-5 row d-flex gap-5">
        {data &&
          data.map((list) => (
            <Card style={{ width: "15rem", height: "fit-content" }}>
              <Card.Img
                style={{ width: "10rem", height: "10rem" }}
                variant="top"
                src={list.image}
              />
              <ListGroup variant="flush">
                <ListGroup.Item>{list.title}</ListGroup.Item>
                <ListGroup.Item>Price- ${list.price}</ListGroup.Item>
                <ListGroup.Item>Rating {list.rating.rate}</ListGroup.Item>
              </ListGroup>
              <Button
                className="mb-0"
                variant="primary"
                onClick={() => send(list)}
              >
                Add to cart
              </Button>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Products;
