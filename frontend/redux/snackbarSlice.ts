import { createSlice } from "@reduxjs/toolkit"

export type SnackbarType = {
  isOpen: boolean
  text: string
}

const initialState: SnackbarType = {
  isOpen: false,
  text: "",
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
  },
})

export const { open, close } = snackbarSlice.actions

export default snackbarSlice.reducer
