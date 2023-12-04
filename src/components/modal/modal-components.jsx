import React, { useEffect, useState } from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, onAddNote, data }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");

  const handleAddNote = () => {
    onAddNote(noteTitle, noteDescription);
    onClose();
  };

  useEffect(() => {
    setNoteTitle(data?.text);
    setNoteDescription(data?.description);
  }, [data]);
  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="popup-container">
          <form action="#">
            <h1 className="header">{data ? "Update Note" : "Add a Note"}</h1>
            <label htmlFor="noteTitle" className="title">
              Title
            </label>
            <input
              type="text"
              id="noteTitle"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Enter note here"
              className="input-box"
            />
            <label htmlFor="noteDescription" className="title">
              Description
            </label>
            <textarea
              id="noteDescription"
              value={noteDescription}
              onChange={(e) => setNoteDescription(e.target.value)}
              placeholder="Enter note description"
              className="input-box"
            ></textarea>
            <button onClick={handleAddNote} className="btn1">
              {data ? "Update Note" : "Add Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
