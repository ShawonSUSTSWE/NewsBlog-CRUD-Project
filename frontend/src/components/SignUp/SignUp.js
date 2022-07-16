import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    dept: "",
    avatar: "",
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
      .post("http://localhost:5000/api/v1/users/", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        dept: inputs.dept,
        avatar: inputs.avatar,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="500px"
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
            Signup{" "}
          </Typography>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            type={"text"}
            variant="filled"
            margin="normal"
            placeholder="Name"
          />
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
          <TextField
            name="dept"
            onChange={handleChange}
            value={inputs.dept}
            type={"text"}
            variant="filled"
            margin="normal"
            placeholder="Department"
          />
          <TextField
            name="avatar"
            onChange={handleChange}
            value={inputs.avatar}
            type={"text"}
            variant="filled"
            margin="normal"
            placeholder="Avatar"
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
              to="/login"
              borderRadius="3"
              variant="contained"
            >
              Already Have An Account?
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;
