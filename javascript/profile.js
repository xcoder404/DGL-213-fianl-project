// Get references to DOM elements
const changeAvatarBtn = document.getElementById("changeAvatarBtn");
const avatarInput = document.getElementById("avatarInput");
const avatarImage = document.getElementById("avatarImage");

// Add event listener to the "Change" button
changeAvatarBtn.addEventListener("click", () => {
  // Trigger the hidden file input when the button is clicked
  avatarInput.click();
});

// Add event listener to the file input
avatarInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  // Check if a file is selected and if it's an image
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    // Once the file is read, set it as the source of the avatar image
    reader.onload = (e) => {
      avatarImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file.");
  }
});

// Get the modal element and the "Create New Profile" link
const modal = document.getElementById("createProfileModal");
const createProfileLink = document.getElementById("create-profile-link");
const closeModalButton = document.getElementById("close-modal");

// Open the modal when the "Create New Profile" link is clicked
createProfileLink.addEventListener("click", function(event) {
    event.preventDefault();
    modal.showModal(); // Show the modal
});

// Close the modal when the "Cancel" button is clicked
closeModalButton.addEventListener("click", function() {
    modal.close(); // Close the modal
});

// Handle form submission (you can implement your own logic here)
document.getElementById("createProfileForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    contact: document.getElementById("contact").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirm-password").value,
  };

  try {
    const response = await fetch("http://localhost:3000/create-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error("Error submitting form:", error.message);
    alert("Something went wrong!");
  }
});