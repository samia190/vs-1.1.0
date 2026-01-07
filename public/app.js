// API base URL - can be configured for different environments
const API_BASE_URL = window.location.origin;

// Check backend health
async function checkHealth() {
    const statusElement = document.getElementById('status');
    statusElement.className = 'status-badge checking';
    statusElement.textContent = 'Checking...';
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        statusElement.className = 'status-badge connected';
        statusElement.textContent = `✓ Connected - ${data.message}`;
        
        console.log('Health check successful:', data);
    } catch (error) {
        statusElement.className = 'status-badge disconnected';
        statusElement.textContent = '✗ Disconnected';
        showError(`Failed to connect to backend: ${error.message}`);
        console.error('Health check failed:', error);
    }
}

// Load content from API
async function loadContent() {
    const container = document.getElementById('content-container');
    container.innerHTML = '<div class="loading">Loading content...</div>';
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/api/content`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
            displayContent(result.data);
            console.log('Content loaded successfully:', result.data);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        container.innerHTML = '';
        showError(`Failed to load content: ${error.message}`);
        console.error('Content loading failed:', error);
    }
}

// Display content in the UI
function displayContent(items) {
    const container = document.getElementById('content-container');
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="loading">No content available</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="content-item">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
        </div>
    `).join('');
}

// Show error message
function showError(message) {
    const errorSection = document.getElementById('error-section');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
}

// Hide error message
function hideError() {
    const errorSection = document.getElementById('error-section');
    errorSection.style.display = 'none';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialized');
    checkHealth();
    
    // Auto-load content after a short delay
    setTimeout(() => {
        loadContent();
    }, 500);
});
