import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const createNote = async (noteData) => {
  const response = await axios.post(`${API_URL}/notes`, noteData);
  return response.data;
};

export const getNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data;
};

export const updateNote = async (noteData) => {
  const response = await axios.put(`${API_URL}/notes`, noteData);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axios.delete(`${API_URL}/notes`, {
    data: { noteId },
  });
  return response.data;
};

export const uploadFile = async (fileData) => {
  const response = await axios.post(`${API_URL}/upload`, fileData);
  return response.data;
};
