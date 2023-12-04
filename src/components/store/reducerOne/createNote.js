import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "getNotes",
  initialState: {
    notes: [],
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action) => {
      const { index, note } = action?.payload;
      state.notes[index] = note;
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
