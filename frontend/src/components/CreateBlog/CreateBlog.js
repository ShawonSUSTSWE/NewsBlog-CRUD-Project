import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const CreateBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(
        "http://localhost:5000/api/v1/news/",
        {
          title: inputs.title,
          category: inputs.category,
          content: inputs.content,
          image: inputs.image,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs/user"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,68,121,0.9923319669664741) 25%, rgba(66,173,221,1) 71%, rgba(0,212,255,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
          marginTop="20px"
          marginBottom={"20px"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Category
          </InputLabel>
          <TextField
            className={classes.font}
            name="category"
            value={inputs.category}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Post
          </InputLabel>
          <TextField
            className={classes.font}
            name="content"
            value={inputs.content}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <Button
            sx={{
              mt: 2,
              width: "20%",
              borderRadius: 4,
            }}
            variant="contained"
            type="submit"
          >
            Post
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateBlog;
