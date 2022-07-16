import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import BlogInfo from "./components/BlogInfo/BlogInfo";
import Blogs from "./components/Blogs/Blogs";
import UserBlogs from "./components/UserBlogs/UserBlogs";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/create" element={<CreateBlog />} />
              <Route path="/blogs/user" element={<UserBlogs />} />
              <Route path="/blogs/:blogid" element={<BlogInfo />} />
            </>
          )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
