import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,68,121,0.9923319669664741) 25%, rgba(66,173,221,1) 71%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4" fontSize="25px">
          SUST NewsBlog
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginRight="auto" marginLeft="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                sx={{ fontSize: "15px" }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/:id"
                label="My Blogs"
                sx={{ fontSize: "15px" }}
              />
              {/* <Tab label = "My Blog" />
                <Tab label = "My Blog" /> */}
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <div>
              {" "}
              <Button
                variant="contained"
                LinkComponent={Link}
                to="/LogIn"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                LOGIN
              </Button>
              <Button
                variant="contained"
                LinkComponent={Link}
                to="/SignUp"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                SIGNUP
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <Button
              variant="contained"
              LinkComponent={Link}
              to="/"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              LOGOUT
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
