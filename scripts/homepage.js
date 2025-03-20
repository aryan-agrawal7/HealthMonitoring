// floor-management.js

// Global variable to store all floor data
let allFloorsData = {};
let currentFloor = '1'; // Default to floor 1

// Fetch floor data from the API
async function fetchFloorData() {
    try {
        const response = await fetch('/api/floors');
        if (!response.ok) {
            throw new Error('Failed to fetch floor data');
        }
        
        allFloorsData = await response.json();
        
        // Initialize the UI
        initializeUI();
        
        // Display the default floor (Floor 1)
        displayFloor(currentFloor);
    } catch (error) {
        console.error('Error fetching floor data:', error);
        document.getElementById('floor-buttons').innerHTML = `
            <div class="error">Error loading floor data. Please try again later.</div>
        `;
    }
}

// Initialize the UI with floor buttons
function initializeUI() {
    const floorButtonsContainer = document.getElementById('floor-buttons');
    let buttonsHTML = '';
    
    // Create a button for each floor
    Object.keys(allFloorsData).sort().forEach(floor => {
        const isActive = floor === currentFloor ? 'active' : '';
        buttonsHTML += `
            <button class="floor-btn ${isActive}" data-floor="${floor}">Floor ${floor}</button>
        `;
    });
    
    floorButtonsContainer.innerHTML = buttonsHTML;
    
    // Add event listeners to the floor buttons
    document.querySelectorAll('.floor-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            document.querySelectorAll('.floor-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update the current floor
            currentFloor = button.getAttribute('data-floor');
            
            // Display the selected floor
            displayFloor(currentFloor);
        });
    });
}

// Display the beds for a specific floor
function displayFloor(floorNumber) {
    const floorData = allFloorsData[floorNumber];
    
    if (!floorData) {
        console.error(`Floor ${floorNumber} data not found`);
        return;
    }
    
    // Update floor title
    document.getElementById('current-floor-title').textContent = `Floor ${floorNumber}`;
    
    // Update floor stats
    document.getElementById('occupied-count').textContent = floorData.stats.occupied;
    document.getElementById('available-count').textContent = floorData.stats.available;
    
    // Generate the bed layout
    const floorLayout = document.getElementById('floor-layout');
    let bedsHTML = '';
    
    floorData.rooms.forEach(room => {
        if (room.occupied) {
            bedsHTML += `
                <div class="bed" onclick="location.href='patient.html?id=${room.patientNo}'">
                    <img src="/Details/singlebed.jpg" alt="Hospital Bed">
                    <div class="room-number">Room ${room.roomno}</div>
                    <div class="patient-id">${room.patientNo}</div>
                </div>
            `;
        } else {
            bedsHTML += `
                <div class="bed vacant">
                    <img src="/Details/singlebed.jpg" alt="Hospital Bed">
                    <div class="room-number">Room ${room.roomno}</div>
                </div>
            `;
        }
    });
    
    floorLayout.innerHTML = bedsHTML;
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', fetchFloorData);