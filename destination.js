const ratingBlocks = document.querySelectorAll(".experience-card .rating");

  ratingBlocks.forEach((ratingBlock) => {
    const stars = ratingBlock.querySelectorAll(".fa-star");

    
    const defaultHighlightIndex = 4;  

    function highlightStars(index) {
      stars.forEach((star, i) => {
        if (i <= index) {
          star.classList.add("active-star"); 
        } else {
          star.classList.remove("active-star"); 
        }
      });
    }

    highlightStars(defaultHighlightIndex);

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        highlightStars(index);
      });
    });
  });