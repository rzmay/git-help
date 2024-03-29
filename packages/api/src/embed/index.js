const fileContent = `
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
    <button id="submit-btn" onclick="submitComplaint()">Submit</button>
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

function sendData(submittedComplaint) {
  console.log("Sending Data")
  const apiUrl = 'http://localhost:7000/embed/complaint'; // Replace with your API endpoint
  const token = window.githelp_accountPublicKey;
  const user = window.githelp_userId;

  const requestData = {
    body: submittedComplaint,
    page: window.location.pathname,
    user,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('POST request successful:', data);
      // Handle the response data as needed
    })
    .catch((error) => {
      console.error('Error making POST request:', error);
      // Handle the error
    });
}

function submitComplaint() {
  const complaintText = document.querySelector('#complaint-box textarea').value;
  const submittedComplaint = complaintText;

  // Clear the text area
  document.querySelector('#complaint-box textarea').value = '';

  // You can use the submittedComplaint variable for further processing or API calls
  sendData(submittedComplaint);
}
