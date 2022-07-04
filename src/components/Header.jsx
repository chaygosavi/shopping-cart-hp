import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Badge, Table } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { DELETE } from "../redux/actions/action";

const Header = () => {
  const getData = useSelector((state) => state.cartReducer.cart);
  // console.log(getData);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteItem = (id) => {
    dispatch(DELETE(id));
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
      <Container>
        <NavLink className="text-light text-decoration-none mx-3" to="/">
          Add to Cart
        </NavLink>

        <Nav className="me-auto">
          <NavLink className="text-light text-decoration-none" to="/">
            Home
          </NavLink>
        </Nav>
        <Badge
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          badgeContent={getData.length || "0"}
          color="primary"
        >
          <i
            class="fa-solid fa-cart-shopping text-light"
            style={{ fontSize: 25, cursor: "pointer" }}
          ></i>
        </Badge>
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {getData.length ? (
          <div
            className="card_details"
            style={{
              width: "24rem",
              padding: 10,
            }}
          >
            <Table>
              <thead style={{ borderBottom: "2px solid" }}>
                <tr>
                  <th>Photo</th>
                  <th>Rstaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((data) => (
                  <tr>
                    <td>
                      <NavLink to={`/cart/${data.id}`} onClick={handleClose}>
                        <img
                          src={data.imgdata}
                          style={{ width: "5rem", height: "5rem" }}
                          alt=""
                        />
                      </NavLink>
                    </td>
                    <td>
                      <p>{data.rname}</p>
                      <p>Price: ₹{data.price}</p>
                      <p>Quantity: {data.qnty}</p>
                      <p
                        onClick={() => deleteItem(data.id)}
                        style={{
                          color: "red",
                          cursor: "pointer",
                          fontSize: 20,
                        }}
                      >
                        <i className="fas fa-trash smalltrash"></i>
                      </p>
                    </td>
                    <td
                      onClick={() => deleteItem(data.id)}
                      className="mt-5"
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: 20,
                      }}
                    >
                      <i className="fas fa-trash largetrash"></i>
                    </td>
                  </tr>
                ))}
                <p className="text-center">
                  Total : ₹
                  {getData.reduce((total, data) => {
                    return total + data.price * data.qnty;
                  }, 0)}
                </p>
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="card_details">
            <i
              className="fas fa-close smallclose"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 2,
                right: 20,
                fontSize: 23,
                cursor: "pointer",
              }}
            ></i>
            <p className="mx-3 my-3" style={{ fontSize: 22 }}>
              Your cart is empty
            </p>
          </div>
        )}
      </Menu>
    </Navbar>
  );
};

export default Header;
