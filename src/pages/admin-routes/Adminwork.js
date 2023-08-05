import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";

const BASE_URL = "http://localhost:9090/api/v1";

const CreateCategory = () => {
  const [data, setData] = useState({
    categoryTitle: "",
    categoryDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Retrieve the user token from local storage
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.error("User token not found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/categories`,
        {
          categoryTitle: data.categoryTitle,
          categoryDescription: data.categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Category created:", response.data);
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category.");
    }
  };

  const resetData = () => {
    setData({
      categoryTitle: "",
      categoryDescription: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Create Category !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="categoryTitle">Enter Title</Label>
                    <Input
                      type="text"
                      placeholder="Enter Title"
                      id="categoryTitle"
                      onChange={handleChange}
                      value={data.categoryTitle}
                      name="categoryTitle"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="categoryDescription">Enter Description</Label>
                    <Input
                      type="text"
                      placeholder="Description"
                      id="categoryDescription"
                      onChange={handleChange}
                      value={data.categoryDescription}
                      name="categoryDescription"
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light" type="submit">
                      Create
                    </Button>
                    <Button
                      onClick={resetData}
                      color="secondary"
                      type="reset"
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default CreateCategory;
