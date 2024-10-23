// Handling the Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    alert(`Logged in with email: ${email}`);
    
    // Redirect to SOS page after login
    window.location.href = 'sos.html';
  });
  
  // Handling the Registration Form Submission
  document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    alert(`Registered with email: ${email}`);
    
    // Redirect to login page after successful registration
    window.location.href = 'index.html';
  });
  
  // Handling SOS Button Click
  document.getElementById('sosButton')?.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    alert(`SOS sent! Latitude: ${latitude}, Longitude: ${longitude}`);
  
    // Here, send the location to saved contacts
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach(contact => {
      // Simulate sending the location (e.g., via SMS or Email)
      alert(`Sending SOS to ${contact.name}: ${contact.phone}`);
    });
  
    // Load the map with user's current location
    loadMap(latitude, longitude);
  }
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  
  // Load the Map using MapMyIndia (initialize after page load)
  window.onload = function() {
    const lat = 28.6139;  // Default coordinates for New Delhi
    const lon = 77.2090;
  
    // Show default map when the page loads
    loadMap(lat, lon);
  
    // Load saved contacts
    loadContacts();
  };
  
  // Function to load MapMyIndia Map
  function loadMap(lat, lon) {
    if (typeof MapmyIndia === 'undefined') {
      alert("MapmyIndia SDK not loaded!");
      return;
    }
    
    const map = new MapmyIndia.Map('map', {
      center: [lat, lon],
      zoom: 12
    });
  }
  
  // Add Emergency Contact
  document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const contactName = document.getElementById('contactName').value;
    const contactPhone = document.getElementById('contactPhone').value;
  
    // Save to localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ name: contactName, phone: contactPhone });
    localStorage.setItem('contacts', JSON.stringify(contacts));
  
    // Reload contacts list
    loadContacts();
  
    // Clear the form
    document.getElementById('contactForm').reset();
  });
  
  // Load contacts from localStorage
  function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
  
    contacts.forEach(contact => {
      const listItem = document.createElement('li');
      listItem.textContent = `${contact.name}: ${contact.phone}`;
      contactList.appendChild(listItem);
    });
  }
  