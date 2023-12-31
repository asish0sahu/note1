import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/modal/modal-components";
import {
  addNote,
  updateNote,
  deleteNote,
} from "./components/store/reducerOne/createNote";

const App = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.getNotes);
  const [showForm, setShowForm] = useState(false);
  const [notes1, setNotes1] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("notes==========", notes);
  useEffect(() => {
    setNotes1(notes);
  }, [dispatch, notes]);

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDF";
    let colors = "#";
    for (let i = 0; i < 6; i++) {
      colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
  };

  const addSitckyNote = () => {
    const newColor = getRandomColor();
    setNotes1([...notes1, newColor]);
  };

  const handleAddNote = (title, description) => {
    const newNote = {
      id: Date.now(),
      text: title,
      description: description,
      color: getRandomColor(),
    };
    dispatch(addNote(newNote));
    setShowForm(false);
  };

  const handleEditNote = (note, index) => {
    setSelectedNote(note, index);
    setShowForm(true);
  };

  const handleUpdateNote = (note, index) => {
    dispatch(updateNote(note, index));
    setSelectedNote(null);
    setShowForm(false);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes1(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setSelectedNote(null);
    // setNoteText("");
    setShowForm(false);
  };

  const handleClick = () => {
    setShowForm(true);
    addSitckyNote(true);
  };

  return (
    <div className="App">
      <h1>Sticky Notes App</h1>
      {showForm && (
        <div className="note-form">
          <button onClick={() => setIsModalOpen(true)}>
            {selectedNote ? "Update Note" : "Add Note"}
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddNote={handleAddNote}
            handleUpdateNote={handleUpdateNote}
            data={selectedNote}
          />
        </div>
      )}
      {!showForm && (
        <button onClick={handleClick} className="add-button">
          +
        </button>
      )}
      <div className="note-list">
        {notes?.map((note, index) => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            <span>{note.text}</span>
            <span>{note.description}</span>
            <div className="note-actions">
              <button onClick={() => handleEditNote(note, index)}>
                <FaEdit />
              </button>

              <button onClick={() => handleDeleteNote(note.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
