import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store";
import { useStyles } from "../utils";

const Header = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
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
        <Typography className={classes.font} variant="h4" fontSize="25px">
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
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                sx={{ fontSize: "15px" }}
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/user"
                label="My Blogs"
                sx={{ fontSize: "15px" }}
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/create"
                label="Create a Blog"
                sx={{ fontSize: "15px" }}
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {isLoggedIn && (
            <Button
              onClick={() => {
                setValue(0);
                localStorage.setItem("token", "");
                dispatch(authActions.logout());
              }}
              variant="contained"
              LinkComponent={Link}
              to="/login"
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
