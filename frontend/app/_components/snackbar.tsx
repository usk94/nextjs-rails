"use client"

import { close } from "@/redux/snackbarSlice"
import { RootState } from "@/redux/store"
import { Alert, Snackbar as MuiSnackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

const Snackbar = () => {
  const snackbarState = useSelector((state: RootState) => state.snackbar)
  const dispatch = useDispatch()

  return (
    <MuiSnackbar
      open={snackbarState.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => dispatch(close())}
      key={"top" + "center"}
    >
      <Alert onClose={() => dispatch(close())} severity={snackbarState.severity} sx={{ width: "100%" }}>
        {snackbarState.text}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
