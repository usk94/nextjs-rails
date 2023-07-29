import { SnackbarSeverity } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type SnackbarType = {
  isOpen: boolean
  severity: SnackbarSeverity
  text: string
}

const initialState: SnackbarType = {
  isOpen: false,
  severity: "info",
  text: "",
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ severity: SnackbarSeverity; text: string }>) => {
      state.isOpen = true
      state.severity = action.payload.severity
      state.text = action.payload.text
    },
    close: (state) => {
      state.isOpen = false
      state.severity = "info"
      state.text = ""
    },
  },
})

export const { open, close } = snackbarSlice.actions

export default snackbarSlice.reducer
