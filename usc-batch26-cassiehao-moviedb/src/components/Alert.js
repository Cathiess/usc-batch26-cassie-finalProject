import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const SuccessAlert = ({ openSnakeBar, setOpenSnakeBar, title }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakeBar(false);
  };
  return (
    <Snackbar
      style={{ backgroundColor: "green" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={openSnakeBar}
      onClose={handleClose}
      key={"success alert"}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success"
      >
        {title}
      </MuiAlert>
    </Snackbar>
  );
};

export default SuccessAlert;
