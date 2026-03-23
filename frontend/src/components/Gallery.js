import React, { useEffect, useState } from "react";
import axios from "axios";
import './Gallery.css';

function Gallery() {
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/files")
      .then((res) => setFiles(res.data))
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!token) return null;

  const deleteFile = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/files/${id}`,
        { headers: { Authorization: token } }
      );
      alert("Deleted Successfully ✅");

      const res = await axios.get("http://localhost:5000/api/files");
      setFiles(res.data);
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const filteredFiles = selectedCategory
    ? files.filter((f) => f.category_id == selectedCategory)
    : files;

  return (
    <div className="gallery-container">
      <h2>Medical Gallery</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <div className="gallery-grid">
        {filteredFiles.map((file) => (
          <div key={file.id} className="gallery-card">
            <img
              src={`http://localhost:5000/uploads/${file.filename}`}
              alt={file.title}
            />
            <h4>{file.title}</h4>
            <p>{file.category_name}</p>
            <button onClick={() => deleteFile(file.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;