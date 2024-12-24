// DOM Elements
const userTypeSelect = document.getElementById("usertype");
const locationGroup = document.getElementById("location-group");
const locationButton = document.getElementById("locationButton");
const locationDisplay = document.getElementById("locationDisplay");
const mapPopup = document.getElementById("map-popup");
const confirmLocationBtn = document.getElementById("confirmLocation");
const closeMapBtn = document.getElementById("closeMap");
const signupForm = document.getElementById("signupForm");
const getCurrentLocationBtn = document.getElementById("getCurrentLocation");

// Map Variables
let selectedLocation = null;
let map = null;
let marker = null;

// Handle user type selection change
userTypeSelect.addEventListener("change", () => {
  const selectedValue = userTypeSelect.value;
  if (selectedValue === "doctor" || selectedValue === "pharmacy") {
    locationGroup.classList.remove("hidden");
  } else {
    locationGroup.classList.add("hidden");
    locationDisplay.textContent = "";
  }
});

// Initialize map function
function initializeMap() {
  if (!map) {
    map = L.map("map").setView([30.0444, 31.2357], 13); // Cairo as starting point
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      if (marker) {
        map.removeLayer(marker);
      }
      marker = L.marker([lat, lng]).addTo(map);
      selectedLocation = { lat, lng };
    });
  }
}

// Get current location function
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Move map to current location
        map.setView([latitude, longitude], 15);

        // Remove existing marker if any
        if (marker) {
          map.removeLayer(marker);
        }

        // Add new marker
        marker = L.marker([latitude, longitude]).addTo(map);

        // Update selected location
        selectedLocation = { lat: latitude, lng: longitude };
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Please allow access to location");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information unavailable");
            break;
          case error.TIMEOUT:
            alert("Location request timed out");
            break;
          default:
            alert("An error occurred while getting location");
        }
      }
    );
  } else {
    alert("Geolocation is not supported by this browser");
  }
}

// Show map popup when location button is clicked
locationButton.addEventListener("click", () => {
  mapPopup.classList.remove("hidden");
  initializeMap();
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
});

// Close map popup
closeMapBtn.addEventListener("click", () => {
  mapPopup.classList.add("hidden");
});

// Get current location button click handler
getCurrentLocationBtn.addEventListener("click", getCurrentLocation);

// Confirm location selection
confirmLocationBtn.addEventListener("click", () => {
  if (selectedLocation) {
    locationDisplay.textContent = `Selected Location: ${selectedLocation.lat.toFixed(
      4
    )}, ${selectedLocation.lng.toFixed(4)}`;
    mapPopup.classList.add("hidden");
  } else {
    alert("Please select a location on the map");
  }
});

// Handle form submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    userType: document.getElementById("usertype").value,
  };

  // Add location if required (for doctors and pharmacies)
  if (
    (formData.userType === "doctor" || formData.userType === "pharmacy") &&
    selectedLocation
  ) {
    formData.location = {
      type: "Point",
      coordinates: [selectedLocation.lng, selectedLocation.lat], // MongoDB expects [longitude, latitude]
    };
  }

  try {
    const response = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.status === "success") {
      // Store token and redirect to login page
      localStorage.setItem("token", data.token);
      window.location.href = "/login";
    } else {
      alert(data.message || "Error during signup");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during signup");
  }
});
