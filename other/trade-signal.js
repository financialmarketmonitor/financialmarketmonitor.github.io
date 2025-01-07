// Function to toggle the visibility of the information box when a button is clicked
function toggleInfoBox(boxId) {
    const boxToToggle = document.getElementById(boxId);

    // Check if the box is already visible
    if (boxToToggle.style.display === 'block') {
        // If visible, hide it
        boxToToggle.style.display = 'none';
    } else {
        // If hidden, show it and hide all other boxes
        const boxes = document.querySelectorAll('.info-box');
        boxes.forEach(box => box.style.display = 'none'); // Hide all boxes

        boxToToggle.style.display = 'block'; // Show the clicked box
    }
}