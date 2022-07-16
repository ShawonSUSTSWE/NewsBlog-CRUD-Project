import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../Blog/Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/v1/news/")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.data));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog.newsID}
            isUser={false}
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

export default Blogs;
