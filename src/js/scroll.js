// Get the content container
const content = document.body;

// Add a wheel event listener to the content container
content.addEventListener('wheel', function(event) {
  // Prevent default scroll behavior
  event.preventDefault();

  // Calculate the new scroll position
  const scrollAmount = event.deltaY * 0.1;
  const newPosition = content.scrollTop + scrollAmount;

  // Smoothly scroll to the new position
  content.scrollTo({
    top: newPosition,
    behavior: 'smooth'
  });
});