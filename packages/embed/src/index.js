// Get the element
const contentDisplay = document.getElementById('githelp');

// Fetch content from the provided link using RawGit
fetch('https://rawcdn.githack.com/rzmay/git-help/main/packages/embed/index.html')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.text();
  })
  .then(fileContent => {
    // Display the content in the contentDisplay div
    contentDisplay.innerHTML = fileContent;
  })
  .catch(error => {
    console.error('Error fetching file:', error.message);
    contentDisplay.innerHTML = 'Error fetching file content.';
  });

function toggleComplaintBox() {
  const logoContainer = document.getElementById('logo-container');
  const complaintBox = document.getElementById('complaint-box');

  if (complaintBox.style.display === 'none' || complaintBox.style.display === '') {
    logoContainer.style.opacity = '0';

    setTimeout(() => {
      logoContainer.style.display = 'none';
      complaintBox.style.display = 'block';
    }, 300);
  } else {
    logoContainer.style.display = 'block';
    setTimeout(() => {
      logoContainer.style.opacity = '1';
      complaintBox.style.display = 'none';
    }, 50);
  }
}