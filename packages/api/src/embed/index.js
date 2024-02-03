fileContent = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complaint Box</title>
  <link rel="stylesheet" href="styles.css">
</head>

<script src="index.js"></script>


<body>

  <div id="logo-container" onclick="toggleComplaintBox()">
    <a target="_blank"><img id="logo-img" alt="Your Logo" width="30" height="30" src="https://i.imgur.com/jsu0fLN.png"
        title="source: imgur.com" /></a>
  </div>

  <div id="complaint-box">
    <h2>Submit a Complaint</h2>
    <textarea placeholder="Type your complaint here..."></textarea>
    <button id="close-btn" onclick="toggleComplaintBox()">Close</button>
  </div>

</body>

</html>
`;

const contentDisplay = document.getElementById('githelp');
contentDisplay.innerHTML = fileContent;

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
