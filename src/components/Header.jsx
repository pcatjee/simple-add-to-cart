import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { add, remove, removeOne } from "../actions/actions";

const Header = () => {
  const { cart } = useSelector((state) => state.updateCart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let price = 0;
    cart.map(
      (product) => (price = product.price * product.rating.count + price)
    );
    setTotal(price);
  };

  useEffect(() => {
    getTotal();
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Add to cart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100">
              <NavLink to="/" className="text-decoration-none text-white">
                Products
              </NavLink>
              <NavLink className="w-100 text-decoration-none text-white">
                <Badge
                  style={{ float: "right" }}
                  badgeContent={cart.length}
                  color="primary"
                >
                  <ShoppingCartIcon onClick={handleClick} />
                </Badge>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          {cart.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            <div style={{ width: "40rem" }}>
              <Table className="striped bordered hover">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Details</th>
                  </tr>
                </thead>
                {cart.map((product) => {
                  return (
                    <tbody>
                      <tr>
                        <td>
                          <img
                            style={{ width: "5rem", height: "5rem" }}
                            src={product.image}
                            alt=""
                          ></img>
                        </td>
                        <td>
                          <p>{product.title}</p>
                          <p>price: ${product.price}</p>
                          <p>rating: {product.rating.rate}</p>
                          <p>No of Products</p>
                          <div className="d-flex justify-content-between w-50">
                            <p
                              onClick={
                                product.rating.count === 1
                                  ? () => dispatch(remove(product))
                                  : () => dispatch(removeOne(product))
                              }
                            >
                              -
                            </p>
                            <p>x{product.rating.count}</p>
                            <p onClick={() => dispatch(add(product))}>+</p>
                          </div>
                        </td>
                        <td>
                          <DeleteIcon
                            onClick={() => dispatch(remove(product))}
                            style={{
                              fontSize: "2rem",
                              cursor: "pointer",
                              color: "red",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}

                <tfoot>
                  <tr>
                    <div className="text-center">
                      Total: ${total.toFixed(2)}
                    </div>
                  </tr>
                </tfoot>
              </Table>
            </div>
          )}
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
