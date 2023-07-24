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
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      key={"top" + "center"}
    >
      <Alert onClose={() => dispatch(close())} severity="info" sx={{ width: "100%" }}>
        本を棚に積めました！
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
