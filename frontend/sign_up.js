// Reference elements
const userTypeSelect = document.getElementById("usertype");
const locationGroup = document.getElementById("location-group");
const locationButton = document.getElementById("locationButton");
const locationDisplay = document.getElementById("locationDisplay");

// Handle usertype changes
userTypeSelect.addEventListener("change", () => {
  const selectedValue = userTypeSelect.value;

  if (selectedValue === "doctor" || selectedValue === "pharmacy") {
    locationGroup.classList.remove("hidden");
  } else {
    locationGroup.classList.add("hidden");
    locationDisplay.textContent = ""; // Clear location display
  }
});
