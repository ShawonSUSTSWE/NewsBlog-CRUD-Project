import React, { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import axios from "axios";

const UserBlogs = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/v1/news/mynews", {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    //console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog.newsID}
            isUser={true}
            title={blog.title}
            category={blog.category}
            content={blog.content}
            image={blog.image}
            name={blog.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
