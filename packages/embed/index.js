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