//import { useEffect } from "react";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [passwordColor, setPasswordColor] = useState("");

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // handle change
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });
    if (property === "password") {
      if(data.password.length < 6) {
      setPasswordColor("red")
      } else {
        setPasswordColor("green")
      }
    }
  };

  //reseting the form
  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  //submit the form
  const submitForm = (event) => {
    event.preventDefault();

    // if(error.isError){
    //   toast.error("Form data is invalid , correct all details then submit. ");
    //   setError({...error,isError:false})
    //   return;
    // }

    console.log(data);
    //data validate

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        toast.success("User is registered successfully !! user id " + resp.id);
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");

//modify 2023-3-8-600pm
if (error?.response?.data?.message) {
  // If the error message is present, it means it's a duplicate entry error
  setError({
    errors: { response: { data: { email: error.response.data.message } } },
    isError: true,
  });
}else{
        //handle errors in proper way
        setError({
          errors: error,
          isError: true,
        });

      }
      });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          {/* { JSON.stringify(data) } */}

          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3> Fill Information to Register !!</h3>
              </CardHeader>

              <CardBody>
                {/* creating form */}

                <Form onSubmit={submitForm}>
                  {/* Name field */}
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter here"
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>

                  {/* email field */}
                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter here"
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>

                {/* password field */}
                <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      placeholder="Enter here"
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }

                      style={{
                        borderColor: passwordColor,
                          borderWidth: "3px",
                          borderStyle: "solid",
                        }}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>

                  {/* about field */}
                  <FormGroup>
                    <Label for="about">Write something about yourself</Label>
                    <Input
                      type="textarea"
                      placeholder="Enter here"
                      id="about"
                      style={{ height: "250px" }}
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>

                  <Container className="text-center">
                    <Button outline color="light">
                      Register
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

export default Signup;
