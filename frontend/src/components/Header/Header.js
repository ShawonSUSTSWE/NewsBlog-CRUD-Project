import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,68,121,0.9923319669664741) 25%, rgba(66,173,221,1) 71%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">SUST NewsBlog</Typography>
        <Box display="flex" marginLeft="auto">
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Log In
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
            color="warning"
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
