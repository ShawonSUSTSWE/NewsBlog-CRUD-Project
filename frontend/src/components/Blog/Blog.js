import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../utils";

const Blog = ({ isUser, title, category, content, image, name, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleEdit = (e) => {
    navigate(`/blogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/v1/news/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = (e) => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  console.log(image);
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          mb: 3,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              color="warning"
              onClick={handleEdit}
              sx={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe"></Avatar>}
          title={title}
          subheader={name}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Image At SUST"
        />
        <CardContent>
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
