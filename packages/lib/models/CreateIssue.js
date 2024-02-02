const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// In-memory store to associate installation IDs with repository full names
const installationIdStore = new Map();

app.use(bodyParser.json());

// Webhook endpoint to handle installation events
app.post('/webhook', async (req, res) => {
  const { action, installation } = req.body;

  if (action === 'created') {
    const installationId = installation.id;
    const repositoryFullName = installation.account.login;

    // Store the installation ID associated with the repository
    installationIdStore.set(repositoryFullName, installationId);

    console.log(`GitHub App installed on repository. Installation ID: ${installationId}`);
  } else if (action === 'deleted') {
    // Handle uninstallation and remove the installation ID from the store
    const repositoryFullName = installation.account.login;
    installationIdStore.delete(repositoryFullName);

    console.log(`GitHub App uninstalled from repository. Installation ID: ${installation.id}`);
  }

  res.status(200).end();
});

// Endpoint to trigger an action using the installation access token
app.get('/trigger-action', async (req, res) => {
  // Replace with the actual repository full name
  const repositoryFullName = 'owner/repo';

  // Obtain the installation ID from the store
  const installationId = installationIdStore.get(repositoryFullName);

  if (!installationId) {
    return res.status(404).send('Installation ID not found.');
  }

  // Obtain the installation access token
  const installationAccessToken = await getInstallationAccessToken(installationId);

  // Use the installation access token to make an authenticated API request
  const issueCreationResponse = await createGitHubIssue(repositoryFullName, installationAccessToken);

  res.status(issueCreationResponse.status).json(issueCreationResponse.data);
});

// Function to obtain installation access token
const getInstallationAccessToken = async (installationId) => {
  const response = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_APP_INSTALLATION_TOKEN`, // Replace with your app's installation token
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  const data = await response.json();
  return data.token;
};

// Function to make an API request using the installation access token
const createGitHubIssue = async (repositoryFullName, installationAccessToken) => {
  const response = await fetch(`https://api.github.com/repos/${repositoryFullName}/issues`, {
    method: 'POST',
    body: JSON.stringify({ title: 'New Issue', body: 'Issue description...' }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${installationAccessToken}`,
    },
  });

  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/*const fetch = require('node-fetch');
require('dotenv').config();
const file = require('./TestIssues.json');
const user = 's033fish';
const repo = 'git-help';

createIssuesFromJSON = function(file) {
    file.forEach(issue => {
        fetch(`https://api.github.com/repos/${user}/${repo}/issues`, {
            method: 'post',
            body:    JSON.stringify(issue),
            headers: {'Content-Type': 'application/json', 'Authorization': `token ${process.env.TOKEN}`}
        })
        .then(res =>  res.json())
        .then(json => {
            console.log(`Issue created at ${json.url}`)
        })
    })
}

createIssuesFromJSON(file);*/