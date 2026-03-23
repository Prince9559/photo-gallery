import React, { useEffect, useState } from "react";
import axios from "axios";
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!token) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !category) {
      alert("All fields required!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category_id", category);

    try {
      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        { headers: { Authorization: token } }
      );
      alert("Uploaded Successfully ✅");
      setFile(null);
      setTitle("");
      setCategory("");
    } catch (err) {
      alert("Upload Failed ❌");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter file title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;