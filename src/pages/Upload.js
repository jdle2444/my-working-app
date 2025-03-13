import React, { useState } from 'react';
import { uploadFile } from '../services/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1]; // remove prefix data:...base64,
      const fileData = {
        filename: file.name,
        contentType: file.type,
        base64File: base64String,
      };

      try {
        setUploadStatus('Uploading...');
        const result = await uploadFile(fileData);
        setUploadStatus(`✅ Upload successful: ${result.message}`);
      } catch (err) {
        console.error('Upload error:', err.message);
        setUploadStatus('❌ Upload failed. Check console.');
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="container mt-4">
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
    </div>
  );
}
