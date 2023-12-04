import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./reducerOne/createNote";

const store = configureStore({
  reducer: {
    getNotes: noteSlice,
  },
});

export default store;
