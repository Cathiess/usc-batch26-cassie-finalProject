import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  Toolbar,
  AppBar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  navItem: {
    marginLeft: "3rem"
  }
}));

const Header = ({ loginButton }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box width="100px" p={1} mr={3}>
          <img src={logo} alt={"logo"} />
        </Box>
        <Box className={classes.title} display="flex">
          <Box mr={5}>
            <Typography variant="h5">
              <MuiLink color="inherit" underline="none" to="/" component={Link}>
                HOME
              </MuiLink>
            </Typography>
          </Box>
          <Box mr={5}>
            <Typography variant="h5">
              <MuiLink
                color="inherit"
                underline="none"
                to="/favorite"
                component={Link}
              >
                FAVORITE
              </MuiLink>
            </Typography>
          </Box>
          <Typography variant="h5">
            <MuiLink
              color="inherit"
              underline="none"
              to="/rated"
              component={Link}
            >
              RATED
            </MuiLink>
          </Typography>
        </Box>
        <Typography variant="h6">{loginButton}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
