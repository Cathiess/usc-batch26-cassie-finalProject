import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField
} from "@material-ui/core";
import { useState } from "react";
import useUser from "../hooks/useUser";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const { login } = useUser();
  const history = useHistory();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    if (!values.username) {
      setErrors({
        ...errors,
        username: true
      });
      return false;
    }
    if (!values.password) {
      setErrors({
        ...errors,
        password: true
      });
      return false;
    }
    return true;
  };

  const handleSummit = (e) => {
    e.preventDefault();
    setErrors({});
    setHasError(false);
    const isValid = validate();
    if (isValid) {
      login(values.username, values.password)
        .then(() => {
          history.push("/");
        })
        .catch((e) => {
          setHasError(true);
        });
    }
  };

  return (
    <Box m="auto" width="500px" pt={5}>
      <form onSubmit={handleSummit}>
        <Typography variant="h3" align="center">
          Login
        </Typography>
        {hasError && (
          <Typography color="secondary" align="center">
            Failed to login
          </Typography>
        )}
        <Box mb={3}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={values.username || ""}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username && "Username is required"}
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.username && "password is required"}
          />
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        )}
      </form>
    </Box>
  );
};

export default LoginPage;
