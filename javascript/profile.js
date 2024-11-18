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
