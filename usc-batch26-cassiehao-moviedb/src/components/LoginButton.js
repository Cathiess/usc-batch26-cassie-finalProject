import {
  Box,
  Typography,
  Link as MuiLink,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginButton = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
  };
  return user ? (
    <>
      <Box onClick={handleClick}>{user.username}</Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <MuiLink color="inherit" underline="none" to="/login" component={Link}>
      {"Login"}
    </MuiLink>
  );
};

export default LoginButton;
