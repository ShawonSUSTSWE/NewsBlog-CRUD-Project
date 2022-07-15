import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LogIn = () => {
  return (
    <div className="logIn">
      <form>
        <Box
          maxWidth="400px"
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
            Login{" "}
          </Typography>
          <TextField
            type={"email"}
            variant="filled"
            margin="normal"
            label="Email"
          />
          <TextField
            type={"password"}
            variant="filled"
            margin="normal"
            label="Password"
          />
          <br />
          <Box margin={1}>
            <Button
              sx={{ mr: 2 }}
              borderRadius="3"
              variant="contained"
              color="success"
            >
              Submit
            </Button>
            <Button borderRadius="3" variant="contained">
              Sign Up Now!!
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default LogIn;
