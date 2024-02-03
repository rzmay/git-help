module.exports.createIssue = async function createIssue(payload, owner, repository, token) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repository}/issues`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

module.exports.updateIssue = async function updateIssue(number, payload, owner, repository, token) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repository}/issues/${number}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
