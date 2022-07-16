import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogInfo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const id = useParams().blogid;
  console.log(id);
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/v1/news/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    //console.log(data);
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => setBlog(data.data));
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(
        `http://localhost:5000/api/v1/news/${id}`,
        {
          title: blog.title,
          category: blog.category,
          content: blog.content,
          image: blog.image,
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
    sendRequest()
      .then((data) => console.log(data))
      .then(navigate("/blogs/user"));
  };
  const handleChange = (e) => {
    setBlog((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(blog);
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
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="title"
            value={blog.title}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel sx={labelStyles}>Category</InputLabel>
          <TextField
            name="category"
            value={blog.category}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel sx={labelStyles}>Post</InputLabel>
          <TextField
            name="content"
            value={blog.content}
            onChange={handleChange}
            margin="auto"
            variant="filled"
          />
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField
            name="image"
            value={blog.image}
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

export default BlogInfo;
