import React, { useState, useEffect } from 'react';
import { createNote, getNotes, updateNote, deleteNote } from '../services/api';

export default function Notes() {
  const [note, setNote] = useState({ title: '', content: '' });
  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteData, setEditingNoteData] = useState({ title: '', content: '' });

  // Handle form input changes
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

 // Submit new note (with error handling)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createNote(note);
    setNote({ title: '', content: '' });
    fetchNotes(); // Refresh
  } catch (err) {
    console.error('Error creating note:', err.message);
    alert('Error creating note. See console for details.');
  }
};

  // Start editing
  const startEditing = (note) => {
    setEditingNoteId(note.noteId);
    setEditingNoteData({ title: note.title, content: note.content });
  };

  // Edit form change handler
  const handleEditChange = (e) => {
    setEditingNoteData({ ...editingNoteData, [e.target.name]: e.target.value });
  };

  // Submit updated note
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateNote({ noteId: editingNoteId, ...editingNoteData });
    setEditingNoteId(null);
    setEditingNoteData({ title: '', content: '' });
    fetchNotes(); // Refresh
  };

  // Handle delete
  const handleDelete = async (noteId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      await deleteNote(noteId);
      fetchNotes(); // Refresh
    }
  };

  // Fetch notes from API
  const fetchNotes = async () => {
    const data = await getNotes();
    setNotesList(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={note.content}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" type="submit">Create</button>
      </form>

      <hr />

      <h2>All Notes</h2>
      <ul className="list-group">
        {notesList.map((n) => (
          <li key={n.noteId} className="list-group-item">
            {editingNoteId === n.noteId ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editingNoteData.title}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <textarea
                  name="content"
                  value={editingNoteData.content}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                />
                <button className="btn btn-success btn-sm me-2" type="submit">Save</button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setEditingNoteId(null)}
                  type="button"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <strong>{n.title}</strong> — {n.content}
                <div className="float-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => startEditing(n)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(n.noteId)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
