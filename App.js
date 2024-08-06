// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [style, setStyle] = useState('');
  const [theme, setTheme] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/generate', {  // Note the port number
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ style, theme }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setImageUrl(data.image_url);
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Style:
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} />
        </label>
        <label>
          Theme:
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
        </label>
        <button type="submit">Generate Art</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated Art" />}
    </div>
  );
}

export default App;
