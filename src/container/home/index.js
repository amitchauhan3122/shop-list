import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Table, Modal } from "react-bootstrap";
import useShop from "./hook";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";

export const Home = () => {
  const {
    showShopList,
    setShopList,
    handleAction,
    handleAddShop,
    handleUpdateShop,
  } = useShop();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleAddShop(data);
  };
  const onUpdate = (data) => {
    handleUpdateShop(data);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    reset({});
  };
  console.log(show, getValues(), "ssssssssssssssssssssdfghjhgfre");
  const shop = useSelector((state) => state?.shop?.shop?.shop);
  const { singleShop } = useSelector((state) => state?.singleShop);
  console.log(singleShop, "singleShopiiiiiiiiii");
  useEffect(() => {
    singleShop?.id
      ? reset({
          ...singleShop,
          opening_date: moment(singleShop?.opening_date).format("YYYY-MM-DD"),
          closing_date: moment(singleShop?.closing_date).format("YYYY-MM-DD"),
        })
      : handleClose();
  }, [singleShop]);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <Container>
        {showShopList ? (
          <>
            <Row className="mt-5">
              <Col md="6" className="text-center">
                <h1 className="">Shop List</h1>
              </Col>
              <Col md="6" className="text-center">
                <Button onClick={() => setShopList(false)}>Add Shop</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Shop Name</th>
                      <th>Shop Area</th>
                      <th>Shop Category</th>
                      <th>Opening Date</th>
                      <th>Closing Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shop?.map((shop, index) => (
                      <tr>
                        <td>{index + 1 + "."}</td>
                        <td>{shop?.name}</td>
                        <td>{shop?.area}</td>
                        <td>{shop?.category}</td>
                        <td>{new Date(shop?.opening_date).toUTCString()}</td>
                        <td>{new Date(shop?.closing_date).toUTCString()}</td>
                        <td>
                          <Button
                            onClick={() => {
                              handleShow();
                              handleAction(shop?.id, "edit");
                            }}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <Button
                            onClick={() => handleAction(shop?.id, "delete")}
                            style={{
                              backgroundColor: "red",
                              borderColor: "red",
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="mt-5">
              <Col md="6" className="text-center">
                <h1 className="">Add a Shop In List</h1>
              </Col>
              <Col md="6" className="text-center">
                <Button onClick={() => setShopList(true)}>Shop List</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3 mt-3">
                    <label for="name">Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter shop name"
                      name="name"
                      {...register("name")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="area">Shop Area</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      placeholder="Enter Area"
                      name="area"
                      {...register("area")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Shop Categories</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("category")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Opening Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("opening_date")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Closing Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("closing_date")}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </Col>
            </Row>
          </>
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Shop {singleShop?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <form onSubmit={handleSubmit(onUpdate)}>
                  <div className="mb-3 mt-3">
                    <label for="name">Shop Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter shop name"
                      name="name"
                      {...register("name")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="area">Shop Area</label>
                    <input
                      type="text"
                      className="form-control"
                      id="area"
                      placeholder="Enter Area"
                      name="area"
                      {...register("area")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Shop Categories</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("category")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Opening Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("opening_date")}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Closing Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("closing_date")}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mr-5">
                    Submit
                  </button>

                  <button
                    onClick={handleClose}
                    type="button"
                    className="btn btn-info ml-5"
                  >
                    Cancel
                  </button>
                </form>
              </Col>
            </Row>{" "}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </Container>
    </>
  );
};
