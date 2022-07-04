import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DELETE, ADD, REMOVE } from "../redux/actions/action";

import "./style.css";

const CardDetails = () => {
  const [data, setData] = useState([]);
  console.log("data => ", data);
  const getData = useSelector((state) => state.cartReducer.cart);
  const { id } = useParams();

  const dispatch = useDispatch();

  const compare = () => {
    let compareData = getData.filter((data) => data.id == id);
    setData(compareData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <div className="container mt-2">
      <h2 className="text-center">Item Detail Page</h2>
      <section className="container mt-3">
        <div className="iteamsdetails">
          {data
            ? data?.map((item) => (
                <>
                  <div className="items_img">
                    <img src={item.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {item.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹ {item.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {item.address}
                          </p>
                          <p>
                            <strong>Total</strong> : ₹ {item.price * item.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-around align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                item.qnty <= 1
                                  ? () => {
                                      dispatch(DELETE(item.id));
                                      navigate("/");
                                    }
                                  : () => {
                                      dispatch(REMOVE(item));
                                    }
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{item.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => dispatch(ADD(item))}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong>{" "}
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {item.rating} ★{" "}
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>{" "}
                            <span>{item.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove :</strong>
                            <span>
                              <i
                                className="fas fa-trash"
                                onClick={() => {
                                  dispatch(DELETE(item.id));
                                  navigate("/");
                                }}
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                              ></i>{" "}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              ))
            : "NO ITEM TO SHOW"}
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
