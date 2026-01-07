const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample data
const content = [
  { id: 1, title: 'Welcome to VS 1.1.0', description: 'This is a full-stack application with backend and frontend properly connected.' },
  { id: 2, title: 'API Integration', description: 'The frontend can successfully fetch content from the backend API.' },
  { id: 3, title: 'Error Handling', description: 'All connections are properly wired with error handling in place.' }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running successfully' });
});

app.get('/api/content', (req, res) => {
  res.json({ success: true, data: content });
});

app.get('/api/content/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = content.find(c => c.id === id);
  
  if (item) {
    res.json({ success: true, data: item });
  } else {
    res.status(404).json({ success: false, error: 'Content not found' });
  }
});

// Serve frontend
app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/content`);
});
