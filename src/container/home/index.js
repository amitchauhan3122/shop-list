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
    setAreaSearchTest,
    setCategorySearchTest,
    setOpeningDateSearch,
    setShopNameText,
    setSearch
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
  const [openingDate, setOpeningDate] = useState(moment().format("YYYY-MM-DD"));

  const handleClose = () => {
    setShow(false);
    reset({});
  };
  const shop = useSelector((state) => state?.shop?.shop?.shop);
  const { singleShop } = useSelector((state) => state?.singleShop);
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
              <Col md="12" className="text-center">
                <h1 className="">Shop List</h1>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="2" className="text-right">
                <Button onClick={() => setShopList(false)}>Add Shop</Button>
              </Col>
              <Col md="" className="text-center">
                {/* <h1 className="">Shop List</h1> */}
              </Col>
              <Col md="2" className="text-center">
                <select
                  className="form-control"
                  onChange={e => setSearch({ area: e.target.value })}
                  style={{ background: '#e9ecef' }}
                >
                  <option value="">Select Area</option>
                  <option value="Thane">Thane</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai Suburban">Mumbai Suburban</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Ahmednagar">Ahmednagar</option>
                  <option value="Solapur">Solapur</option>
                </select>
              </Col>
              <Col md="2" className="text-center">
                <select
                  className="form-control"
                  onChange={e => setSearch({ category: e.target.value })}
                  style={{ background: '#e9ecef' }}
                >
                  <option value="">Select Category</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Butcher">Butcher</option>
                  <option value="Baker">Baker</option>
                  <option value="Chemist">Chemist</option>
                  <option value="Stationery shop">Stationery shop</option>
                </select>
              </Col>
              <Col md="1" className="text-center">
                <input
                  type="date"
                  className="form-control"
                  onChange={e => {
                    setSearch({ opening_date: e.target.value })
                  }}
                  required
                />
              </Col>
              <Col md="1" className="text-center">
                {/* <span>*closing date*</span> */}
                <input
                  type="date"
                  className="form-control"
                  onChange={e => {
                    setSearch({ closing_date: e.target.value })
                  }}
                  required
                />
              </Col>
              <Col md="2" className="text-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  onChange={e => {
                    setSearch({ name: e.target.value })
                  }}
                />
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
                        <td>{moment(shop?.opening_date).format("YYYY-MM-DD")}</td>
                        <td>{moment(shop?.closing_date).format("YYYY-MM-DD")}</td>
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
              <Col md="10" className="text-center">
                <h1 className="">Add a Shop In List</h1>
              </Col>
              <Col md="2" className="text-center">
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
                      {...register("name", { required: true, pattern: /[A-Za-z]/ })}
                    />
                    {errors.name && errors.name.type === "required" && <span className="error">This is required</span>}
                    {errors.name && errors.name.type === "pattern" && <span className="error">Shop name can contain only letters</span>}
                  </div>
                  <div className="mb-3">
                    <label for="area">Shop Area</label>
                    <select
                      className="form-control"
                      {...register("area", { required: true })}>
                      <option value="">Select</option>
                      <option value="Thane">Thane</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Ahmednagar">Ahmednagar</option>
                      <option value="Solapur">Solapur</option>
                    </select>
                    {errors.area && errors.area.type === "required" && <span className="error">This is required</span>}

                  </div>
                  <div className="mb-3">
                    <label for="categories">Shop Categories</label>
                    <select
                      className="form-control"
                      {...register("category", { required: true })}>
                      <option value="">Select</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Butcher">Butcher</option>
                      <option value="Baker">Baker</option>
                      <option value="Chemist">Chemist</option>
                      <option value="Stationery shop">Stationery shop</option>
                    </select>
                    {errors.category && errors.category.type === "required" && <span className="error">This is required</span>}

                  </div>
                  <div className="mb-3">
                    <label for="categories">Opening Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={e => {
                        setValue('opening_date', e.target.value)
                        setOpeningDate(e.target.value)
                      }}
                      required
                    // {...register("opening_date", { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Closing Date</label>
                    <input
                      type="date"
                      className="form-control"
                      min={moment(openingDate).format("YYYY-MM-DD")}
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("closing_date", { required: true })}
                    />
                    {errors.closing_date && errors.closing_date.type === "required" && <span className="error">This is required</span>}
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
                      {...register("name", { required: true, pattern: /[A-Za-z]/ })}
                    />
                    {errors.name && errors.name.type === "required" && <span className="error">This is required</span>}
                    {errors.name && errors.name.type === "pattern" && <span className="error">Shop name can contain only letters</span>}
                  </div>
                  <div className="mb-3">
                    <label for="area">Shop Area</label>
                    <select
                      className="form-control"
                      {...register("area", { required: true })}>
                      <option value="">Select</option>
                      <option value="Thane">Thane</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Ahmednagar">Ahmednagar</option>
                      <option value="Solapur">Solapur</option>
                    </select>
                    {errors.area && errors.area.type === "required" && <span className="error">This is required</span>}
                  </div>
                  <div className="mb-3">
                    <label for="categories">Shop Categories</label>
                    <select
                      className="form-control"
                      {...register("category", { required: true })}>
                      <option value="">Select</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Butcher">Butcher</option>
                      <option value="Baker">Baker</option>
                      <option value="Chemist">Chemist</option>
                      <option value="Stationery shop">Stationery shop</option>
                    </select>
                    {errors.category && errors.category.type === "required" && <span className="error">This is required</span>}
                  </div>
                  <div className="mb-3">
                    <label for="categories">Opening Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Enter Shop Categories"
                      name="area"
                      defaultValue={moment(singleShop?.opening_date).format("YYYY-MM-DD")}
                      min={moment().format("YYYY-MM-DD")}
                      onChange={e => {
                        setValue('opening_date', e.target.value)
                        setOpeningDate(e.target.value)
                      }}
                      required
                    // {...register("opening_date", { required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="categories">Closing Date</label>
                    <input
                      type="date"
                      className="form-control"
                      min={moment(openingDate).format("YYYY-MM-DD")}
                      placeholder="Enter Shop Categories"
                      name="area"
                      {...register("closing_date", { required: true })}
                    />
                    {errors.closing_date && errors.closing_date.type === "required" && <span className="error">This is required</span>}
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
