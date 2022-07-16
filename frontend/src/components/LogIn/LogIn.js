import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => localStorage.setItem("token", "Bearer " + data.token))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/v1/users/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  return (
    <div className="logIn">
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="400px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3}>
            {" "}
            Login{" "}
          </Typography>
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            variant="filled"
            margin="normal"
            placeholder="Email"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            variant="filled"
            margin="normal"
            placeholder="Password"
          />
          <br />
          <Box margin={1}>
            <Button
              type="submit"
              sx={{ mr: 2 }}
              borderRadius="3"
              variant="contained"
              color="success"
            >
              Submit
            </Button>
            <Button
              LinkComponent={Link}
              to="/signup"
              borderRadius="3"
              variant="contained"
            >
              Sign Up Now!!
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default LogIn;
