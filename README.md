# VS 1.1.0 - Full Stack Application

A complete full-stack application with backend API and frontend interface, properly wired and connected.

## Features

- ✅ Backend API server (Node.js + Express)
- ✅ Frontend web interface (HTML + JavaScript)
- ✅ CORS enabled for cross-origin requests
- ✅ RESTful API endpoints
- ✅ Error handling on both backend and frontend
- ✅ Dynamic content loading
- ✅ Health check endpoint

## Project Structure

```
vs-1.1.0/
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
├── public/             # Frontend files
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling
│   └── app.js         # Frontend JavaScript
└── README.md          # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samia190/vs-1.1.0.git
   cd vs-1.1.0
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

The application will automatically:
- Check backend health status
- Load content from the API
- Display it in the frontend

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns the status of the backend server

### Get All Content
- **GET** `/api/content`
- Returns all available content items

### Get Content by ID
- **GET** `/api/content/:id`
- Returns a specific content item by ID

## Testing the Connection

1. The frontend will automatically check the backend health on page load
2. Click "Check Backend Health" to manually verify the connection
3. Click "Load Content" to fetch and display content from the API
4. All errors are displayed in the UI with proper error messages

## Technology Stack

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful JSON API

## Development

For development with auto-reload, you can use nodemon:

```bash
npm install -g nodemon
nodemon server.js
```

## Troubleshooting

- If you see connection errors, ensure the backend server is running on port 3000
- Check the browser console for detailed error messages
- Verify that CORS is enabled in the backend
- Ensure all dependencies are installed with `npm install`