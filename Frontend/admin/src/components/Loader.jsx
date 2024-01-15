import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Loader({ openState, message }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openState}
      >
        <div style={{ textAlign: "center" }}>
          <CircularProgress color="inherit" sx={{ fontWeight: "bold" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {message}
          </Typography>
        </div>
      </Backdrop>
    </div>
  );
}
